import { useEffect, useState } from "react"
import { api } from "../api/client"
import { Link } from "react-router-dom";

export default function FactionTable({ factionId, gameId }) {
  
  const [games, setGames] = useState([])
  const [game, setGame] = useState(null)
  const [faction, setFaction] = useState(null);
  const [factions, setFactions] = useState([]); 
  const [stats, setStats] = useState([]); 

  useEffect(() => {
    api.get("games/")
       .then(res => setGames(res.data.results))
       .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (games.length > 0 && !gameId) {
      setGame(games[0].id)
    }
  }, [games])

  useEffect(() => {
    if (!gameId) return

    api.get(`games/${gameId}/`)
       .then(res => setGame(res.data))
       .catch(err => console.error(err))

  }, [gameId])

  useEffect(() => {
    api.get("factions/")
      .then(res => setFactions(res.data.results || []))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    if (!factionId) return;

    api.get(`factions/${factionId}/`)
      .then(res => setFaction(res.data)) 
      .catch(err => console.error(err));
  }, [factionId]);

  useEffect(() => {
    if (!gameId) return;

    api.get(`factions/${factionId}/stats/${gameId}`)
      .then(res => setStats(res.data)) 
      .catch(err => console.error(err));
  }, [factionId, gameId]);




    if (!faction || (gameId && !game)) return <p>Loading...</p>


      const cellStyle = {
            border: "1px solid #ccc",
            textAlign: "center",
            backgroundImage: `url('http://127.0.0.1:8000/media/mics/Advmap_fill.webp')`,
            backgroundSize: "auto", 
            backgroundRepeat: "repeat",
            color: "white",
            };

      const getWinratioColor = (value) => {
        const num = parseFloat(value);

        if (isNaN(num)) return "gray";
        if (num > 50) return "limegreen";
        if (num < 50) return "red";
        if (num === 50) return "white";

        return "gray";
      };

      const cellPlayerStyle = (winner) => {
        const bg = winner === 1
          ? `url('http://127.0.0.1:8000/media/mics/Advmap_fill_red.webp')`
          : winner === 2
            ? `url('http://127.0.0.1:8000/media/mics/Advmap_fill_blue.webp')`
            : `none`;
        return {
          border: "1px solid #ccc",
          textAlign: "center",
          backgroundImage: bg,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          color: "white",
        }
      }

  return (

    
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1rem" }}>
      <h3>{faction?.name}</h3>
        

        <br/>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "600px",
          borderCollapse: "collapse",
          marginRight: "5px"
        }}>
          <thead>
          <tr>
            <th colSpan="1" rowSpan="2" style={{ ...cellStyle, color: "gold", width:"200px"}}>VS Faction</th>
            <th colSpan="2" style={{ ...cellPlayerStyle(1), color: "gold"}}>{game?.player1_name}</th>
            <th colSpan="2" style={{ ...cellPlayerStyle(2), color: "gold"}}>{game?.player2_name}</th>
          
            
          </tr>
          <tr>
            
            <th colSpan="1" style={{ ...cellPlayerStyle(1), color: "gold", width: "100px"}}>Count</th>
            <th colSpan="1" style={{ ...cellPlayerStyle(1), color: "gold", width: "100px"}}>Winratio</th>
            <th colSpan="1" style={{ ...cellPlayerStyle(2), color: "gold", width: "100px"}}>Count</th>
            <th colSpan="1" style={{ ...cellPlayerStyle(2), color: "gold", width: "100px"}}>Winratio</th>            
          
            
          </tr>
          </thead>

          <tbody>
            {factions.map(f => (
            <tr style={{ height: "50px"}} key={f.id}>
              
              <td style={cellStyle}>
                 <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>

                  <Link to={`/factions/${f.id}`} className="link" >

                        {f.portrait && (
                        <img src={f.portrait} alt={f.name} style={{ height: "32px", width:"48px", marginTop: "2px" }}/>
                        )}<br/>
                        <span>{f.name}</span>

                   </Link>
                 </div>
              </td>

              <td style={cellStyle}>{stats[f.id]?.p1_count}</td>

              <td style={{ ...cellStyle, color: getWinratioColor(stats[f.id]?.p1_winratio)}}>
              {typeof stats[f.id]?.p1_winratio === "number"
                ? `${stats[f.id].p1_winratio.toFixed(2)} %`
                : stats[f.id]?.p1_winratio}
              </td>

              <td style={cellStyle}>{stats[f.id]?.p2_count}</td>

              <td style={{ ...cellStyle, color: getWinratioColor(stats[f.id]?.p2_winratio)}}>
              {typeof stats[f.id]?.p2_winratio === "number"
                ? `${stats[f.id].p2_winratio.toFixed(2)} %`
                : stats[f.id]?.p2_winratio}
              </td>
            
            </tr>
          ))}

          <tr style={{ height: "50px"}}>
            <th colSpan="1" style={{ ...cellStyle, color: "gold"}}>TOTAL</th>

            <th colSpan="1" style={{ ...cellStyle, color: "gold"}}>{stats["TOTAL"]?.p1_count}</th>
            
            <th colSpan="1" style={{ ...cellStyle, color: getWinratioColor(stats["TOTAL"]?.p1_winratio) }}>
              {typeof stats["TOTAL"]?.p1_winratio === "number"
                ? `${stats["TOTAL"].p1_winratio.toFixed(2)} %`
                : stats["TOTAL"]?.p1_winratio}
            </th>

            <th colSpan="1" style={{ ...cellStyle, color: "gold"}}>{stats["TOTAL"]?.p2_count}</th>

            <th colSpan="1" style={{ ...cellStyle, color: getWinratioColor(stats["TOTAL"]?.p2_winratio) }}>
              {typeof stats["TOTAL"]?.p2_winratio === "number"
                ? `${stats["TOTAL"].p2_winratio.toFixed(2)} %`
                : stats["TOTAL"]?.p2_winratio}
            </th>          
          
            
          </tr>



          </tbody>
        </table>
      </div>
    </div>
  )
}