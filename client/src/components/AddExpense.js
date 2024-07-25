import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_EXPENSE = gql`
  mutation AddExpense($amount: Float!, $description: String) {
    addExpense(amount: $amount, description: $description) {
      id
      amount
      description
      date
    }
  }
`;

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [addExpense] = useMutation(ADD_EXPENSE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense({ variables: { amount: parseFloat(amount), description } });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
