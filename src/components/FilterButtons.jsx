function FilterButtons({ setFilter }) {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("income")}>Income</button>
      <button onClick={() => setFilter("expense")}>Expense</button>
    </div>
  );
}
export default FilterButtons;
