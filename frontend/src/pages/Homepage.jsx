import { useNavigate } from "react-router-dom";
import FlightSearchCard from "../components/FlightSearchCard";

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (data) => {
    const query = new URLSearchParams(data).toString();
    navigate(`/results?${query}`);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto" }}>
      
      {/* ===== Title ===== */}
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Find Flight
      </h1>

      {/* ===== Reusable Search Card ===== */}
      <FlightSearchCard onSubmit={handleSearch} />

      {/* ===== Help Section ===== */}
      <div
        style={{
          marginTop: "4rem",
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px"
        }}
      >
        <h2>Find Your Next Destination</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Discover places that match your vibe and budget！
        </p>

        <button
          style={{
            padding: "0.8rem 2rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
          onClick={() => navigate("/attributes")}
        >
          Start Here
        </button>
      </div>
    </div>
  );
}