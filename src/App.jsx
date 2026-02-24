import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CustomCursor from "./components/CustomCursorWeb";
// These pages will be created later
import Industrial from "./pages/Industrial";
// import Dentist from "./pages/Dentist"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/industrial" element={<Industrial />} />
        {/* <Route path="/dentist" element={<Dentist />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
