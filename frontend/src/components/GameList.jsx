import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Link } from "react-router-dom";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get("games/")
      .then(res => setGames(res.data.results || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Games</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {games.map(game => (
          <li key={game.id} style={{ margin: "0.5rem 0" }}>
            <Link to={`/games/${game.id}`} className = "link">
              <span>{game.player1_name} vs {game.player2_name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
