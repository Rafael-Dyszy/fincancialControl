const express = require('express');
const transactionRouter = express.Router();

const service = require('../services/transactionService');

// method get
transactionRouter.get('/', async (req, res) => {
  const { query } = req;

  try {
    if (!query.period) {
      throw new Error(`you need put period yyyy-mm.`);
    }
    const { period } = query;

    // validation of period
    if (period.length !== 7) {
      throw new Error(`Invalid period, use yyyy-mm`);
    }
    // mongoDB integration
    const filteredTransactions = await service.getTransactionsFrom(period);

    res.send({
      length: filteredTransactions.length,
      transactions: filteredTransactions,
    });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

// post route
transactionRouter.post('/', async (req, res) => {
  const { body } = req;
  // validation
  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error(`You need put data.`);
    }
    // mongoDB integration
    const { description, value, category, year, month, day, type } = body;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;
    const postTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };
    const newTransaction = await service.postTransaction(postTransaction);

    res.send({
      status: `OK`,
      transaction: newTransaction,
    });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

// put router
transactionRouter.put('/:id', async (req, res) => {
  const { body, params } = req;

  try {
    // validation
    if (JSON.stringify(body) === '{}') {
      throw new Error(`You need put data.`);
    }

    // mongoDB integration
    const { description, value, category, year, month, day, type } = body;
    const { id } = params;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;
    const updateTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };
    const updatedTransaction = await service.updateTransaction(
      id,
      updateTransaction
    );

    res.send({
      status: `OK`,
      transaction: updatedTransaction,
    });
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

// put id validation
transactionRouter.put('/', async (req, res) => {
  try {
    throw new Error('ID nonexistent');
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

// delete id validation
transactionRouter.delete('/', async (req, res) => {
  try {
    throw new Error('ID nonexistent');
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

// endpoint delete
transactionRouter.delete('/:id', async (req, res) => {
  const { params } = req;

  try {
    // mongoDB integration
    const { id } = params;
    const deletedTransaction = await service.deleteTransaction(id);
    if (deletedTransaction) {
      res.send({
        status: `OK`,
        message: `success id ${id} deleted!`,
      });
    } else {
      throw new Error(`cant delete ID`);
    }
  } catch ({ message }) {
    res.status(400).send({ error: message });
  }
});

module.exports = transactionRouter;
