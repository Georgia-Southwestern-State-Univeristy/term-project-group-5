import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AttributesPage from "./pages/AttributesPage";
import DestinationResultsPage from "./pages/DestinationResultsPage";
import FlightResultsPage from "./pages/FlightResultsPage";
import { AuthProvider } from "./context/authContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attributes" element={<AttributesPage />} />
        <Route
          path="/results"
          element={<DestinationResultsPage />}
        />
        <Route path="/flights" element={<FlightResultsPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
