import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import "../styles/NavBar.css";
//import { useState } from "react";
import SavedFlightsModal from "../components/SavedFlightsModal";
export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSavedFlights, setShowSavedFlights] = useState(false);
  /*useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);*/

  const handleLogout = () => {
    logout(); 
    navigate("/");
    setShowSavedFlights(false);
  };
  const getUsername = () => {
    if (!user?.email) return "";
    return user.email.split("@")[0];
  };

  return (
    <div className="navbar">
      {showSavedFlights && (
  <SavedFlightsModal onClose={() => setShowSavedFlights(false)} />
)}
      <div className="nav-right">

        {!user ? (
          <button
            className="sign-in-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        ) : (
          <div
            className="user-menu"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="welcome-text">
              {getUsername()}
            </span>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <div onClick={() => navigate("/profile")}>
                  Profile
                </div>

                <div onClick={() => {
                            setShowSavedFlights(true);
                            setShowDropdown(false);
                            }}>
                  View Saved Flights
                </div>

                <div onClick={handleLogout}>
                  Sign Out
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}