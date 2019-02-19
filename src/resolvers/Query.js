const Query = {
    async users(parent, args, { prisma }, info) {
        const opArgs = {}
        if (args.query) {
            console.log(args.query)
            opArgs.where = {
                OR: [{
                        name_contains: args.query
                    },
                    {
                        email_contains: args.query
                    }]
            }
        }
        return prisma.query.users(opArgs, info)
    },
    async posts(parent, args, { prisma }, info) {
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
    },
    async comments(parent, args, { prisma }, info) {
        const opArgs = {}
        if (args.query) {
          opArgs.where = {
              text_contains: args.query
          }
        }
        return prisma.query.comments(opArgs, info);
    }
}

export default Query