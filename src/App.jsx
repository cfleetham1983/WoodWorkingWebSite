import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ShopPage from "./Pages/ShopPage";
import ProjectPage from "./Pages/ProjectPage";
import WoodShopPage from "./Pages/WoodShopPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shoppage" element={<ShopPage />} />
      <Route path="/projectpage" element={<ProjectPage />} />
      <Route path="/projects" element={<Navigate to="/shoppage" replace />} />
      <Route path="/contact" element={<Navigate to="/projectpage" replace />} />
      <Route path="/WoodShopPage" element={<WoodShopPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
