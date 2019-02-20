export const createPost = async (parent, args, { prisma }, info) => {
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
}

export const deletePost = async (parent, { id }, { db, pubsub, prisma }, info) => {
    const postExists = await prisma.exists.Post({ id })
    if (!postExists) {
        throw new Error("Could not find a post with the given ID")
    }
    return prisma.mutation.deletePost({
        where: {
            id
        }
    }, info)
}

 export const updatePost = async (parent, { id, data }, { db, pubsub, prisma }, info) => {
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