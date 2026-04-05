import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
export default function FlightSearchCard({ onSubmit }) {
  const location = useLocation();
  const { user } = useAuth();

  const emptyForm = {
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("flightSearch");
    return saved ? JSON.parse(saved) : emptyForm;
  });

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("flightSearch");
      setFormData(emptyForm);
    }
  }, [location.pathname]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value
    };

    setFormData(updated);
    localStorage.setItem("flightSearch", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
    setModalMessage("Please sign in first.");
    setShowModal(true);
    return;
  }

    if (!formData.departure || !formData.destination) {
      setModalMessage("Departure and Destination are required.");
      setShowModal(true);
      return;
    }

    if (!formData.departureDate || !formData.returnDate) {
      setModalMessage("Departure and Return dates are required.");
      setShowModal(true);
      return;
    }

    if (
      formData.departureDate &&
      formData.returnDate &&
      formData.returnDate < formData.departureDate
    ) {
      setModalMessage("Return date must be after departure date.");
      setShowModal(true);
      return;
    }

    localStorage.setItem("flightSearch", JSON.stringify(formData));
    if (onSubmit) {
      onSubmit(formData);
    }
    const query = new URLSearchParams(formData).toString();
    navigate(`/results?search=flight&${query}`);
  };

  return (
    <>
    <div style={cardStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        
        {/* Row 1 */}
        <div style={rowStyleTwo}>
          <Field label="Departure">
            <input
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="City or airport"
              style={inputStyle}
            />
          </Field>

          <Field label="Destination">
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="City or airport"
              style={inputStyle}
            />
          </Field>
        </div>

        {/* Row 2 */}
        <div style={rowStyleFour}>
          <Field label="Departure Date">
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="Return Date">
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="Travelers">
            <input
                type="number"
                min="1"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                style={{ ...inputStyle, appearance: "textfield" }}
            />
          </Field>
        <div style={buttonWrapperStyle}>
  <button
    type="submit"
    style={{
      ...searchButtonStyle,
      backgroundColor: user ? "#1a73e8" : "#ccc",
      cursor: user ? "pointer" : "not-allowed"
    }}
    disabled={!user}
  >
    Search
  </button>

  {!user && (
    <span style={signinHintStyle}>
      Please sign in
    </span>
  )}
</div>
        </div>
      </form>
    </div>
    {showModal && (
  <div style={overlayStyle}>
    <div style={modalStyle}>
      <h3>Validation Error</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        {modalMessage}
      </p>
      <button
        onClick={() => setShowModal(false)}
        style={modalButtonStyle}
      >
        OK
      </button>
    </div>
  </div>
)}
    </>
  );
}

/* ===== Reusable Field Wrapper ===== */

function Field({ label, children }) {
  return (
    <div style={{ width: "100%" }}>
      <label style={labelStyle}>{label}
      {children}
      </label>
    </div>
  );
}

/* ===== Styles ===== */

const cardStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
};

const rowStyleTwo = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem"
};

const rowStyleFour = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1.2fr 0.8fr 1fr",
  gap: "1rem",
  alignItems: "end"
};

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  marginBottom: "0.4rem",
  color: "#444"
};

const inputStyle = {
  width: "100%",
  height: "42px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem",
  boxSizing: "border-box"
};

const searchButtonStyle = {
  height: "42px",
  width: "100%",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000
};

const modalStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "12px",
  width: "300px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
};

const modalButtonStyle = {
  marginTop: "1.5rem",
  padding: "0.6rem 1.5rem",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const buttonWrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: "42px"
};

const signinHintStyle = {
  fontSize: "0.8rem",
  color: "#888",
  whiteSpace: "nowrap"
};