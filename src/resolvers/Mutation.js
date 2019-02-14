import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { db }, info) {
        console.log(args);
        const { name, email, age } = args.data;
        const emailTaken = db.users.some(user => user.email === email)
        console.log('email taken ', emailTaken)
        if (emailTaken) {
            throw new Error("The provided email is already in use");
        }
        const user = {
            id: uuidv4(),
            name,
            email,
            age,
        }
        db.users.push(user);
        return user;
    },
    createPost(parent, args, { db, pubsub }) {
        const { title, body, published, authorID: author} = args.data;
        const hasValidAuthorID = db.users.some(user => user.id === author)
        if (!hasValidAuthorID) {
            throw new Error("Cannot find author with the given ID")
        }
        const post = {
            id: uuidv4(),
            title, 
            body,
            published,
            author
        }
        if (post.published) {
            pubsub.publish(`authorPost ${author}`, {
                authorPost: post
            })
            pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post,
                },
            })
        }
        db.posts.push(post)
        return post
    },
    createComment(parent, args, { db, pubsub }) {
        const { text, authorID: author, postID: post} = args.data
        const hasValidAuthorID = db.users.some(user => user.id === author)
        console.log(post);
        const hasValidPost = db.posts.some(postObject => {
            return postObject.id === post
        })
        console.log(`hasValidAuthor: ${hasValidAuthorID}, hasValidPost: ${hasValidPost}`)
        if (!hasValidAuthorID || !hasValidPost) {
            throw new Error("Cannot find author or post with the given IDs")
        }
        const comment = {
            id: uuidv4(),
            text,
            author,
            post
        }
        pubsub.publish(`comment ${post}`, {
            
            comment: {
                data: comment,
                mutation: 'CREATED'
            }
        })
        db.comments.push(comment)
        return comment
    },
    deleteUser(parent, args, { db }) {
        const { id } = args
        const userIndex = db.users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            throw new Error("Cannot find an user with the given ID")
        }
        const deletedUser = db.users.splice(userIndex, 1)
        db.posts = db.posts.filter(post => {
            const match = post.author === id

            if (match) {
                db.comments = db.comments.filter(comment => comment.post !== post.id)
            }
            return !match
        })
        db.comments = db.comments.filter(comment => comment.author !== id)

        return deletedUser[0]
    },
    deletePost(parent, args, { db, pubsub }) {
        const { id } = args
        const postIndex = db.posts.findIndex(post => post.id === id)
        if (postIndex === -1) {
            throw new Error("Could not find a post with the given ID")
        }
        const removedPost = db.posts.splice(postIndex, 1)
        db.comments = db.comments.filter(comment => comment.post !== id)
        if (removedPost[0].published) {
            pubsub.publish(`post`, {
                post: {
                    mutation: 'DELETED',
                    data: removedPost[0]
                }
            })
        }
        return removedPost[0]
    },
    deleteComment(parent, args, { db, pubsub }) {
        const { id } = args
        const commentIndex = db.comments.findIndex(comment => comment.id === id)
        if (commentIndex === -1) {
            throw new Error("Could not find a comment with the given ID")
        } 
        const removedComment = db.comments.splice(commentIndex, 1)
        pubsub.publish(`comment ${removedComment[0].post}`, {
            comment: {
                data: removedComment[0],
                mutation: 'DELETED'
            }
        })
        return removedComment[0]
    },
    updatePost(parent, { id, data }, { db, pubsub }) {
        console.log(data)
        const foundPost = db.posts.find(post => post.id === id)
        if (!foundPost) {
            throw new Error("Could not find a post with the given ID")
        }
        if (data.title) {
            foundPost.title = data.title
        }
        if (data.body) {
            foundPost.body = data.body
        }
        if (typeof data.published === 'boolean') {
            if (foundPost.published && !data.published) {
                foundPost.published = data.published
                pubsub.publish('post', {
                    post: {
                        data: foundPost,
                        mutation: 'DELETED'
                    }
                })
            } else if (!foundPost.published && data.published) {
                foundPost.published = data.published
                pubsub.publish('post', {
                    post: {
                        data: foundPost,
                        mutation: 'CREATED'
                    }
                })
            }
        } else if (foundPost.published) {
            pubsub.publish('post', {
                post: {
                    data: foundPost,
                    mutation: 'UPDATED'
                }
            })
        }
        
        return foundPost
    },
    updateUser(parent, { id, data}, { db }) {
        const foundUser = db.users.find(user => user.id === id)
        if (!foundUser) {
            throw new Error("Could not find a user with the given ID")
        }
        console.log(data, foundUser)
        if (data.name) {
            foundUser.name = data.name
        }
        if (data.email) {
            const emailTaken = db.users.some(user => user.email === data.email)
            if (emailTaken) {
                throw new Error("The provided email is already in use")
            } else {
                foundUser.email = data.email
            }
        }
        if (data.age) {
            foundUser.age = data.age
        }
        return foundUser
    },
    updateComment(parent, { id, data }, { db, pubsub }) {
        const foundComment = db.comments.find(comment => comment.id === id)
        if (!foundComment) {
            throw new Error("Could not find a comment with the given ID")
        }
        if (data.text) {
            foundComment.text = data.text
        }
        pubsub.publish(`comment ${foundComment.post}`, {
            comment: {
                data: foundComment,
                mutation: 'UPDATED'
            }
        })
        return foundComment
    }
}

export default Mutation