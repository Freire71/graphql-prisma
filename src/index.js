import { GraphQLServer, PubSub } from 'graphql-yoga';
import typeDefs from './typeDefs'
import prisma from './prisma'

import resolvers from './resolvers'

//Scalar Types: String, Boolean, Int, Float, ID


const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    }
    
})
server.start(() => console.log('server online'));