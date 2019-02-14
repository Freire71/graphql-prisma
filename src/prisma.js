import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: './generated/prisma.graphql',
    endpoint: 'http://localhost:4466',

})

prisma.query.users(null, '{ id name email posts { title } }').then((data) => {
    console.log(data)
})