import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import GamesPage from "./pages/GamesPage";
import FactionPage from "./pages/FactionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Select a game or faction</div>} />
          <Route path="games/:id" element={<GamesPage />} />
          <Route path="factions/:id" element={<FactionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;