export default {
    Post: {
        
    },
    Query: {
        async posts (parent, args, { prisma }, info) {
            const opArgs = {}
            if (args.query) {
                console.log(args.query)
                opArgs.where = {
                    OR: [{
                            title_contains: args.query
                        },
                        {
                            body_contains: args.query
                        }]
                }
            }
            return prisma.query.posts(opArgs, info)
        }
    },
    Mutation: {
        async createPost (parent, args, { prisma }, info) {
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
        async deletePost (parent, { id }, { db, pubsub, prisma }, info) {
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
        async updatePost (parent, { id, data }, { db, pubsub, prisma }, info) {
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
        }
    },
    Subscription: {
        authorPost: {
            subscribe(parent, { authorID }, { prisma }, info) {
                const opArgs = {
                    where: {
                        node: {
                            author: {
                                id: authorID
                            }
                        }
                    }
                }
                return prisma.subscription.post(opArgs, info)
            }
        },
        post: {
            subscribe(parent, args, { prisma }, info) {
                const opArgs = {
                    where: {
                        node: {
                            published: true
                        }
                    }
                }
                return prisma.subscription.post(opArgs, info)
            }
        }
    },
   
}