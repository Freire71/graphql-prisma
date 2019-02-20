import { GraphQLServer, PubSub } from 'graphql-yoga';
import typeDefs from './typeDefs'
import db from './db'
import prisma from './prisma'

import resolvers from './resolvers'

//Scalar Types: String, Boolean, Int, Float, ID

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        db,
        prisma,
        pubsub
    }
    
})
server.start(() => console.log('server online'));