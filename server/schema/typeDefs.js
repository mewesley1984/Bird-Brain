const typeDefs = `
type Bird {
    _id: ID!
    birdId: Int!
    birdName: String!
    birdImage: String!
    birdAuthor: String!
    datePosted: String!
    comments: [Comment]
}

type Comment {
    commentText: String!
    commentAuthor: String!
    createdAt: Int
}
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

type Auth {
    token: String!
    user: User
}

type Query {
    user: User
    birds: [Bird]!
    bird(birdId: Int): Bird
    comments: [Comment]!
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBird(birdId: Int!, birdName: String!, birdImage: String! birdAuthor: String!): Bird
    addComment(birdId: ID!, text: String!, userId: ID!): Comment
    deleteComment(commentId: ID!): String
    deleteBird(birdId: ID!): String
}
`

module.exports = typeDefs;