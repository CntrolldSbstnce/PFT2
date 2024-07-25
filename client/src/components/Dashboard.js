import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TOTALS = gql`
  query GetTotals {
    totalIncome
    totalExpenses
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_TOTALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const remainingBudget = data.totalIncome - data.totalExpenses;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Income: ${data.totalIncome}</p>
      <p>Total Expenses: ${data.totalExpenses}</p>
      <p>Remaining Budget: ${remainingBudget}</p>
    </div>
  );
};

export default Dashboard;
