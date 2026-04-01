import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client"; 

export default function FactionList() {
  const [factions, setFactions] = useState([]);

  useEffect(() => {
    api.get("factions/") 
      .then(res => setFactions(res.data.results || []))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h3>Faction statistics</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {factions.map(f => (
          <li key={f.id} style={{ marginBottom: "8px" }}>
            <Link 
              to={`/factions/${f.id}`} className="link">
              <span>{f.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}