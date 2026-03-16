import React, { useState, useEffect } from "react";
import "../FlightResults.css";
import { useLocation } from "react-router-dom";
import FlightSearchCard from "../components/FlightSearchCard";
const API_BASE = "/api";



export default function FlightResultsPage() {

  const location = useLocation();
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSearch = async (
  originParam,
  destinationParam,
  dateParam,
  adultsParam
) => {
  const finalOrigin = originParam || originCode;
  const finalDestination = destinationParam || destinationCode;
  const finalDate = dateParam || departureDate;
  const finalAdults = adultsParam || adults;

  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/flights/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        originCode: finalOrigin,
        destinationCode: finalDestination,
        departureDate: finalDate,
        adults: finalAdults,
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
useEffect(() => {
  const params = new URLSearchParams(location.search);

  const origin = params.get("departure");
  const destination = params.get("destination");
  const date = params.get("departureDate");
  const travelers = params.get("travelers");

  if (origin && destination && date) {
    setOriginCode(origin);
    setDestinationCode(destination);
    setDepartureDate(date);
    setAdults(travelers || 1);

    
    handleSearch(origin, destination, date, travelers || 1);
  }
}, [location.search]);

  return (
    <div className="container">
      <FlightSearchCard onSubmit={(data) => {
  handleSearch(
    data.departure,
    data.destination,
    data.departureDate,
    data.travelers
  );
}} />
      {/* SEARCH BAR */}
      
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
