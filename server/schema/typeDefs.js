const typeDefs = `
type Bird {
    _id: ID!
    description: String!
    birdId: String!
    comments: [Comment]!
}

type Comment {
    _id: ID!
    text: String!
    bird: Bird!
    user: User!    
    datePosted: String!
}
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    seenBirds: [Bird]!
    birdCount: Int!
}

type Auth {
    token: String!
    user: User
}

type Query {
    user: User
    birds: [Bird]!
    bird(birdId: ID!): Bird
    comments: [Comment]!
    comment(commentId: ID!): Comment
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBird(description: String!, birdId: String!): Bird
    addComment(birdId: ID!, text: String!, userId: ID!): Comment
    deleteComment(commentId: ID!): String
    deleteBird(birdId: ID!): String
}
`

module.exports = typeDefs;