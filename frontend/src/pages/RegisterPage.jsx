import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    setError("Email is required.");
    return;
  }

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!password) {
    setError("Password is required.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

    try {
      setLoading(true); // Start loading

      const res = await fetch('${API_BASE}/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      // Safer fetch handling
      

      // Handle specific backend errors first
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Handle any other errors
      if (!res.ok) {
        throw new Error("Registration failed");
      }

      setLoading(false); // Stop loading

      // Redirect to login with success message
      navigate("/login", {
        state: { message: "Account created! Please sign in." }
      });

    } catch (err){
      setLoading(false); // Stop loading
      setError("Unable to create account. Please try again.");
      console.log(err)
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
            value={email}
            onChange={(e) => {setEmail(e.target.value);
              setError(null);
            }}
          />
        </div>

        {/* Password */}
        <div style={sectionStyle}>
          <label style={sectionLabelStyle}>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            style={inputStyle}
            value={password}
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
            value={confirmPassword}
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
        <button
          style={submitButtonStyle}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
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