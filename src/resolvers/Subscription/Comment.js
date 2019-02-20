export const comment = {
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
