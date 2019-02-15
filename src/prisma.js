import { Prisma } from 'prisma-binding';
// prisma binding vai usar o typeDefs que o graphql-cli encontrou no endpoint que está rodando a aplicação do playground
// e trouxe para a aplicação. o arquivo .graphqlconfig é responsável por configurar o graphql-cli
//

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 4))
// })

// prisma.query.comments(null , '{id text author {id name}}').then(data => {
//     console.log(JSON.stringify(data, undefined, 4))
// })
prisma.mutation.createPost({
    data: {
        title: 'um titulo bacana',
        body: 'um body bacana',
        published: true,
        author: {
            connect: {
                id: 'cjs6gw8na004p07590okq584l'
            }
        }
    }
}, '{ id title author { id name } }').then(data => {
    console.log(JSON.stringify(data, undefined, 4))
})