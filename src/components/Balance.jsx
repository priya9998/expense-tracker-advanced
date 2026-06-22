function Balance({ balance, income, expense }) {
  return (
    <div>
      <div className="balance-container">
        <h2>Your Balance</h2>

        <h1>₹{balance}</h1>
      </div>
      <div className="income-expense-container">
        <div className="income">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>
        <div className="expense">
          <h3>Expense</h3>
          <p>₹{Math.abs(expense)}</p>
        </div>
      </div>
    </div>
  );
}
export default Balance;
