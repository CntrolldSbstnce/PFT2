const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
