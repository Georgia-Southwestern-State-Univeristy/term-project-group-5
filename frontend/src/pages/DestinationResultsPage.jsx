import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function DestinationResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || [];
  //const [searchParams] = useSearchParams();
  //const queryObject = Object.fromEntries(searchParams.entries());
  /*const attributeMap = {
    Budget: {
        "1": "Low",
        "2": "Medium",
        "3": "High"
    },
    Vibe: {
        "4": "Relaxing",
        "5": "Adventure"
    },
    Season: {
        "6": "Summer",
        "7": "Winter"
    }
};
  const readableFilters = Object.entries(queryObject).map(
  ([key, value]) => ({
    key,
    label: attributeMap[key]?.[value] || value
  })
);*/
  /* Mock
  const mockResults = [
  {
    id: "1",
    name: "Hawaii",
    description: "Warm beaches and relaxing atmosphere.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    attributes: { Budget: "2", Vibe: "4", Season: "6" }
  },
  {
    id: "2",
    name: "Switzerland",
    description: "Mountain adventure and fresh air.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    attributes: { Budget: "3", Vibe: "5", Season: "7" }
  },
  {
    id: "3",
    name: "Japan",
    description: "Cultural exploration and amazing food.",
    image: "https://images.unsplash.com/photo-1505060894824-8443e82d2e1c",
    attributes: { Budget: "2", Vibe: "5", Season: "6" }
  },
  {
    id: "4",
    name: "Bali",
    description: "Tropical paradise with peaceful vibes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    attributes: { Budget: "1", Vibe: "4", Season: "6" }
  }
];


  const filteredResults = mockResults.filter((dest) => {
    return Object.entries(queryObject).every(([key, value]) => {
      return dest.attributes[key] === value;
    });
  });
*/
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
        marginBottom: "1.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#eee",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
        }}
        >
        ← Back
        </button>
      <h2 style={{ marginBottom: "1rem" }}>Destination Suggestions</h2>

     {results.length === 0 && (
        <p style={{ color: "gray" }}>No destinations found.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {results.map((dest) => (
          <div
            key={dest.id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <img
              src={dest.image_url}
              alt={dest.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "1rem", flex: 1 }}>
              <h3>{dest.name}</h3>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                {dest.description}
              </p>
            </div>

            <button
              style={{
                margin: "1rem",
                padding: "0.5rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
              onClick={() => alert(`Viewing details for ${dest.name}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}