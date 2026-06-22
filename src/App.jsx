import "./App.css";
import { useState, useEffect } from "react";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import EditTransaction from "./components/EditTransaction";
import FilterButtons from "./components/FilterButtons";
import {
  calculateBalance,
  calculateIncome,
  calculateExpense,
} from "./Utils/transactionUtils";
import SearchBar from "./components/SearchBar";
import StatsSection from "./components/StatsSection";
import SortDropdown from "./components/SortDropdown";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;
    if (filter === "income") {
      return transaction.amount > 0 && matchesSearch && matchesCategory;
    }
    if (filter === "expense") {
      return transaction.amount < 0 && matchesSearch && matchesCategory;
    }
    return matchesSearch && matchesCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "highest") {
      return b.amount - a.amount;
    }
    if (sortBy === "lowest") {
      return a.amount - b.amount;
    }
    if (sortBy === "latest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const addTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      const data = await response.json();
      setTransactions([...transactions, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
      });

      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id,
      );
      setTransactions(updatedTransactions);
    } catch (errotr) {
      console.log(error);
    }
  };
  const editTransaction = (transaction) => {
    setEditId(transaction.id);
    setEditTitle(transaction.title);
    setEditAmount(transaction.amount);
    setEditDate(transaction.date);
    setEditCategory(transaction.category);
  };
  const updatedTransaction = async () => {
    try {
      const updatedData = {
        id: editId,
        title: editTitle,
        amount: Number(editAmount),
        date: editDate,
        category: editCategory,
      };
      await fetch(`http://localhost:3000/transactions/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id === editId) {
          return updatedData;
        }
        return transaction;
      });

      setTransactions(updatedTransactions);
      setEditId(null);
      setEditTitle("");
      setEditAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  const totalTransactions = transactions.length;

  const highestIncome = Math.max(
    ...transactions
      .filter((transaction) => transaction.amount)
      .map((transaction) => transaction.amount),
    0,
  );

  const highestExpense = Math.max(
    ...transactions
      .filter((transaction) => transaction.amount < 0)
      .map((transaction) => Math.abs(transaction.amount)),
    0,
  );

  const balance = calculateBalance(transactions);
  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <Balance balance={balance} income={income} expense={expense} />
      <StatsSection
        totalTransactions={totalTransactions}
        highestIncome={highestIncome}
        highestExpense={highestExpense}
      />

      <TransactionForm addTransaction={addTransaction} />

      <SearchBar search={search} setSearch={setSearch} />
      <div className="dropdowns">
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        {search && (
          <p className="result-count">
            {filteredTransactions.length} transaction(s) found
          </p>
        )}
        <CategoryFilter
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <FilterButtons setFilter={setFilter} />
      <TransactionList
        transactions={sortedTransactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
      {editId && (
        <EditTransaction
          editId={editId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editAmount={editAmount}
          setEditAmount={setEditAmount}
          editDate={editDate}
          setEditDate={setEditDate}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          updatedTransaction={updatedTransaction}
        />
      )}
    </div>
  );
}

export default App;
