const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.log('Database connection failed:', error);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add the user to the context
    const token = req.headers.authorization || '';
    return { token };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });
  console.log(`Apollo Server ready at http://localhost:${PORT}/graphql`);
});

app.use('/api/users', userRoutes);
