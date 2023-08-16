const { User, Bird, Comment } = require("../models");
const { signToken, AuthenticationError, verifyToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (root, args, context) => {
      const token = verifyToken(context.req);
      if (!token) {
        throw new AuthenticationError('User not authenticated');
      }
      return User.findOne({ email: token.data.email });
    },
    birds: async () => {
      return Bird.find();
    },
    bird: async (_, { birdId }) => {
      return Bird.findById(birdId);
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
        throw new AuthenticationError('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addBird: async (parent, { birdId, birdName, birdImage, birdAuthor, dateposted }) => {
      const bird = await Bird.create({ birdId, birdName, birdImage, birdAuthor, dateposted });
    
      await User.findOneAndUpdate(
        { username: birdAuthor },
        { $addToSet: { bird: bird._id } }
      );
    
      return bird; // Return the created bird object
    },
    addComment: async (_, { birdId, commentText }, context) => {
      const token = verifyToken(context.req);
      if (!token) {
        throw new AuthenticationError('User not authenticated');
      }

      const user = await User.findOne({ email: token.data.email });

      const comment = new Comment({
        commentText: text,
        bird: birdId,
        user: user._id,
        datePosted: new Date(),
      });

      await comment.save();

      return comment;
    },
  },
};

module.exports = resolvers;