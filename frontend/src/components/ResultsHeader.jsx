import React from "react";

const ResultsHeader = ({ searchType, count, onBack }) => {
  const title = searchType === "destination" 
    ? "Destination Suggestions" 
    : "Flight Results";

  const countLabel = searchType === "destination"
    ? `${count} result${count !== 1 ? "s" : ""}`
    : `${count} flight${count !== 1 ? "s" : ""}`;

  return (
    <>
      <button onClick={onBack} style={backButtonStyle}>
        ← Back to Search
      </button>

      <div style={headerRowStyle}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span style={resultCountStyle}>{countLabel}</span>
      </div>
    </>
  );
};

export default ResultsHeader;

// Move these from your main file to here
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