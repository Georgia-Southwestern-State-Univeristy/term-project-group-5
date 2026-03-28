import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightSearchCard from "../components/FlightSearchCard";
export default function DestinationResultsPage() {
  const navigate = useNavigate();


  

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const originCode = searchParams.get("departure");
  const destinationCode = searchParams.get("destination");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const adults = Number(searchParams.get("travelers")) || 1;
  const searchType = searchParams.get("search");
  const location = useLocation();
  let results = [];

  if (searchType === "destination") {
      results = location.state?.results || [];
  }
  //const [searchParams] = useSearchParams();
  //const queryObject = Object.fromEntries(searchParams.entries());
  /*const attributeMap = {
    Budget: {
        "1": "Low",
        "2": "Medium",
        "3": "High"
    },
    Vibe: {
        "4": "Relaxing",
        "5": "Adventure"
    },
    Season: {
        "6": "Summer",
        "7": "Winter"
    }
};
  const readableFilters = Object.entries(queryObject).map(
  ([key, value]) => ({
    key,
    label: attributeMap[key]?.[value] || value
  })
);*/
  /* Mock
  const mockResults = [
  {
    id: "1",
    name: "Hawaii",
    description: "Warm beaches and relaxing atmosphere.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    attributes: { Budget: "2", Vibe: "4", Season: "6" }
  },
  {
    id: "2",
    name: "Switzerland",
    description: "Mountain adventure and fresh air.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    attributes: { Budget: "3", Vibe: "5", Season: "7" }
  },
  {
    id: "3",
    name: "Japan",
    description: "Cultural exploration and amazing food.",
    image: "https://images.unsplash.com/photo-1505060894824-8443e82d2e1c",
    attributes: { Budget: "2", Vibe: "5", Season: "6" }
  },
  {
    id: "4",
    name: "Bali",
    description: "Tropical paradise with peaceful vibes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    attributes: { Budget: "1", Vibe: "4", Season: "6" }
  }
];


  const filteredResults = mockResults.filter((dest) => {
    return Object.entries(queryObject).every(([key, value]) => {
      return dest.attributes[key] === value;
    });
  });
*/
useEffect(() => {
  if (searchType !== "flight") return;

  const fetchFlights = async () => {
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
      console.log("API response:", data);

    } catch (err) {
      console.error(err);
      setError("Unable to load flight offers.");
    }

    setLoading(false);
  };
  console.log("calling flight API", {
  originCode,
  destinationCode,
  departureDate,
  returnDate,
});
  fetchFlights();
}, [searchType, originCode, destinationCode, departureDate, returnDate, adults]);
  return (
  <div style={pageWrapperStyle}>
    
    {/* Search Card Section */}
    <div style={searchSectionStyle}>
      <FlightSearchCard
        onSubmit={(data) => {
          const query = new URLSearchParams(data).toString();
          navigate(`/results?search=flight&${query}`);
        }}
      />
    </div>

    {/* Results Section */}
      
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
           : `${flights.length} flight${flights.length !== 1 ? "s" : ""}`
        }
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

    <div className="results-grid">
      {flights.map((flight) => {
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

            <button className="details-btn">View Details</button>
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
/* ===== Page Layout ===== */

const pageWrapperStyle = {
  maxWidth: "1200px",
  margin: "2rem auto",
  padding: "0 1rem"
};

const searchSectionStyle = {
  marginBottom: "3rem"
};

const resultsSectionStyle = {
  backgroundColor: "#f8f9fa",
  padding: "2rem",
  borderRadius: "16px"
};

/* ===== Header ===== */

const headerRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem"
};

const resultCountStyle = {
  fontSize: "0.9rem",
  color: "#666"
};

const backButtonStyle = {
  marginBottom: "1.5rem",
  background: "none",
  border: "none",
  color: "#1a73e8",
  cursor: "pointer",
  fontWeight: "500"
};

/* ===== Empty State ===== */

const emptyStateStyle = {
  textAlign: "center",
  padding: "2rem",
  color: "#777"
};

/* ===== Grid ===== */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "1.5rem"
};

/* ===== Card ===== */

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease"
};

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover"
};

const descriptionStyle = {
  color: "#555",
  fontSize: "0.9rem",
  lineHeight: "1.4"
};

const viewButtonStyle = {
  margin: "1rem",
  padding: "0.6rem",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "500"
};