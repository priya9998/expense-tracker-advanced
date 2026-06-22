import { useState } from "react";
function TransactionForm({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const [transactionType, setTransactionType] = useState("Income");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || amount === "" || date === "") {
      alert("Please fill all fields");
      return;
    }
    const newTransaction = {
      title,
      amount: Number(amount),
      transactionType,
      category,
      date,
    };
    addTransaction(newTransaction);
    setTitle("");
    setAmount("");
    setDate("");
  };
  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Salary">Salary</option>
        <option value="Education">Education </option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
}
export default TransactionForm;
