export default {
    User: {
    },
    Query: {
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
        }
  },
  Mutation: {
    async createUser(parent, args, { prisma }, info) {
        console.log(args);
        const { email } = args.data;
        const emailTaken = await prisma.exists.User({ email })
        if (emailTaken) {
            throw new Error("E-mail already taken")
        }
        return prisma.mutation.createUser({ data: args.data }, info)
    },
    async updateUser (parent, { id, data }, { prisma }, info) {
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
    async deleteUser (parent, { id }, { prisma }, info) {
        const userExists = await prisma.exists.User({ id })
        if (!userExists) {
            throw new Error("Cannot find an user with the given ID")
        }
        return prisma.mutation.deleteUser({
            where: {
                id
            }
        }, info)
    }
  },
  Subscription: {
      newUser: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.user(null, info)
        } 
      }
  },
  
}