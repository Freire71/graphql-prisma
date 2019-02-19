import { Prisma } from 'prisma-binding';
// prisma binding vai usar o typeDefs que o graphql-cli encontrou no endpoint que está rodando a aplicação do playground
// e trouxe para a aplicação. o arquivo .graphqlconfig é responsável por configurar o graphql-cli
//

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

export default prisma
