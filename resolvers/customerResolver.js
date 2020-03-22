
const axios = require('axios')

const url = 'http://localhost:3000/customers'

const resolvers = {
    Query: {
        customerDashboard: async (parent, args, context) => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${url}/dashboard`,
                    headers: {
                        token: args.token
                    }
                })
                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        registerCustomer: async (parent, args, context) => {
            try {
                const obj = {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    image_url: args.image_url
                }
                const { data } = await axios({
                    method: 'POST',
                    url: `${url}/register`,
                    data: obj
                })
                return data
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

module.exports = resolvers