const { ApolloServer, gql } = require('apollo-server')
// const { typeDef } = require('./typeDefs')
// const resolvers = require('./resolvers')
const axios = require('axios')
const url = 'http://54.169.56.221:3000/customers'


const typeDefs = gql`


    type Customer {
        _id : ID
        slug : String
        name : String
        email : String
        password : String
        image_url : String
        links : [Links]
    }

    type Payload {
        customer : Customer
        sellers : [Sellers]
    }

    type Fields {
        id : ID
        field_name : String
        value : Float
    }

    type Links {
        id : String,
        link : String
        seller : String
        customer : String
        last_chat : String
        read : Boolean
        created_at : String
    }

    type Collection{
        id : ID
        collection_name : String
        created_at : String
        fields : [Fields]
    }

    type ChatBots{
        id : ID
        question : String
        answer : String
        key : [String]
    }


    type Sellers {
        _id : ID
        slug : String
        name : String
        email : String
        password : String
        image_url : String
        phone_number : String
        seller_category : String,
        collections : [Collection],
        chat_bots : [ChatBots]
        links : [Links]
    }

    type Token {
        token : String
    }

    type LoginPayload {
        message : String
        status : String
        payload : Token
    }

    type DashboardPayload {
        message : String
        status : String
        payload : Payload
    }

    type customerPayload{
        customer : Customer
    }

    type UpdatePayload{
        message : String
        status : String
        payload : customerPayload
    }


    type Query {
        customerDashboard(token : String): DashboardPayload
    }

    type Link {
        id : String
        link : String
        seller_slug : String
        customer_slug : String
        created_at : String
        chats : [String]
        _id : ID
    }

    type createLink{
        link : Link
    }

    type createLinkPayload{
        message : String
        status : String
        payload : createLink
    }

    type Mutation {
        registerCustomer(
            name: String
            email: String
            password: String
            image_url: String
        ) : UpdatePayload

        updateCustomer(
            name: String
            email: String
            password: String
            image_url: String
            token : String
        ) : UpdatePayload

        loginCustomer(
            email: String
            password : String
        ) : LoginPayload

        customerCreateLink(
            sellerSlug : String
            token : String
        ) : createLinkPayload

        customerDestroyLink(
            link_id : String
            token : String
        ) : deletePayload
    }
`

const resolvers = {
    Query: {
        customerDashboard: async (parent, args, context) => {
            try {
                console.log('okkk')
                const { data } = await axios({
                    method: 'GET',
                    url: `${url}/dashboard`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data.payload.sellers[0].links)
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
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err)
            }
        },
        updateCustomer: async (parent, args, context) => {
            try {
                const obj = {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    image_url: args.image_url
                }
                const { data } = await axios({
                    method: 'PUT',
                    url: `${url}/updateAccount`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        loginCustomer: async (parent, args, context) => {
            try {
                const obj = {
                    email: args.email,
                    password: args.password
                }
                console.log(obj)
                const { data } = await axios({
                    method: 'POST',
                    url: `${url}/login`,
                    data: obj
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.message)
            }
        },
        customerCreateLink: async (parent, args, context) => {
            try {
                const obj = {
                    sellerSlug: args.sellerSlug
                }
                console.log(obj)
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${url}/createLink`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        customerDestroyLink: async (parent, args, context) => {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${url}/destroyLink/${args.link_id}`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        }
    }
}

const sellerType = gql`
    type Seller {
        _id : ID
        slug : String
        name : String
        email : String
        password : String
        image_url : String
        phone_number : Float
        seller_category : String
    }

    type SellerPayload{
        seller : Sellers
    }

    type UpdateSeller{
        message : String
        status : String
        payload : SellerPayload
    }

    type sellerToken {
        token : String
    }  

    type chatBotPayload{
        chat_bot : ChatBots
    }

    type createChatBotPayload{
        message: String
        status : String
        payload : chatBotPayload
    }

    type deletePayload{
        message: String
        status : String
    }

    
    type chatBot{
        id : ID
        question : String
        answer : String
    }

    type collection{
        id : ID
        collection_name : String
        created_at : String
    }

    type field {
        id : ID
        field_name : String
        value : Float
    }

    type createCollectionPayload{
        collection : Collection
    }

    type createCollection{
        message : String
        status : String
        payload : createCollectionPayload
    }

    type createFieldPayload{
        field : Fields
    }

    type createField{
        message : String
        status : String
        payload : createFieldPayload
    }

    extend type Query {
        sellerDashboard(token : String): UpdateSeller
    }

    extend type Mutation {
        registerSeller(
            name: String
            email: String
            password: String
            image_url: String
            phone_number : String
            seller_category : String
        ) : UpdateSeller

        updateSeller(
            name: String
            email: String
            password: String
            image_url: String
            phone_number : String
            seller_category : String
            token : String
        ) : UpdateSeller


        loginSeller(
            email: String
            password : String
        ) : LoginPayload

        createChatBot(
            token : String
            question : String
            answer : String
        ) : createChatBotPayload

        updateChatBot(
            question : String
            token : String
            answer : String
            chatbot_id : String
        ) : createChatBotPayload

        deleteChatBot(
            token : String
            chatbot_id : String
        ) : deletePayload

        createCollection(
            collection_name: String
            token : String
        ) : createCollection

        updateCollection(
            collection_name: String
            token : String
            collection_id : String
        ) : createCollection

        deleteCollection(
            token : String
            collection_id : String
        ) : deletePayload

        createField(
            field_name : String
            collection_id : String
            token : String
            value : Float
        ) : createField

        updateField(
            field_name : String
            collection_id : String
            field_id : String
            token : String
            value : Float
        ) : createField

        deleteField(
            collection_id : String
            field_id : String
            token : String
        ) : deletePayload

        deleteLink(
            link_id : String
            token : String
        ) : deletePayload
    }
`
const sellerUrl = 'http://54.169.56.221:3000/sellers'

const sellerResolvers = {
    Query: {
        sellerDashboard: async (parent, args, context) => {
            try {
                console.log('okkk')
                const { data } = await axios({
                    method: 'GET',
                    url: `${sellerUrl}/dashboard`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err)
            }
        }

    },
    Mutation: {
        registerSeller: async (parent, args, context) => {
            try {
                const obj = {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    image_url: args.image_url,
                    phone_number: String(args.phone_number),
                    seller_category: args.seller_category
                }

                const { data } = await axios({
                    method: 'POST',
                    url: `${sellerUrl}/register`,
                    data: obj
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.message)
            }
        },
        updateSeller: async (parent, args, context) => {
            try {
                const obj = {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    image_url: args.image_url,
                    phone_number: String(args.phone_number),
                    seller_category: args.seller_category
                }

                const { data } = await axios({
                    method: 'PUT',
                    url: `${sellerUrl}/updateAccount`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        loginSeller: async (parent, args, context) => {
            try {
                const obj = {
                    email: args.email,
                    password: args.password
                }
                console.log(obj)
                const { data } = await axios({
                    method: 'POST',
                    url: `${sellerUrl}/login`,
                    data: obj
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        createChatBot: async (parent, args, context) => {
            try {
                const obj = {
                    question: args.question,
                    answer: args.answer
                }
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/createChatBot`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        updateChatBot: async (parent, args, context) => {
            try {
                const obj = {
                    question: args.question,
                    answer: args.answer
                }
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/updateChatBot/${args.chatbot_id}`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        deleteChatBot: async (parent, args, context) => {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/destroyChatBot/${args.chatbot_id}`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        createCollection: async (parent, args, context) => {
            try {
                const obj = {
                    collection_name: args.collection_name
                }
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/createCollection`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        updateCollection: async (parent, args, context) => {
            try {
                const obj = {
                    collection_name: args.collection_name
                }
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/updateCollection/${args.collection_id}`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        deleteCollection: async (parent, args, context) => {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/destroyCollection/${args.collection_id}`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        createField: async (parent, args, context) => {
            try {
                const obj = {
                    field_name: args.field_name,
                    value: args.value
                }
                console.log(args.collection_id)
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/createField/${args.collection_id}`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        updateField: async (parent, args, context) => {
            try {
                const obj = {
                    field_name: args.field_name,
                    value: args.value
                }
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/updateField/${args.collection_id}/${args.field_id}`,
                    data: obj,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        deleteField: async (parent, args, context) => {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/destroyField/${args.collection_id}/${args.field_id}`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        },
        deleteLink: async (parent, args, context) => {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${sellerUrl}/destroyLink/${args.link_id}`,
                    headers: {
                        token: args.token
                    }
                })
                console.log(data)
                return data
            }
            catch (err) {
                console.log(err.response.data)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: [typeDefs, sellerType],
    resolvers: [resolvers, sellerResolvers]
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});