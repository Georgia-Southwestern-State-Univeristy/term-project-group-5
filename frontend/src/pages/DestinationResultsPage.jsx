import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import FlightSearchCard from "../components/FlightSearchCard";
import Navbar from "../components/NavBar";

export default function DestinationResultsPage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("price");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const originCode = searchParams.get("departure");
  const destinationCity = searchParams.get("destination");
  const destinationCodes = JSON.parse(
    searchParams.get("destinationCodes") || "[]"
  );
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const adults = Number(searchParams.get("travelers")) || 1;
  const searchType = searchParams.get("search");
  const location = useLocation();
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const results = useMemo(() => {
    if (searchType === "destination") {
      return location.state?.results || [];
    }
    return [];
  }, [searchType, location.state]);

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

      const res = await fetch(`${API_BASE}/api/flights/save`, {
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
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Flight saved to your profile!");
      } else {
        alert(data.message || "Failed to save flight.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Network error. Could not save flight.");
    }
  };

  useEffect(() => {
    if (searchType === "destination" && results.length > 0) {
      const destinationOptions = results.map((dest) => ({
        city: dest.name,
        airportCodes: dest.airportCodes || []
      }));

      localStorage.setItem(
        "destinationSuggestions",
        JSON.stringify(destinationOptions)
      );
    }
  }, [searchType, results]);

  useEffect(() => {
    if (searchType !== "flight") return;

    const fetchFlights = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/api/flights/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            originCode,
            destinationCodes,
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
        console.log("API response:", data);

      } catch (err) {
        console.error(err);
        setError("Unable to load flight offers.");
      }

      setLoading(false);
    };

    console.log("calling flight API", {
      originCode,
      destinationCity,
      destinationCodes,
      departureDate,
      returnDate,
    });

    fetchFlights();
  }, [searchType, originCode, destinationCodes, departureDate, returnDate, adults]);

  return (
    <div style={pageWrapperStyle}>
      <>
        <Navbar />
      </>

      <div style={searchSectionStyle}>
        <FlightSearchCard
          onSubmit={(data) => {
            const query = new URLSearchParams(data).toString();
            navigate(`/results?search=flight&${query}`);
          }}
        />
      </div>

      <div style={resultsSectionStyle}>
        <button onClick={() => navigate(-1)} style={backButtonStyle}>
          ← Back to Search
        </button>

        <div style={headerRowStyle}>
          <h2>
            {searchType === "destination"
              ? "Destination Suggestions"
              : "Flight Results"}
          </h2>
          <span style={resultCountStyle}>
            {searchType === "destination"
              ? `${results.length} result${results.length !== 1 ? "s" : ""}`
              : `${flights.length} flight${flights.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {searchType === "destination" && results.length === 0 && (
          <div style={emptyStateStyle}>
            <p>No destinations found.</p>
          </div>
        )}

        {searchType === "flight" && flights.length === 0 && !loading && (
          <div style={emptyStateStyle}>
            <p>No flights found.</p>
          </div>
        )}

        {searchType === "destination" && (
          <div style={gridStyle}>
            {results.map((dest) => (
              <div key={dest.id} style={cardStyle}>
                <img src={dest.image_url} alt={dest.name} style={imageStyle} />
                <div style={{ padding: "1.2rem", flex: 1 }}>
                  <h3>{dest.name}</h3>
                  <p style={descriptionStyle}>{dest.description}</p>
                </div>
                <button style={viewButtonStyle}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {searchType === "flight" && (
          <>
            {loading && <p>Loading flights...</p>}
            {error && <p className="error">{error}</p>}

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

            <div className="results-grid">
              {sortedFlights.map((flight) => {
                const segment = flight.segments?.[0];

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

                    <p><strong>Duration:</strong> {flight.duration}</p>
                    <p><strong>Stops:</strong> {segment?.numberOfStops}</p>

                    <p className="price">
                      {flight.price.currency} {flight.price.total}
                    </p>

                    <div style={buttonGroupStyle}>
                      <button className="details-btn" style={viewBtnOverride}>
                        View Details
                      </button>

                      <button
                        className="details-btn"
                        style={saveBtnOverride}
                        onClick={() => handleSaveFlight(flight)}
                      >
                        Save Flight
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}