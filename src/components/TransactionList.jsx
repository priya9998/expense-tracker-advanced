function TransactionList({ transactions, deleteTransaction, editTransaction }) {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      {transactions.length === 0 && (
        <p className="empty-message">No transactions found</p>
      )}
      {transactions.map((transaction) => (
        <div
          className={`transaction-item ${transaction.amount > 0 ? "positive" : "negative"}`}
          key={transaction.id}
        >
          <div className="title-section">
            <p>{transaction.title}</p>
            <span className="category-badge">{transaction.category}</span>
          </div>
          <p>
            {new Date(transaction.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <span>
            {transaction.amount > 0 ? "+" : ""} ₹{transaction.amount}
          </span>
          <div className="buttons">
            <button
              className="edit-btn"
              onClick={() => editTransaction(transaction)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTransaction(transaction.id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TransactionList;
