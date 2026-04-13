import React from "react";

const FlightCard = ({ flight, onSave }) => {
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
                onClick={() => onSave(flight)}
              >
                Save Flight
              </button>
            </div>
          </div>
  );
};

export default FlightCard;


const buttonGroupStyle = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
    padding: "0 1rem 1rem 1rem" 
  };

  const viewBtnOverride = {
    flex: 1, 
    backgroundColor: "#f1f3f4",
    color: "#3c4043",
    border: "1px solid #dadce0",
    margin: 0
  };
  
  const saveBtnOverride = {
    flex: 1, 
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    margin: 0
  };