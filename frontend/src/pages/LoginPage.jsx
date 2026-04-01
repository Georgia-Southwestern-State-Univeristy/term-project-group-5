import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Success message from RegisterPage.jsx
  const successMessage = location.state?.message;

  const handleLogin = async () => {
    try {
      setError(null);
      
      if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (!data.token) {
      throw new Error("Login failed. No token returned");
    }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email }));

      navigate("/");
    } catch (err) {
    setError(err.message || "Login failed. Please try again.");
  }
  };

  return (
    <div style={pageWrapperStyle}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={floatingBackButtonStyle}
      >
        ←
      </button>

      <div style={cardStyle}>
        <h2 style={titleStyle}>Sign In</h2>

        {/* Success Message */}
        {successMessage && (
          <p style={successMessageStyle}>
            {successMessage}
          </p>
        )}

        <p style={subtitleStyle}>
        Members can access personalized features for the best travel planning experience
        </p>

        {/* Email */}
        <div style={sectionStyle}>
          <label style={sectionLabelStyle}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div style={sectionStyle}>
          <label style={sectionLabelStyle}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={errorStyle}>{error}</p>
        )}

        {/* Submit */}
        <button style={submitButtonStyle} onClick={handleLogin}>
          Sign In
        </button>

        {/* Create Account */}
        <button
          style={createAccountButtonStyle}
          onClick={() => navigate("/register")}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}

/* ===== Page Layout ===== */

const pageWrapperStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: "#f8f9fa",
  boxSizing: "border-box",
  overflow: "hidden" // Hard stop for scrollbars
};

const cardStyle = {
  backgroundColor: "white",
  padding: "2.5rem",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "500px", 
  minWidth: "320px", 
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "1.5rem"
};

const subtitleStyle = {
  textAlign: "center",
  color: "#666",
  marginBottom: "1.5rem",
  lineHeight: "1.5",
  maxWidth: "400px",
  marginLeft: "auto",
  marginRight: "auto"
};

/* ===== Sections ===== */

const sectionStyle = {
  marginBottom: "1.5rem"
};

const sectionLabelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "600",
  fontSize: "0.95rem"
};

/* ===== Input Field ===== */

const inputStyle = {
  width: "100%",
  height: "42px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem"
};

/* ===== Buttons ===== */

const floatingBackButtonStyle = {
  position: "fixed",
  top: "16px",   
  left: "16px",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  cursor: "pointer",
  fontSize: "1.2rem",
  fontWeight: "600",
  zIndex: 1000
};

const createAccountButtonStyle = {
  width: "100%",
  height: "44px",
  marginTop: "0.75rem",
  backgroundColor: "white",
  color: "#1a73e8",
  border: "1px solid #1a73e8",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem"
};

const submitButtonStyle = {
  width: "100%",
  height: "44px",
  marginTop: "1.5rem",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem"
};

/* ===== Messages ===== */

const successMessageStyle = {
  color: "green",
  textAlign: "center",
  marginBottom: "1rem",
  fontSize: "0.95rem",
  fontWeight: "500"
};

const errorStyle = {
  color: "red",
  fontSize: "0.9rem",
  textAlign: "center"
};