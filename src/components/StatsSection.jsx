import StatsCard from "./StatsCard";
function StatsSection({ totalTransactions, highestIncome, highestExpense }) {
  return (
    <div className="stats-container">
      <StatsCard title="Total Transactions" value={totalTransactions} />
      <StatsCard title="Highest Income" value={`₹${highestIncome}`} />
      <StatsCard title="Highest Expense" value={`₹${highestExpense}`} />
    </div>
  );
}
export default StatsSection;
