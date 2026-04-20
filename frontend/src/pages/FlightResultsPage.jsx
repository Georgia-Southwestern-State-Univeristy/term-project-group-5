// DEPRECATED PAGE

import FlightSearchCard from "../components/FlightSearchCard";
import React, { useState , useMemo} from "react";
import "../FlightResults.css";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function FlightResultsPage() {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("price");

  const sortedFlights = useMemo(() => {
    const sorted = [...flights]; 
    return sorted.sort((a, b) => {
      if (sortBy === "price") {
        return parseFloat(a.price.total) - parseFloat(b.price.total);
      }
      if (sortBy === "duration") {
        return a.duration.localeCompare(b.duration); 
      }
      if (sortBy === "stops") {
        return (a.segments[0]?.numberOfStops || 0) - (b.segments[0]?.numberOfStops || 0);
      }
      if (sortBy === "airline") {
        return a.airline.localeCompare(b.airline);
      }
      return 0;
    });
  }, [flights, sortBy]);

  const handleSaveFlight = async (flight) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to save flights!");
        return;
      }
  
      const res = await fetch("/api/flights/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id: flight.id,
          airline: flight.airline,
          price: flight.price,
          duration: flight.duration,
          segments: flight.segments
        }) // Sends the entire flight object
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Flight saved to your profile!");
      } else {
        // Handles the 400 "already saved" or 500 errors from your controller
        alert(data.message || "Failed to save flight.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Network error. Could not save flight.");
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          originCode,
          destinationCode,
          departureDate,
          returnDate,
          adults,
        }),
      });

      if (!res.ok) {
        throw new Error("Flight search failed");
      }

      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load flight offers.");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      {/* ===== Reusable Search Card ===== */}
      <FlightSearchCard onSubmit={handleSearch} />

      {loading && <p>Loading flights...</p>}
      {error && <p className="error">{error}</p>}

      {/* 3. Add the Sort Dropdown */}
      {flights.length > 0 && (
        <div className="sort-container" style={{ margin: "20px 0" }}>
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Price (Lowest)</option>
            <option value="duration">Duration</option>
            <option value="stops">Stops (Fewest)</option>
            <option value="airline">Airline (A-Z)</option>
          </select>
        </div>
      )}

      {/* FLIGHT RESULTS */}
      <div className="results-grid">

        {sortedFlights.map((flight) => {
          const segment = flight.segments?.[0]; // Access segments directly

          return (
            <div className="flight-card" key={flight.id}>

              <h3>{flight.airline}</h3>

              <p>
                <strong>Route:</strong>{" "}
                {segment?.departure?.iataCode} → {segment?.arrival?.iataCode}
              </p>

              <p>
                <strong>Departure:</strong>{" "}
                {new Date(segment?.departure?.at).toLocaleString()}
              </p>

              <p>
                <strong>Arrival:</strong>{" "}
                {new Date(segment?.arrival?.at).toLocaleString()}
              </p>

              <p>
                <strong>Duration:</strong> {flight.duration}
              </p>

              <p>
                <strong>Stops:</strong> {segment?.numberOfStops}
              </p>

              <p className="price">
                {flight.price.currency} {flight.price.total}
              </p>

              <p className="seats">
                Seats Available: {flight.numberOfBookableSeats ?? "N/A"}
              </p>

              <button className="details-btn">
                View Details
              </button>
              <button 
                className="details-btn"
                onClick={() => handleSaveFlight(flight)}
              >
                Save Flight
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}
