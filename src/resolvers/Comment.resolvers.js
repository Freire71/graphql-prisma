export default {
    Query: {
        async comments (parent, args, { prisma }, info) {
            const opArgs = {}
            if (args.query) {
              opArgs.where = {
                  text_contains: args.query
              }
            }
            return prisma.query.comments(opArgs, info);
        }
    },
    Mutation: {
        async createComment (parent, args, { prisma }, info) {
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
        async deleteComment (parent, { id }, { prisma }, info) {
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
        async updateComment (parent, { id, data }, { prisma }, info) {
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
    },
    Subscription: {
        comment: {
            subscribe(parent, { postID }, { prisma },info) {
                const opArgs = {
                    where: {
                        node: {
                            post: {
                                id: postID
                            }
                        }
                    }
                }
                return prisma.subscription.comment(opArgs, info)
        
            }
        }
    }
}