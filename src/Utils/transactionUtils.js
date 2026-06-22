export const calculateIncome = (transactions) => {
  return transactions
    .filter((transaction) => transaction.transactionType === "Income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
};

export const calculateExpense = (transactions) => {
  return transactions
    .filter((transaction) => transaction.transactionType === "Expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
};
export const calculateBalance = (transactions) => {
  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  return income - expense;
};
