const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { typeDefs, resolvers } = require("./schema");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require('./utils/auth');
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/graphql",
    cors(),
    expressMiddleware(server, {
      // Your async context function should async and
      // return an object
      context: async ({ req, res }) => ({
        req,
      }),
    })
  );

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
