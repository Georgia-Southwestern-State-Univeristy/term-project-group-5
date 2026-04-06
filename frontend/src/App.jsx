import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AttributesPage from "./pages/AttributesPage";
import DestinationResultsPage from "./pages/DestinationResultsPage";
import FlightResultsPage from "./pages/FlightResultsPage";
import { AuthProvider } from "./context/authContext.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
