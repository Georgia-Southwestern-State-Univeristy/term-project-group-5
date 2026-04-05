import { useEffect, useState } from "react";
import axios from "axios";

export default function SavedFlightsModal({ onClose }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {


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
        const res = await axios.get(`${API_BASE}/api/flights/save`, {
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
 

  // ===== UI =====
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} style={closeBtnStyle}>✕</button>

        <h2>Saved Flights</h2>

        {loading && <p>Loading...</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {!loading && !error && flights.length === 0 && (
          <p>No saved flights yet.</p>
        )}

        {!loading && !error && flights.map((flight) => (
          <div key={flight.id} style={cardStyle}>
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
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ===== Styles ===== */

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