const { gql } = require('apollo-server')

const customerType = require('./customerTypeDefs')
const sellerType = require('./sellerTypeDefs')

const typeDef = gql`
  type Query
  type Mutation
`

module.exports = {
  typeDefs: [typeDef, customerType]
}