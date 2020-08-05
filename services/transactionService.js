const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

async function getTransactionsFrom(period) {
  const transactions = await TransactionModel.find({ yearMonth: period });
  return transactions;
}

async function postTransaction(transaction) {
  const newTransactionDB = await TransactionModel.create(transaction);
  return newTransactionDB;
}

async function updateTransaction(_id, transaction) {
  await TransactionModel.updateOne({ _id: ObjectId(_id) }, transaction);
  return { _id, ...transaction };
}

async function deleteTransaction(_id) {
  const result = await TransactionModel.deleteOne({ _id: ObjectId(_id) });
  return result.deletedCount === 1;
}

module.exports = {
  getTransactionsFrom,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
