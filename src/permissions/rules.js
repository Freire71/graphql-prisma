import { rule, and, or, not } from 'graphql-shield'
import { getUserId } from '../utils/user.utils'

export const isAuthenticated = rule()(async (parent, args, ctx , info) => {
    if (!ctx.userId) {
      return false
    }
    return ctx.prisma.exists.User({id: "cjt6ordm9009a0778fw6q2chr" })
    

})
