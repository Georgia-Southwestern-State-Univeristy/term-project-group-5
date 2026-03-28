import React, { useState } from "react";
import FlightSearchCard from "../components/FlightSearchCard";
import "../FlightResults.css";

const API_BASE = "http://backend:5001/api";

export default function FlightResultsPage() {
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (formData) => {
    setLoading(true);
    setError("");

    setOriginCode(formData.departure);
    setDestinationCode(formData.destination);
    setDepartureDate(formData.departureDate);
    setReturnDate(formData.returnDate);
    setAdults(formData.travelers);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          originCode: formData.departure,
          destinationCode: formData.destination,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate,
          adults: formData.travelers,
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

      {/* FLIGHT RESULTS */}
      <div className="results-grid">

        {flights.map((flight) => {
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

            </div>
          );
        })}

      </div>

    </div>
  );
}
