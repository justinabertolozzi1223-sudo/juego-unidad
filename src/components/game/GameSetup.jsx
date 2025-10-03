import { useState } from 'react'

export default function GameSetup({ onGameStart }) {
  const [players, setPlayers] = useState(["Jugador 1", "Jugador 2"])

  const handleChange = (i, value) => {
    const copy = [...players]
    copy[i] = value
    setPlayers(copy)
  }

  const addPlayer = () => setPlayers([...players, `Jugador ${players.length+1}`])
  const removePlayer = (i) => setPlayers(players.filter((_, idx) => idx !== i))

  return (
    <div className="setup-root">
      <div className="setup-card">
        <h2>Configurar jugadores</h2>
        <div className="setup-list">
          {players.map((p,i)=>(
            <div key={i} className="setup-row">
              <span className="idx">{i+1}.</span>
              <input value={p} onChange={(e)=>handleChange(i,e.target.value)} className="setup-input"/>
              <button onClick={()=>removePlayer(i)} className="setup-del">X</button>
            </div>
          ))}
        </div>
        <div className="setup-actions">
          <button className="gp-btn" onClick={addPlayer}>+ Agregar jugador</button>
          <button className="gp-btn primary" onClick={()=>onGameStart(players)}>🚀 Comenzar juego</button>
        </div>
        <p className="setup-hint">*Se necesitan al menos 1 jugador.</p>
      </div>
    </div>
  )
}