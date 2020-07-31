import React from 'react';
import axios from 'axios';

// config axios from api
const api = axios.create({ baseURL: 'api' });

export default function App() {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get('/transaction?period=2019-07');
      console.log(data);

      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>

      {transactions.map((transaction) => {
        return <p key={transaction}>{transaction}</p>;
      })}
    </div>
  );
}
