import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import DocumentationPage from "../pages/DocumentationPage";
import About from "../pages/About";

export const Routers = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/docs" element={<DocumentationPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
