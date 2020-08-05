import React from 'react';

const inserting = 0;
const edditing = 1;

function today() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const today = `${year}-${month}-${day}`;
  return today;
}

const MaintenanceScreen = ({ transaction, onCancel, onSave }) => {
  const [description, setDescription] = React.useState('New Description');
  const [value, setValue] = React.useState(10);
  const [category, setCategory] = React.useState('New category');
  const [date, setDate] = React.useState(today());
  const [type, setType] = React.useState('-');
  const [mode, setMode] = React.useState(inserting);

  React.useEffect(() => {
    if (!transaction) {
      return;
    }
    const { description, value, category, yearMonthDay } = transaction;

    setDescription(description);
    setValue(value);
    setCategory(category);
    setDate(yearMonthDay);
    setType(type);
    setMode(edditing);
  }, [transaction]);

  const handleDescription = (event) => {
    const newDescription = event.target.value.trim();
    setDescription(newDescription);
  };

  const handleValue = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };

  const handleCategory = (event) => {
    const newCategory = event.target.value.trim();
    setCategory(newCategory);
  };

  const handleDate = (event) => {
    const newDate = event.target.value.trim();
    setDate(newDate);
  };

  const handleType = (event) => {
    const newType = event.target.value;
    setType(newType);
  };

  const cancelClick = () => {
    onCancel();
  };

  const SaveClick = () => {
    const newTransaction = {
      _id: !!transaction ? transaction._id : null,
      description,
      value,
      type,
      yearMonthDay: date,
      category,
    };
    onSave(newTransaction);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <span>
          <label>
            <input
              type="radio"
              name="expensive_earning"
              checked={type === '-'}
              onChange={handleType}
              value="-"
            />
            <span>Spend</span>
          </label>
        </span>
        <span style={{ marginLeft: '30px' }}>
          <label>
            <input
              type="radio"
              name="expensive_earning"
              checked={type === '+'}
              onChange={handleType}
              value="+"
            />
            <span>Earn</span>
          </label>
        </span>
      </div>

      <div className="input-field">
        <input
          type="text"
          value={description}
          id="inputDescription"
          className="validate"
          onChange={handleDescription}
        />
        <label htmlFor="inputDescription" className="active">
          Description:
        </label>
      </div>

      <div className="input-field">
        <input
          type="number"
          value={value}
          id="inputValue"
          onChange={handleValue}
        />
        <label htmlFor="inputValue" className="active">
          Value:
        </label>
      </div>

      <div className="input-field">
        <input
          type="text"
          value={category}
          id="inputCategory"
          onChange={handleCategory}
        />
        <label htmlFor="inputCategory" className="active">
          Category:
        </label>
      </div>

      <div className="input-field">
        <input type="date" value={date} id="inputDate" onChange={handleDate} />
        <label htmlFor="inputDate" className="active">
          Date:
        </label>
      </div>
      <button className="waves-effect waves-light btn" onClick={SaveClick}>
        Salvar
      </button>
      <button
        className="waves-effect waves-light btn red darken-4"
        style={{ marginLeft: '10px' }}
        onClick={cancelClick}
      >
        Cancelar
      </button>
    </div>
  );
};

export default MaintenanceScreen;
