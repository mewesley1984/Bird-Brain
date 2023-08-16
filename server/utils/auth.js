const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  verifyToken: (req, requireAuth = true) => {
    const header = req.headers.authorization;

    if (header) {
      const token = header.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET, { maxAge: expiration });
      return decoded;
    }
    if (requireAuth) {
      throw new Error('Login in to access resource');
    }
    return null
  },
  signToken: function ({ email, username, password }) {
    const payload = { email, username, password };
    return jwt.sign({ data: payload }, "hello", { expiresIn: expiration });
  },
};
