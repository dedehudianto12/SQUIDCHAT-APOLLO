const { gql } = require('apollo-server')

const sellerTypes = gql`
    type Seller {

    }

    extend type Mutation {
        
    }
`

module.exports = sellerTypes