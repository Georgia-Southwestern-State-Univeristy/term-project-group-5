import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch("/api/attributes")
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
        console.error(err);
        setError("Unable to load attributes.");
        setLoading(false);
      });
  }, []); 

 const handleSubmit = async () => {
    const attributeIds = Object.values(selected).filter(Boolean);;

    if (attributeIds.length === 0) {
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          attribute_ids: attributeIds
        })
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      // results
      navigate("/results", { state: { results: data.results } });

    } catch {
      setError("Unable to process search.");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

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
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>Search Preferences</h2>

      {Object.entries(groupedAttributes).map(([type, values]) => (
        <div key={type} style={{ marginTop: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold"
            }}
          >
            {type}
          </label>

          <select
            style={{ width: "100%", padding: "0.5rem" }}
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

      <button
        style={{
          marginTop: "2rem",
          padding: "0.75rem",
          width: "100%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>

    {showModal && (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <h3>Please Select Preferences</h3>
          <p>You must select at least one attribute before submitting.</p>
          <button
            onClick={() => setShowModal(false)}
            style={buttonStyle}
          >
            OK
          </button>
        </div>
      </div>
    )}
  </>
);

}