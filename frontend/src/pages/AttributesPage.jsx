import { useEffect, useState } from "react";

export default function AttributesPage() {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Dynamically group attributes by "type"
  const groupedAttributes = attributes.reduce((acc, attr) => {
    if (!acc[attr.type]) {
      acc[attr.type] = [];
    }
    acc[attr.type].push(attr);
    return acc;
  }, {});

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading attributes...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  }

  return (
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

          <select style={{ width: "100%", padding: "0.5rem" }}>
            <option value="">Select {type}</option>
            {values.map((attr) => (
              <option key={attr.id} value={attr.id}>
                {attr.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}