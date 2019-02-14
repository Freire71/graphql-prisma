const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            console.log(parent, args, pubsub);
            let count = 0
            setInterval(() => {
                count += 1
                pubsub.publish('count', { count })
            }, 1000)
            return pubsub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, { postID }, { pubsub, db }) {
            const post = db.posts.find( post => post.id === postID && post.published === true )
            if (!post) {
                throw new Error('Cannot find a valid post with the given ID')
            }
            return pubsub.asyncIterator(`comment ${postID}`)
        }
    },
    authorPost: {
        subscribe(parent, { authorID }, { pubsub, db }) {
            const author = db.users.find(user => user.id === authorID)
            if (!author) {
                throw new Error('Cannot find a valid author with the given ID')
            }
            return pubsub.asyncIterator(`authorPost ${authorID}`)
        }
    },
    post: {
        subscribe(parent, args, { pubsub }) {
            return pubsub.asyncIterator('post')
        }
    }
}

export default Subscription;