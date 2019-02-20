import { GraphQLServer, PubSub } from 'graphql-yoga';
import typeDefs from './typeDefs'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import prisma from './prisma'

import resolvers from './resolvers'

//Scalar Types: String, Boolean, Int, Float, ID

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    // resolvers: {
    //     Query,
    //     Mutation,
    //     Subscription,
    //     User,
    //     Post,
    //     Comment
    // },
    context: {
        db,
        prisma,
        pubsub
    }
    
})
server.start(() => console.log('server online'));