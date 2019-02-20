export const authorPost = {
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
} 
export const post = {
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