const { gql } = require('apollo-server')

const customerTypes = gql`
    type Customer {
        _id : ID
        slug : String
        name : String
        email : String
        password : String
        image_url : String
    }

    extend type Query {
        dashboard(token : String): Customer
    }

    extend type Mutation {
        registerCustomer(
            name: String
            email: String
            password: String
            image_url: String
        ) : Customer
    }
`

module.exports = customerTypes