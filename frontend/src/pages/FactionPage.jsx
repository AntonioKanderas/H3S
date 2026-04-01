import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FactionTable from "../components/FactionTable";
import HeroesTable from "../components/HeroesTable";
import { api } from "../api/client";

export default function FactionPage() {
  const { id } = useParams();
  const [faction, setFaction] = useState(null);
  const [games, setGames] = useState([]);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`factions/${id}/`)
      .then(res => setFaction(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    api.get("games/")
      .then(res => setGames(res.data.results || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (games.length > 0 && !gameId) {
      setGameId(games[0].id);
    }
  }, [games]);

  if (!faction) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        
       
        <div style={{ flex: 0, width: "800px" }}>
          Select game <br/><br/>
          <select
            style={{ width: "60%", marginBottom: "1rem", marginLeft: "12px" }}
            value={gameId || ""}
            onChange={(e) => setGameId(Number(e.target.value))}
          >
            <option value="">Select game</option>
            {Array.isArray(games) && games.map(g => (
              <option key={g.id} value={g.id}>
                {g.player1_name} vs {g.player2_name}
              </option>
            ))}
          </select>

          
          <FactionTable factionId={id} gameId={gameId} />
        </div>

        <div style={{ flex: 2, paddingLeft: "1rem", }}>
          {faction.layout && (
            <img
              src={faction.layout}
              alt={`${faction.name} layout`}
              style={{
                width: "75%",
                marginTop: "162px",
                height: "auto",
                border: "1px solid #ccc",
                display: "block",
              }}
            />
          )}
        </div>
      </div>

  
      <div>
        <HeroesTable factionId={id} gameId={gameId} />
      </div>

    </div>
  );
}