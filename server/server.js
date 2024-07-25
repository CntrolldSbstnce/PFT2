// server.js
require('dotenv').config();  // Load environment variables
const config = require('./config/config'); // Ensure this path is correct
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, AuthenticationError } = require('apollo-server-express'); // Add AuthenticationError here
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const startServer = async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const user = jwt.verify(token.split(' ')[1], `${process.env.JWT_SECRET}`);
          return { user };
        } catch (err) {
          console.error('Token verification error:', err);
          throw new AuthenticationError('Invalid/Expired token');
        }
      }
      return {};
    },
  });

  await server.start(); // Await server start before applying middleware
  server.applyMiddleware({ app });

  mongoose
    .connect(config.mongoURI)
    .then(() => {
      app.listen(config.port, () => {
        console.log(`Server is running on http://localhost:${config.port}${server.graphqlPath}`);
      });
    })
    .catch((err) => {
      console.error('Database connection failed:', err.message);
    });
};

startServer();