const { ApolloServer, gql } = require('apollo-server')
const { typeDefs } = require('./typeDefs/index')
const resolvers = require('./resolvers/index')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});