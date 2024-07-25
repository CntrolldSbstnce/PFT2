const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Income = require('../models/Income');
const Expense = require('../models/Expense');

const resolvers = {
  Query: {
    incomes: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Unauthenticated');
      return Income.find({ userId: user.id });
    },
    expenses: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Unauthenticated');
      return Expense.find({ userId: user.id });
    },
    totalIncome: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Unauthenticated');
      const incomes = await Income.find({ userId: user.id });
      return incomes.reduce((total, income) => total + income.amount, 0);
    },
    totalExpenses: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Unauthenticated');
      const expenses = await Expense.find({ userId: user.id });
      return expenses.reduce((total, expense) => total + expense.amount, 0);
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();

      const token = jwt.sign({ userId: user.id, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User does not exist');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect');
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

      return { token, user };
    },
    addIncome: async (_, { amount, description }, { user }) => {
      if (!user) throw new AuthenticationError('Unauthenticated');
      const income = new Income({
        amount,
        description,
        userId: user.id,
      });
      return income.save();
    },
    addExpense: async (_, { amount, description }, { user }) => {
      if (!user) throw new AuthenticationError('Unauthenticated');
      const expense = new Expense({
        amount,
        description,
        userId: user.id,
      });
      return expense.save();
    },
  },
};

module.exports = resolvers;
