const { User } = require("../models");
const { signToken, AuthenticationError, verifyToken } = require("../utils/auth");
const resolvers = {
  Query: {
    user: async (root, args, context) => {
      const token = verifyToken(context.req)
      if (!token) {
        throw AuthenticationError
      }
      return User.findOne({ email: token.data.email });
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
      
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    }
  },
};

module.exports = resolvers;
