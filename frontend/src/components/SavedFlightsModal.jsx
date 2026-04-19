import { useEffect, useState } from "react";
import axios from "axios";
import CompareFlightsModal from "./CompareFlightsModal";

export default function SavedFlightsModal({ onClose }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [compareFlights, setCompareFlights] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const token = localStorage.getItem("token");

  useEffect(() => {

    const stored = JSON.parse(localStorage.getItem("compareFlights")) || [];
        setCompareFlights(stored);
    const fetchSavedFlights = async () => {
       setLoading(true);
       setError("");

        if (!token) {
        setError("Please login to view saved flights.");
        setLoading(false);
        return;
      }
        // MOCK DATA
       /*try {
        
       const mockData = [
          {
            id: 1,
            airline: "Delta",
            price: { total: 320, currency: "USD" },
            duration: "5h 20m",
            segments: [
              {
                departure: { iataCode: "ATL" },
                arrival: { iataCode: "LAX" }
              }
            ]
          },
          {
            id: 2,
            airline: "United",
            price: { total: 280, currency: "USD" },
            duration: "4h 50m",
            segments: [
              {
                departure: { iataCode: "ATL" },
                arrival: { iataCode: "JFK" }
              }
            ]
          }
        ];

        timer = setTimeout(() => {
          setFlights(mockData);
          setLoading(false);
        }, 500);

      } catch (err) {
        setError("Failed to load saved flights.");
        setLoading(false);
      }
    };

    fetchSavedFlights();

    // ✅ 正确 cleanup
    return () => {
      if (timer) clearTimeout(timer);
    };

  }, [token]);

  //  API
  useEffect(() => {
    const fetchSavedFlights = async () => {
      if (!token) {
        setError("Please login to view saved flights.");
        setLoading(false);
        return;
      }*/

      try {
        const res = await axios.get(`${API_BASE}/api/flights/saved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFlights(res.data);

      } catch (err) {
        if (err.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Failed to load saved flights.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSavedFlights();
  }, [token]);

  const getId = (f) => f.id || f._id;

  const isSelected = (flight) =>
  compareFlights.some(f => getId(f) === getId(flight));

  

  const handleAddToCompare = (flight) => {
  const existing = [...compareFlights];
 
  if (existing.length >= 2) {
    alert("You can only compare up to 2 flights.");
    return;
  }

  const alreadyAdded = existing.some(
    f => getId(f) === getId(flight)
  );

  if (alreadyAdded) return;

  const updated = [...existing, flight];
  setCompareFlights(updated);
  localStorage.setItem("compareFlights", JSON.stringify(updated));
};
  // ===== UI =====
  return (
    
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} style={closeBtnStyle}>✕</button>
        <div style={compareBarStyle}>
      <span>{compareFlights.length}/2 flights selected</span>

      <button
        style={{
          ...compareActionBtn,
          backgroundColor: compareFlights.length === 2 ? "#06ea21" : "#ccc",
          cursor: compareFlights.length === 2 ? "pointer" : "not-allowed"
        }}
        disabled={compareFlights.length !== 2}
        onClick={() => setShowCompare(true)}
      >
        Compare Flights
      </button>
    </div>
        <h2>Saved Flights</h2>

        {loading && <p>Loading...</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {!loading && !error && flights.length === 0 && (
          <p>No saved flights yet.</p>
        )}

        {!loading && !error && flights.map((flight) => (
          <div key={flight.id || flight._id} style={cardStyle}>
            <h3>{flight.airline}</h3>

            <p>
              💰 {flight.price.total} {flight.price.currency}
            </p>

            <p>⏱ {flight.duration}</p>

            <div>
              {flight.segments.map((seg, index) => (
                <div key={index} style={segmentStyle}>
                  ✈ {seg.departure.iataCode} → {seg.arrival.iataCode}
                </div>
              ))}
             <button
              style={{
                ...compareBtnStyle,
                backgroundColor: isSelected(flight) ? "#6c757d" : "#007bff"
              }}
              onClick={() => handleAddToCompare(flight)}
              disabled={isSelected(flight)}
              >
                {isSelected(flight) ? "Added" : "Add to Compare"}
              </button>
            </div>
          </div>
        ))}
      
      </div>
      {showCompare && (
        <CompareFlightsModal
        onClose={() => setShowCompare(false)}
        compareFlights={compareFlights}
        setCompareFlights={setCompareFlights}
        />
      )}
    </div>
  );
  
}

/* ===== Styles ===== */
const compareBtnStyle = {
  marginTop: "10px",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer"
};

const compareOpenBtn = {
  marginBottom: "15px",
  padding: "8px 12px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const compareBarStyle = {
  position: "sticky",
  top: 0,
  background: "white",
  padding: "10px 15px",
  borderBottom: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10
};

const compareActionBtn = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  color: "white"
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modalStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "16px",
  width: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
  position: "relative",
  boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "12px",
  border: "none",
  background: "transparent",
  fontSize: "20px",
  cursor: "pointer"
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "1rem",
  marginBottom: "1rem"
};

const segmentStyle = {
  fontSize: "0.9rem",
  color: "#555"
};

