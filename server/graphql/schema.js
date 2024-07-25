const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Income {
    id: ID!
    user: User!
    amount: Float!
    description: String
  }

  type Expense {
    id: ID!
    user: User!
    amount: Float!
    description: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    incomes: [Income!]!
    expenses: [Expense!]!
    totalIncome: Float!
    totalExpenses: Float!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addIncome(amount: Float!, description: String): Income
    addExpense(amount: Float!, description: String): Expense
  }
`;

module.exports = typeDefs;
