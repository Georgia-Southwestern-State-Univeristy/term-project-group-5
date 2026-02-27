import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttributesPage from "./pages/AttributesPage";
import DestinationResultsPage from "./pages/DestinationResultsPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<AttributesPage />} />
        <Route path="/attributes" element={<AttributesPage />} />
        <Route
          path="/results"
          element={<DestinationResultsPage />}
        />
      </Routes>
  );
}

export default App;