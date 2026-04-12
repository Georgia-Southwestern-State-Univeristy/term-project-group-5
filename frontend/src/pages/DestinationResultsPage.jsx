import { useSearchParams, useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect , useMemo} from "react";
import ResultsHeader from "../components/ResultsHeader";
import FlightSearchCard from "../components/FlightSearchCard";
import Navbar from "../components/NavBar";
import DestinationResultsView from "../components/DesinationResultsView";
import FlightResultsView from "../components/FlightResultsView";
import { useFlightSearch } from "../hooks/useFlightSearch";

export default function DestinationResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // All logic is now one line:
  const { sortedFlights, loading, error, sortBy, setSortBy, searchType , handleSaveFlight} = useFlightSearch(searchParams);

  // Simple derivation for destination mode
  const destinationResults = searchType === "destination" ? (location.state?.results || []) : [];

  return (
    <div style={pageWrapperStyle}>
      <Navbar />
      <FlightSearchCard 
        onSubmit={(data) => navigate(`/results?search=flight&${new URLSearchParams(data)}`)}
        suggestions={destinationResults}
      />

      <div style={resultsSectionStyle}>
        <ResultsHeader searchType={searchType} count={searchType === "flight" ? sortedFlights.length : destinationResults.length} onBack={() => navigate(-1)}/>
        
        {searchType === "flight" ? (
          <FlightResultsView 
            flights={sortedFlights} 
            loading={loading} 
            error={error} 
            sortBy={sortBy} 
            onSortChange={setSortBy} 
            onSave={handleSaveFlight}
          />
        ) : (
          <DestinationResultsView results={destinationResults} />
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