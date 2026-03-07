import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AttributesPage from "./pages/AttributesPage";
import DestinationResultsPage from "./pages/DestinationResultsPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attributes" element={<AttributesPage />} />
        <Route
          path="/results"
          element={<DestinationResultsPage />}
        />
      </Routes>
  );
}

export default App;