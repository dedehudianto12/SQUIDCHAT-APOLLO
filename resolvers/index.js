const { merge } = require('lodash')

const customerResolver = require('./customerResolver')
const sellerResolver = require('./sellerResolver')

const resolvers = merge(customerResolver, sellerResolver)

module.exports = resolvers