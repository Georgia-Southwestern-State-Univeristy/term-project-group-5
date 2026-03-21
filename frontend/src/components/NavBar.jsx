import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const getUsername = () => {
    if (!user?.email) return "";
    return user.email.split("@")[0];
  };

  return (
    <div className="navbar">
      <div className="nav-right">

        {user ? (
          <>
            <span className="welcome-text">
              Welcome {getUsername()}!
            </span>

            <button
              className="sign-in-btn"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            className="sign-in-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}

      </div>
    </div>
  );
}