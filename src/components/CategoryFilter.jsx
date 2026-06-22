function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
      <option value="all">All Categories</option>
      <option value="Food">Food</option>
      <option value="Salary">Salary</option>
      <option value="Education">Education</option>
    </select>
  );
}
export default CategoryFilter;
