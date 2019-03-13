import { GraphQLServer, PubSub } from 'graphql-yoga';
import typeDefs from './typeDefs'
import prisma from './prisma'

import * as userUtils from './utils/user.utils'
import { permissions } from './permissions' 

import resolvers from './resolvers'

//Scalar Types: String, Boolean, Int, Float, ID



const server = new GraphQLServer({
    typeDefs,
    resolvers,
    middlewares: [permissions],
    context(request) {
        return {
            prisma,
            ...request,
            userId: userUtils.getUserId(request)
        }
    }
    
})
server.start(() => console.log('server online'));