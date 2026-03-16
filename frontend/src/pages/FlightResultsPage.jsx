import React, { useState } from "react";
import "../styles/flights.css";

const API_BASE = "http://backend:5001/api";

export default function FlightResultsPage() {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/flights/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          originCode,
          destinationCode,
          departureDate,
          adults
        })
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

      {/* SEARCH BAR */}
      <div className="search-box">
        <h2>Find Flights</h2>

        <div className="search-grid">
          <input
            placeholder="Origin (JFK)"
            value={originCode}
            onChange={(e) => setOriginCode(e.target.value)}
          />

          <input
            placeholder="Destination (PAR)"
            value={destinationCode}
            onChange={(e) => setDestinationCode(e.target.value)}
          />

          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />

          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search Flights
          </button>
        </div>
      </div>

      {loading && <p>Loading flights...</p>}
      {error && <p className="error">{error}</p>}

      {/* FLIGHT RESULTS */}
      <div className="results-grid">

        {flights.map((flight) => {

          const itinerary = flight.itineraries?.[0];
          const segment = itinerary?.segments?.[0];

          return (
            <div className="flight-card" key={flight.id}>

              <h3>
                {flight.airline} ({flight.airlineCode})
              </h3>

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
                <strong>Duration:</strong> {itinerary?.duration}
              </p>

              <p>
                <strong>Stops:</strong> {segment?.numberOfStops}
              </p>

              <p className="price">
                {flight.price.currency} {flight.price.total}
              </p>

              <p className="seats">
                Seats Available: {flight.numberOfBookableSeats}
              </p>

              <button className="details-btn">
                View Details
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}
