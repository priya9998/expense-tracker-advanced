function SearchBar({ search, setSearch }) {
  return (
    <div className="search-section">
      <input
        type="text"
        className="search-input"
        placeholder="search-transaction..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
export default SearchBar;
