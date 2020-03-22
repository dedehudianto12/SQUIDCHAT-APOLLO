const { gql } = require('apollo-server')

const customerTypes = gql`
    type Customer {
        
    }

    extend type Mutation {
        
    }
`

module.exports = customerTypes