const { User, Bird, Comment } = require("../models");
const { signToken, AuthenticationError, verifyToken } = require("../utils/auth");
const resolvers = {
  Query: {
    user: async (root, args, context) => {
      const token = verifyToken(context.req);
      if (!token) {
        throw AuthenticationError;
      }
      return User.findOne({ email: token.data.email });
    },
    birds: async () => {
      return Bird.find();
    },
    bird: async (_, { birdId }) => {
      return Bird.findById(birdId);
    },
    comments: async () => {
      return Comment.find();
    },
    comment: async (_, { commentId }) => {
      return Comment.findById(commentId);
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
debugger
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addComment: async (_, { birdId, text }, context) => {
      const token = verifyToken(context.req);
      if (!token) {
        throw AuthenticationError;
      }

      const user = await User.findOne({ email: token.data.email });

      const comment = new Comment({
        text,
        bird: birdId,
        user: user._id,
        datePosted: new Date()
      });
      
      await comment.save();
      
      return comment;
    },
  },
};

module.exports = resolvers;
