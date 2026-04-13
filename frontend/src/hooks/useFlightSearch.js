import { useState, useEffect, useMemo } from "react";

export function useFlightSearch(searchParams) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const API_BASE = import.meta.env.VITE_API_URL || "";


  // Centralized Parameter Parsing (Internal to the hook)
  const searchConfig = useMemo(() => ({
    originCode: searchParams.get("departure"),
    destinationCode: searchParams.get("destination"),
    departureDate: searchParams.get("departureDate"),
    returnDate: searchParams.get("returnDate"),
    adults: Number(searchParams.get("travelers")) || 1,
    searchType: searchParams.get("search")
  }), [searchParams]);

  // The Fetch Logic
  useEffect(() => {
    if (searchConfig.searchType !== "flight") return;

    const fetchFlights = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const API_BASE = import.meta.env.VITE_API_URL || "";
        
        const res = await fetch(`${API_BASE}/api/flights/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(searchConfig),
        });

        if (!res.ok) throw new Error("Flight search failed");
        const data = await res.json();
        setFlights(data);
      } catch (err) {
        setError("Unable to load flight offers.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchConfig]);

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
      if (!token) return alert("Please log in!");

      const res = await fetch(`${API_BASE}/api/flights/save`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(flight)
      });
      
      if (res.ok) alert("Flight saved!");
    } catch (err) {
      console.error(err);
    }
  };

  return { 
    flights, 
    sortedFlights, 
    loading, 
    error, 
    sortBy, 
    setSortBy, 
    searchType: searchConfig.searchType,
    handleSaveFlight
  };
}