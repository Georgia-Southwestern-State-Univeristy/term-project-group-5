import FlightCard from "./FlightCard"; 

export default function FlightResultsView({ flights, loading, error, sortBy, onSortChange, onSave }) {
  if (loading) return <p>Loading flights...</p>;
  if (error) return <p className="error">{error}</p>;
  if (flights.length === 0) return <div style={emptyStateStyle}><p>No flights found.</p></div>;

  return (
    <>
      <div className="sort-container" style={{ margin: "20px 0" }}>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="price">Price (Lowest)</option>
          <option value="duration">Duration</option>
          <option value="stops">Stops (Fewest)</option>
          <option value="airline">Airline (A-Z)</option>
        </select>
      </div>

      <div className="results-grid">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} onSave={onSave} />
        ))}
      </div>
    </>
  );
}



const emptyStateStyle = {
    textAlign: "center",
    padding: "2rem",
    color: "#777"
};