import { useEffect, useState } from "react"
import { api } from "../api/client"
import { Link } from "react-router-dom";

export default function RoundTable({ gameId }) {
  const [rounds, setRounds] = useState([])
  const [showDescriptions, setShowDescriptions] = useState(true)

  useEffect(() => {
    if (!gameId) return
    api.get(`games/${gameId}/rounds/`)
       .then(res => setRounds(res.data))
       .catch(err => console.error(err))
  }, [gameId])


  const cellStyle = {
        border: "1px solid #ccc",
        textAlign: "center",
        backgroundImage: `url('http://127.0.0.1:8000/media/mics/Advmap_fill.webp')`,
        backgroundSize: "auto", 
        backgroundRepeat: "repeat",
        color: "white",
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
                


  if (!gameId) return <p>Select a game to see rounds</p>

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1rem" }}>
  <h3>Rounds</h3>
  <div style={{ overflowX: "auto" }}>

    <label style={{ marginBottom: "10px" }}>
      <input
        type="checkbox"
        checked={showDescriptions}
        onChange={() => setShowDescriptions(prev => !prev)}
      />
      Show descriptions
    </label>

    <table style={{
      width: "calc(100% - 5px)", 
      borderCollapse: "collapse",
      marginRight: "5px",
      
    }}>
      <thead>
          <tr>
            <th colSpan="1" rowSpan="2" style={{ ...cellStyle, width: "50px" , color: "gold"}}>#</th>
            <th colSpan="2" style={{ ...cellPlayerStyle(1), color: "gold"}}>{rounds[0]?.p1_name}</th>
            <th colSpan="1" rowSpan="2" style={{ ...cellStyle, color: "gold", width: "100px"}}>Winner</th>
            <th colSpan="2" style={{ ...cellPlayerStyle(2), color: "gold"}}>{rounds[0]?.p2_name}</th>
            <th colSpan="3" style={{ ...cellStyle, color: "gold"}}>Map settings</th>
            <th colSpan="2" style={{ ...cellStyle, color: "gold"}}>Date</th>
            {showDescriptions && (
            <th colSpan="1" rowSpan="2" style={{ ...cellStyle, color: "gold"}}>
              Description
            </th>
          )}
            
          </tr>
          <tr>
            
            <th style={{ ...cellPlayerStyle(1), color: "gold", width: "120px"}}>Faction</th>
            <th style={{ ...cellPlayerStyle(1), color: "gold", width: "120px"}}>Hero</th>
            <th style={{ ...cellPlayerStyle(2), color: "gold", width: "120px"}}>Hero</th>
            <th style={{ ...cellPlayerStyle(2), color: "gold", width: "120px"}}>Faction</th>
            <th style={{ ...cellStyle, color: "gold", width: "70px"}}>Size</th>
            <th style={{ ...cellStyle, color: "gold", width: "140px"}}>Underground</th>
            <th style={{ ...cellStyle, color: "gold", width: "80px"}}>Water</th>
            <th style={{ ...cellStyle, color: "gold", width: "120px"}}>Start</th>
            <th style={{ ...cellStyle, color: "gold", width: "120px"}}>End</th>
          </tr>
        </thead>



        <tbody>
          {rounds.map(r => (
            <tr style={{ height: "50px"}} key={r.id}>
              <td style={cellStyle}>{r.round_number}</td>

              <td style={cellStyle}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>

                  <Link to={`/factions/${r.p1_faction}`} className="link" >
                    {r.p1_faction_thumbnail && (
                   <img src={r.p1_faction_thumbnail} alt={r.p1_faction_name} style={{ height: "32px", width:"48px", marginTop: "2px" }}/>
                   )}<br/>
                     <span>{r.p1_faction_name}</span>
                  </Link>
                </div>
              </td>

              <td style={cellStyle}>
                {r.p1_hero_thumbnail ? (
                  <img src={r.p1_hero_thumbnail} alt={r.p1_hero_name || "No hero"} style={{ height: "32px", width:"48px", marginTop: "2px" }}/>
                ) : null}<br/>
                {r.p1_hero_name || "—"}
              </td>

            <td style={cellPlayerStyle(r.winner_number)}>{r.winner_name}</td>

              <td style={cellStyle}>
                {r.p2_hero_thumbnail ? (
                  <img src={r.p2_hero_thumbnail} alt={r.p2_hero_name || "No hero"} style={{ height: "32px", width:"48px", marginTop: "2px" }}/>
                ) : null}<br/>
                {r.p2_hero_name || "—"}
              </td>

              <td style={cellStyle}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>

                  <Link to={`/factions/${r.p2_faction}`} className="link" >
                    {r.p2_faction_thumbnail && (
                    <img src={r.p2_faction_thumbnail} alt={r.p2_faction_name} style={{ height: "32px", width:"48px", marginTop: "2px" }}/>
                    )}<br/>
                    <span>{r.p2_faction_name}</span>
                  </Link>
                 </div>
              </td>

              
              <td style={cellStyle}>
                 {r.map_size_thumbnail && (
                 <img src={r.map_size_thumbnail} alt={r.map_size_name} 
                 style={{ 
                  height: "40px", 
                  width:"50px", 
                  objectFit: "cover", 
                  marginTop: "2px",
                  display: "block", 
                  objectPosition: "left top",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}/>
                 )}


              </td>

              <td style={cellStyle}>
                <img
                  src={r.underground 
                        ? "http://127.0.0.1:8000/media/adventure/Avtcave.webp" 
                        : "http://127.0.0.1:8000/media/adventure/Avtcvrui.webp"}
                  alt="Underground"
                  style={{
                    height: "46px",
                    width: "52px",
                    objectFit: "cover",
                    objectPosition: "left top",
                    marginTop: "2px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                {r.underground ? "Yes" : "No"}
              </td>

              <td style={cellStyle}>{r.water}</td>
              <td style={cellStyle}>{r.start_date}</td>     
              <td style={cellStyle}>{r.end_date}</td>
              {showDescriptions && (
                <td style={cellStyle}>{r.description}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}
