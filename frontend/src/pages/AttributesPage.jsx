import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AttributesPage() {
 /* const mockAttributes = [
  { id: "1", type: "Budget", label: "Low" },
  { id: "2", type: "Budget", label: "Medium" },
  { id: "3", type: "Budget", label: "High" },
  { id: "4", type: "Vibe", label: "Relaxing" },
  { id: "5", type: "Vibe", label: "Adventure" },
  { id: "6", type: "Season", label: "Summer" },
  { id: "7", type: "Season", label: "Winter" }
];*/

  //const [attributes] = useState(mockAttributes);
  //const [loading] = useState(false);
  //const [error] = useState(null);
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    fetch(`${API_BASE}/api/attributes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch attributes");
        }
        return res.json();
      })
      .then((data) => {
        setAttributes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH_ATTRIBUTES_ERROR:", err);
        setError("Unable to load preferences. Please try again.");
        setLoading(false);
      });
  }, []); 

 const handleSubmit = async () => {
    const attributeIds = Object.values(selected).filter(Boolean);;

    if (attributeIds.length === 0) {
      setShowModal(true);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          attribute_ids: attributeIds
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Please log in to search.");
        } else if (response.status === 400) {
          setError("Invalid search request. Please check your selection.");
        } else {
          setError("Server error. Please try again later.");
        }
        return;
      }

      const data = await response.json();

      // results
      navigate(`/results?search=destination`, {
      state: { results: data.results }
      });

    } catch (err) {
      console.error("SEARCH_ERROR:", err);
      setError("Unable to process search. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;


  if (error && attributes.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }
  // Dynamically group attributes by "type"
  const groupedAttributes = attributes.reduce((acc, attr) => {
    if (!acc[attr.type]) {
      acc[attr.type] = [];
    }
    acc[attr.type].push(attr);
    return acc;
  }, {});


return (
  <>
    <div style={pageWrapperStyle}>
        <button
          onClick={() => navigate(-1)}
          style={floatingBackButtonStyle}
        >
          ←
        </button>
        
      <div style={cardStyle}>
        <h2 style={titleStyle}>Search Preferences</h2>

        {attributes.length === 0 && (
            <p style={{ textAlign: "center", color: "#666" }}>
              No preferences available at the moment.
            </p>
          )}

        {Object.entries(groupedAttributes).map(([type, values]) => (
          <div key={type} style={sectionStyle}>
            <label style={sectionLabelStyle}>{type}</label>

            <select
              style={selectStyle}
              value={selected[type] || ""}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  [type]: e.target.value
                })
              }
            >
              <option value="">Select {type}</option>
              {values.map((attr) => (
                <option key={attr._id} value={attr._id}>
                  {attr.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {error && (
            <p style={{ color: "red", marginTop: "1rem" }}>
              {error}
            </p>
          )}

        <button
            style={submitButtonStyle}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Searching..." : "Find My Destination"}
          </button>

      </div>
    </div>

    {showModal && (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <h3 style={{ marginBottom: "0.5rem" }}>
            Please Select Preferences
          </h3>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            You must select at least one attribute before submitting.
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
/* ===== Page Layout ===== */

const pageWrapperStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "4rem",
  backgroundColor: "#f8f9fa"
};

const cardStyle = {
  backgroundColor: "white",
  padding: "2.5rem",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "600px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "2rem"
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

const selectStyle = {
  width: "100%",
  height: "42px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem",
  backgroundColor: "white",
  cursor: "pointer"
};

/* ===== Submit Button ===== */

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

/* ===== Modal Upgrade ===== */

const modalButtonStyle = {
  marginTop: "1.5rem",
  padding: "0.6rem 1.5rem",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const floatingBackButtonStyle = {
  position: "fixed",
  top: "24px",
  left: "24px",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  cursor: "pointer",
  fontSize: "1.2rem",
  fontWeight: "600",
  zIndex: 1000,
  transition: "all 0.2s ease"
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
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "12px",
  width: "300px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};