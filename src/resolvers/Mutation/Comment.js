export const createComment = async (parent, args, { prisma }, info) => {
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
    
}

export const deleteComment = async (parent, { id }, { prisma }, info) => {
    const commentExists = await prisma.exists.Comment({ id })
    if (!commentExists) {
        throw new Error("Could not find a comment with the given ID")
    } 
    return prisma.mutation.deleteComment({
        where: {
            id
        }
    }, info)
 
}

export const updateComment = async (parent, { id, data }, { prisma }, info) => {
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