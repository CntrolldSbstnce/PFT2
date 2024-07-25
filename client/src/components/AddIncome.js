import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_INCOME = gql`
  mutation AddIncome($amount: Float!, $description: String) {
    addIncome(amount: $amount, description: $description) {
      id
      amount
      description
      date
    }
  }
`;

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [addIncome] = useMutation(ADD_INCOME);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addIncome({ variables: { amount: parseFloat(amount), description } });
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
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncome;
