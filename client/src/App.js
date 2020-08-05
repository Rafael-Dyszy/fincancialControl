import React from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { periods } from './helpers/periods';
import ListScreen from './components/ListScreen';
import MaintenanceScreen from './components/MaintenanceScreen';

// config axios from api
const api = axios.create({ baseURL: 'api' });

const resource = '/transaction';

export default function App() {
  const listScreen = 0;
  const maintenanceScreen = 1;

  // states of application
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(periods[0]);
  const [currentScreen, setCurrentScreen] = React.useState(listScreen);
  const [filter, setFilter] = React.useState('');
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [newTransaction, setNewTransaction] = React.useState(false);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`);

      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, [currentPeriod]);

  React.useEffect(() => {
    let newFilterd = [...transactions];
    if (filter.trim() !== '') {
      newFilterd = newFilterd.filter((transaction) => {
        return transaction.description.toLowerCase().includes(filter);
      });
    }

    setFilteredTransactions(newFilterd);
  }, [transactions, filter]);

  // useeffect to edit transaction
  React.useEffect(() => {
    const newScreen =
      selectedTransaction !== null || newTransaction
        ? maintenanceScreen
        : listScreen;
    setCurrentScreen(newScreen);
  }, [selectedTransaction, newTransaction]);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  // delete transactions
  const handleDelete = async (event) => {
    const id = event.target.id;

    await api.delete(`${resource}/${id}`);
    const newTransactions = transactions.filter((transaction) => {
      return transaction._id !== id;
    });
    setTransactions(newTransactions);
  };

  // functo to edit
  const handleEdit = async (event) => {
    const id = event.target.id;

    const newSelectedTransaction = filteredTransactions.find((transaction) => {
      return transaction._id === id;
    });
    setSelectedTransaction(newSelectedTransaction);
  };

  // function to get period
  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  };

  const handleFilter = (event) => {
    const text = event.target.value.trim();
    setFilter(text.toLowerCase());
  };

  const CancelMaintenance = () => {
    setNewTransaction(false);

    setSelectedTransaction(null);
  };

  const saveMaintenance = async (newTransaction) => {
    console.log(newTransaction);
    const { _id } = newTransaction;

    if (!_id) {
      const insertTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10)),
      };
      const { data } = await api.post(`${resource}`, insertTransaction);

      const newTransactions = [...transactions, data.transaction];
      newTransactions.sort((a, b) =>
        a.yearMonthDay.localeCompare(b.yearMonthDay)
      );
      setTransactions(newTransactions);
      setNewTransaction(false);
    } else {
      const completeTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10)),
      };
      await api.put(`${resource}/${_id}`, completeTransaction);

      const newTransactions = [...transactions];
      const index = newTransactions.findIndex((transaction) => {
        return transaction._id === completeTransaction._id;
      });
      newTransactions[index] = completeTransaction;

      setTransactions(newTransactions);
      setSelectedTransaction(null);
    }
  };

  const handleNewTransaction = async () => {
    setNewTransaction(true);
  };

  return (
    <div className="container">
      <h1 className="center">Financial</h1>
      {currentScreen === listScreen ? (
        <ListScreen
          periods={periods}
          currentPeriod={currentPeriod}
          filter={filter}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleFilter={handleFilter}
          handlePeriodChange={handlePeriodChange}
          filteredTransactions={filteredTransactions}
          onNewTransaction={handleNewTransaction}
        />
      ) : (
        <MaintenanceScreen
          transaction={selectedTransaction}
          onCancel={CancelMaintenance}
          onSave={saveMaintenance}
        />
      )}
    </div>
  );
}
