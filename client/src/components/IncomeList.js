import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_INCOMES = gql`
  query GetIncomes {
    incomes {
      id
      amount
      description
      date
    }
  }
`;

const IncomeList = () => {
  const { loading, error, data } = useQuery(GET_INCOMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.incomes.map((income) => (
        <li key={income.id}>
          {income.amount} - {income.description} ({new Date(income.date).toLocaleDateString()})
        </li>
      ))}
    </ul>
  );
};

export default IncomeList;
