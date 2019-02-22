import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
    User: {
    },
    Query: {
        async users(parent, args, { prisma }, info) {
            const opArgs = {}
            if (args.query) {
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
        const { email, password } = args.data;

        const emailTaken = await prisma.exists.User({ email })
        if (emailTaken) {
            throw new Error("E-mail already taken")
        }
        const passwordHasValidLength = password.length >= 8
        if(!passwordHasValidLength) {
            throw new Error("Password must be 8 characters long")
        }
        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.mutation.createUser({ data: {
            ...args.data,
            password: encryptedPassword
        } })
        return {
            user,
            token: jwt.sign({ id: user.id }, 'thisisasecret')
        }
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
    },
    async login (parent, { data: { email, password } } , { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error("Cannot find an user with the given Email")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error("Wrong password. Try again")
        }
        return {
            token: jwt.sign({ userId: user.id }, 'thisisasecret'),
            user
        }
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