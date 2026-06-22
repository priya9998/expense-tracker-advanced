function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="sort-container">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest</option>
        <option value="lowest">Lowest</option>
      </select>
    </div>
  );
}
export default SortDropdown;
