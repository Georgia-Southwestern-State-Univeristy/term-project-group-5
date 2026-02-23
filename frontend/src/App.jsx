import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttributesPage from "./pages/AttributesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/attributes" element={<AttributesPage />} />
    </Routes>
  );
}

export default App;
