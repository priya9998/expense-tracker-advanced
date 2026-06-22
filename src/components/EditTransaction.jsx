import { useState } from "react";

function EditTransaction({
  editTitle,
  setEditTitle,
  editAmount,
  setEditAmount,
  editDate,
  setEditDate,
  editCategory,
  setEditCategory,
  updatedTransaction,
}) {
  return (
    <div className="transaction-form edit-form">
      <h2>Edit Transaction</h2>
      <input
        type="text"
        placeholder="Edit title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Edit amount"
        value={editAmount}
        onChange={(e) => setEditAmount(e.target.value)}
      />
      <input
        type="date"
        value={editDate}
        onChange={(e) => setEditDate(e.target.value)}
      />
      <select
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
        <option value="Education">Education</option>
      </select>
      <button onClick={updatedTransaction}>Update Transaction</button>
    </div>
  );
}
export default EditTransaction;
