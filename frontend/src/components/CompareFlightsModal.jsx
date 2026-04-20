import { useMemo } from "react";

export default function CompareFlightsModal({
  onClose,
  compareFlights,
  setCompareFlights
}) {

  const getId = (f) => f.id || f._id;

  // ❗ remove
  const handleRemove = (id) => {
    const updated = compareFlights.filter(f => getId(f) !== id);
    setCompareFlights(updated);
    localStorage.setItem("compareFlights", JSON.stringify(updated));
  };

  // ❗ clear
  const handleClear = () => {
    localStorage.removeItem("compareFlights");
    setCompareFlights([]);
  };

  // ===== helper =====

  const formatTime = (time) =>
    time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A";

  const getStops = (flight) => flight.segments.length - 1;

  // duration 
  const parseDuration = (duration) => {
    if (!duration) return 0;
    const [h, m] = duration.split("h");
    return parseInt(h) * 60 + parseInt(m);
  };

  // ===== compare logic =====
  const [f1, f2] = compareFlights;

  const priceA = f1?.price?.total || 0;
  const priceB = f2?.price?.total || 0;

  const durationA = parseDuration(f1?.duration);
  const durationB = parseDuration(f2?.duration);

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>

        <button style={closeBtn} onClick={onClose}>✕</button>

        <h2>Compare Flights</h2>
        <p style={{ color: "#666" }}>
          Compare price, duration, and route side-by-side
        </p>

        {compareFlights.length === 0 && <p>No flights selected.</p>}

        {compareFlights.length > 0 && (
          <div style={{ display: "flex", gap: "20px" }}>

           
            <div style={labelColumn}>
              <p>Airline</p>
              <p>Price</p>
              <p>Duration</p>
              <p>Route</p>
              <p>Stops</p>
              <p>Departure</p>
              <p>Arrival</p>
            </div>

            {/* Flight A */}
            {f1 && (
              <div style={cardStyle}>
                <p>{f1.airline}</p>

                <p style={{
                  color: f2 && priceA > priceB ? "red" : "green"
                }}>
                  ${priceA}
                </p>

                <p style={{
                  color: f2 && durationA > durationB ? "red" : "green"
                }}>
                  {f1.duration}
                </p>

                <p>
                  {f1.segments[0].departure.iataCode} →{" "}
                  {f1.segments[f1.segments.length - 1].arrival.iataCode}
                </p>

                <p>{getStops(f1)} stops</p>

                <p>{formatTime(f1.segments[0].departure.at)}</p>
                <p>{formatTime(f1.segments[f1.segments.length - 1].arrival.at)}</p>

                <button
                  style={removeBtn}
                  onClick={() => handleRemove(getId(f1))}
                >
                  Remove
                </button>
              </div>
            )}

            {/* Flight B */}
            {f2 && (
              <div style={cardStyle}>
                <p>{f2.airline}</p>

                <p style={{
                  color: f1 && priceB > priceA ? "red" : "green"
                }}>
                  ${priceB}
                </p>

                <p style={{
                  color: f1 && durationB > durationA ? "red" : "green"
                }}>
                  {f2.duration}
                </p>

                <p>
                  {f2.segments[0].departure.iataCode} →{" "}
                  {f2.segments[f2.segments.length - 1].arrival.iataCode}
                </p>

                <p>{getStops(f2)} stops</p>

                <p>{formatTime(f2.segments[0].departure.at)}</p>
                <p>{formatTime(f2.segments[f2.segments.length - 1].arrival.at)}</p>

                <button
                  style={removeBtn}
                  onClick={() => handleRemove(getId(f2))}
                >
                  Remove
                </button>
              </div>
            )}

          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button style={clearBtn} onClick={handleClear}>
            Clear All
          </button>
        </div>

      </div>
    </div>
  );
}

/* ===== styles ===== */

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
  width: "800px",
  maxHeight: "80vh",
  overflowY: "auto",
  position: "relative"
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "12px",
  border: "none",
  background: "transparent",
  fontSize: "20px",
  cursor: "pointer"
};

const labelColumn = {
  fontWeight: "bold",
  minWidth: "120px"
};

const cardStyle = {
  flex: 1,
  border: "1px solid #ddd",
  padding: "1rem",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9"
};

const removeBtn = {
  marginTop: "10px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "6px",
  borderRadius: "5px"
};

const clearBtn = {
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px"
};
