import { Outlet } from "react-router-dom";
import GameList from "./GameList";
import FactionList from "./FactionList";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div style={{ width: "250px", 
        borderRight: "5px solid transparent", 
        borderLeft: "5px solid transparent", 
        borderImage: "url('http://127.0.0.1:8000/media/mics/Advmap_l.webp') 8 stretch",
        backgroundImage: `url('http://127.0.0.1:8000/media/mics/Hd_fr_f.webp')`,
        backgroundRepeat: "repeat",
        padding: "1rem",
        borderImageRepeat: "repeat",
        overflowY: "auto",
        }}>


        <GameList /> 
      </div>

      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <Outlet />
      </div>

      <div style={{ width: "250px", 
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",  
        borderImage: "url('http://127.0.0.1:8000/media/mics/Advmap_l.webp') 8 stretch",
        backgroundImage: `url('http://127.0.0.1:8000/media/mics/Hd_fr_f.webp')`,
        backgroundRepeat: "repeat",        
        padding: "1rem",
        borderImageRepeat: "repeat",
        overflowY: "auto",
        }}>
        <FactionList />
      </div>
    </div>
  );
}