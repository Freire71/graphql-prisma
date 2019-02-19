import uuidv4 from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        console.log(args);
        const { email } = args.data;
        const emailTaken = await prisma.exists.User({ email })
        if (emailTaken) {
            throw new Error("E-mail already taken")
        }
        return prisma.mutation.createUser({ data: args.data }, info)
    },
    async createPost(parent, args, { db, pubsub, prisma}) {
        const { authorID, title, body, published } = args.data;
        const hasValidAuthorID = await prisma.exists.User({ id: authorID })
        if (!hasValidAuthorID) {
            throw new Error("Cannot find author with the given ID")
        }
        return prisma.mutation.createPost({
            data: {
                title,
                body,
                published,
                author: {
                    connect: {
                        id: authorID
                    }
                }
            }
        }, info)
    },
    async createComment(parent, args, { prisma }, info) {
        const { text, authorID, postID } = args.data
        const authorExists = await prisma.exists.User({ id: authorID })
        const postExists = await prisma.exists.Post({ id: postID })
        if (!authorExists || !postExists) {
            throw new Error("Cannot find author or post with the given IDs")
        }
        return prisma.mutation.createComment({
            data: {
                text,
                author: {
                    connect: {
                        id: authorID
                    }
                },
                post: {
                    connect: {
                        id: postID
                    }
                }
            }
        }, info)
        
    },
    async deleteUser(parent, { id }, { prisma }, info) {
        const userExists = await prisma.exists.User({ id })
        if (!userExists) {
            throw new Error("Cannot find an user with the given ID")
        }
        return prisma.mutation.deleteUser({
            where: {
                id
            }
        }, info)
    },
    async deletePost(parent, { id }, { db, pubsub, prisma }, info) {
        const postExists = await prisma.exists.Post({ id })
        if (!postExists) {
            throw new Error("Could not find a post with the given ID")
        }
        return prisma.mutation.deletePost({
            where: {
                id
            }
        }, info)
    },
    async deleteComment(parent, { id }, { prisma }, info) {
        const commentExists = await prisma.exists.Comment({ id })
        if (!commentExists) {
            throw new Error("Could not find a comment with the given ID")
        } 
        return prisma.mutation.deleteComment({
            where: {
                id
            }
        }, info)
     
    },
    async updatePost(parent, { id, data }, { db, pubsub, prisma }, info) {
        const postExists = await prisma.exists.Post({ id })
        if (!postExists) {
            throw new Error("Could not find a post with the given ID")
        }
        return prisma.mutation.updatePost({
            data,
            where: {
                id
            }
        })
    },
    async updateUser(parent, { id, data }, { prisma }, info) {
        const userExists = await prisma.exists.User({ id })
        if (!userExists) {
            throw new Error("Could not find a user with the given ID")
        }
        return prisma.mutation.updateUser({
            data,
            where: {
                id
            }
        }, info)
        
    },
    async updateComment(parent, { id, data }, { prisma }, info) {
        const commentExists = await prisma.exists.Comment({ id })
        if (!commentExists) {
            throw new Error("Could not find a comment with the given ID")
        }
        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        }, info)
    }
}

export default Mutation