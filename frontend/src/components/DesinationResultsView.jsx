export default function DestinationResultsView({ results }) {
    if (results.length === 0) {
      return <div style={emptyStateStyle}><p>No destinations found.</p></div>;
    }
  
    return (
      <div style={gridStyle}>
        {results.map((dest) => (
          <div key={dest.id} style={cardStyle}>
            <img src={dest.image_url} alt={dest.name} style={imageStyle} />
            <div style={{ padding: "1.2rem", flex: 1 }}>
              <h3>{dest.name}</h3>
              <p style={descriptionStyle}>{dest.description}</p>
            </div>
            <button style={viewButtonStyle}>View Details</button>
          </div>
        ))}
      </div>
    );
  }

const emptyStateStyle = {
    textAlign: "center",
    padding: "2rem",
    color: "#777"
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem"
};

const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease"
};


const viewButtonStyle = {
    padding: "0.6rem",
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  };


const descriptionStyle = {
    color: "#555",
    fontSize: "0.9rem",
    lineHeight: "1.4"
};

const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover"
};