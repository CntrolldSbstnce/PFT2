import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      id
      amount
      description
      date
    }
  }
`;

const ExpenseList = () => {
  const { loading, error, data } = useQuery(GET_EXPENSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.expenses.map((expense) => (
        <li key={expense.id}>
          {expense.amount} - {expense.description} ({new Date(expense.date).toLocaleDateString()})
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
