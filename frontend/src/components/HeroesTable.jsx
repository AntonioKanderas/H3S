import { useEffect, useState } from "react"
import { api } from "../api/client"

export default function HeroesTable({ factionId, gameId }) {
  const [heroes, setHeroes] = useState([]);
  const [heroStats, setHeroStats] = useState({});
  const [game, setGame] = useState(null)
  

  useEffect(() => {
    api.get("heroes/")
      .then(res => setHeroes(res.data.results || []))
      .catch(err => console.error(err));
  }, []);

useEffect(() => {
  if (!gameId) return;

  api.get(`heroes/stats/${gameId}/`)
     .then(res => setHeroStats(res.data))
     .catch(err => console.error(err));

}, [gameId]);

    useEffect(() => {
    if (!gameId) return

    api.get(`games/${gameId}/`)
       .then(res => setGame(res.data))
       .catch(err => console.error(err))

  }, [gameId])
  
if (!game || Object.keys(heroStats).length === 0) {
  return <p>Loading...</p>
}
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
        

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "auto",
          borderCollapse: "collapse",
          marginRight: "5px"
          
        }}>
          <thead>
            <tr>
              <th style={{ ...cellStyle, width: "100px"}}></th> 
              <th style={{ ...cellStyle, width: "100px"}}>Hero</th>  
          
            {heroes
            .filter(h => h.faction === Number(factionId))
            .map(h => (
                <th key={h.id} style={{...cellStyle, width: "100px"}}>
                {h.portrait ? (
                  <img src={h.portrait} alt={h.name || "No hero"} style={{ height: "32px", width:"48px", marginTop: "2px" }}/>
                ) : null}<br/>
                    
                    {h.name}</th>
            ))}
          </tr>


          </thead>

            <tbody>
              <tr>
                <th style={{ ...cellPlayerStyle(1), height: "70px"}} rowSpan={2}>{game?.player1_name}</th>
                <th style={cellPlayerStyle(1)}>Count</th>
                {heroes
                  .filter(h => h.faction === Number(factionId))
                  .map(h => (
                    <td key={h.id} style={cellStyle}>
                      {heroStats[String(h.id)]?.p1_count ?? "-"}
                    </td>
                  ))}
              </tr>


              <tr>
                <th style={cellPlayerStyle(1)}>Winratio</th>

                {heroes
                  .filter(h => h.faction === Number(factionId))
                  .map(h => (      
                    <td key={h.id} style={{ ...cellStyle, color: getWinratioColor(heroStats[String(h.id)].p1_winratio)}}>
                     {typeof heroStats[String(h.id)]?.p1_winratio === "number"
                    ? `${heroStats[String(h.id)]?.p1_winratio.toFixed(2)} %`
                    : heroStats[String(h.id)]?.p1_winratio}
                  </td>
                  ))}
              </tr>

              <tr>
                <th style={{ ...cellPlayerStyle(2), height: "70px"}} rowSpan={2}>{game?.player2_name}</th>
                <th style={cellPlayerStyle(2)}>Count</th>
                {heroes
                  .filter(h => h.faction === Number(factionId))
                  .map(h => (
                    <td key={h.id} style={cellStyle}>
                      {heroStats[String(h.id)]?.p2_count ?? "-"}
                    </td>
                  ))}
              </tr>

              <tr>               
                <th style={cellPlayerStyle(2)}>Winratio</th>
                {heroes
                  .filter(h => h.faction === Number(factionId))
                  .map(h => (
                     <td key={h.id} style={{ ...cellStyle, color: getWinratioColor(heroStats[String(h.id)].p2_winratio)}}>
                     {typeof heroStats[String(h.id)]?.p2_winratio === "number"
                    ? `${heroStats[String(h.id)]?.p2_winratio.toFixed(2)} %`
                    : heroStats[String(h.id)]?.p2_winratio}
                  </td>
                  ))}
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  )          


  }




