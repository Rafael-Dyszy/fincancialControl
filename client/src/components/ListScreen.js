import React from 'react';

const earnColor = 'green';
const spendColor = 'red';

const ListScreen = ({
  periods,
  currentPeriod,
  filter,
  handleDelete,
  handleEdit,
  handleFilter,
  handlePeriodChange,
  onNewTransaction,
  filteredTransactions,
}) => {
  const { box } = style;

  return (
    <div>
      <select
        id="datePeriod"
        className="browser-default btn white black-text"
        value={currentPeriod}
        onChange={handlePeriodChange}
      >
        {periods.map((period) => {
          return (
            <option value={period} key={period}>
              {period}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="filtro..."
        value={filter}
        onChange={handleFilter}
        style={{ marginTop: '40px', marginBottom: '20px' }}
      />

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <button
          className="waves-effect waves-light btn"
          onClick={onNewTransaction}
        >
          New Data
        </button>
      </div>

      {filteredTransactions.map((transaction) => {
        const currentColor =
          transaction.category === 'Receita' ? earnColor : spendColor;
        return (
          <div
            key={transaction._id}
            style={{ ...box, backgroundColor: currentColor }}
          >
            <span style={{ padding: '10px' }}>
              <button
                className="waves-effect waves-light btn darken-4"
                onClick={handleEdit}
                id={transaction._id}
              >
                Editar
              </button>
              <button
                style={{ marginLeft: '10px' }}
                className="waves-effect waves-light btn red darken-4"
                onClick={handleDelete}
                id={transaction._id}
              >
                X
              </button>
            </span>
            <span>
              <strong>{transaction.day} - </strong>
              <strong>{transaction.category} - </strong>
              {transaction.description} - {transaction.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const style = {
  box: {
    boxShadow: '1px 1px 8px #ccc',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px',
  },
};

export default ListScreen;
