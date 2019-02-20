const posts = async (parent, args, { prisma }, info) => {
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

export default {
    posts
}