const typeDefs = `
type Bird {
    _id: ID!
    birdId: Int!
    birdName: String!
    birdImage: String!
    birdAuthor: String!
    datePosted: String!
    comments: [Comment]
    postText: String
}

type Comment {
    commentText: String!
    commentAuthor: String!
    createdAt: String!
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
    birdSearch(query: String!): [Bird]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    saveBirdPost(birdId: Int!, birdName: String!, birdImage: String!, birdAuthor: String!, postText: String!, datePosted: String!): Bird
    login(email: String!, password: String!): Auth
    addBird(birdId: Int!, birdName: String!, birdImage: String!, birdAuthor: String!, postText: String!, datePosted: String!): Bird
    addComment(_id: ID!, commentText: String!, commentAuthor: String!): Comment
    deleteComment(commentId: ID!): String
    deleteBird(birdId: ID!): String
}
`

module.exports = typeDefs;