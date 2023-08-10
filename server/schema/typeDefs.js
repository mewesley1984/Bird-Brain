
const typeDefs = `
type User {
    username: String
    email: String
    password: String
  }

  
type Auth {
    token: String!
    user: User
}


type Query {
    user: User
}

type Mutation{
    addUser(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): Auth
}
`





module.exports = typeDefs