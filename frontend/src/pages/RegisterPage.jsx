import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5001/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("User already exists");
      }

      // Redirect to login with success message
      navigate("/login", {
        state: { message: "Account created! Please sign in." }
      });

    } catch {
      setError("Unable to create account. Try a different email.");
    }
  };

  return (
    <div style={pageWrapperStyle}>

      <div style={cardStyle}>
        <h2 style={titleStyle}>Create Account</h2>

        <p style={subtitleStyle}>
          Join now to unlock personalized features for the best
          <br />
          travel planning experience
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
            placeholder="Create a password"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div style={sectionStyle}>
          <label style={sectionLabelStyle}>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            style={inputStyle}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button style={submitButtonStyle} onClick={handleRegister}>
          Create Account
        </button>

        {/* Back to Login */}
        <button
          style={createAccountButtonStyle}
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign In
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
  overflow: "hidden"
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