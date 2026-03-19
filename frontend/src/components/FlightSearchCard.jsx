import { useState } from "react";


export default function FlightSearchCard({ onSubmit }) {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.departure || !formData.destination) {
    setModalMessage("Departure and Destination are required.");
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
    onSubmit(formData);
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

          <button type="submit" style={searchButtonStyle}>
            Search
          </button>
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