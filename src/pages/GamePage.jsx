import GameBoard from '../components/game/GameBoard'
import PlayerPanel from '../components/game/PlayerPanel'
import DiceRoller from '../components/game/ui/DiceRoller'
import { useState } from 'react'

export default function GamePage({ players }) {
  const [positions, setPositions] = useState(players.map(() => 0))
  const [turn, setTurn] = useState(0)
  const [lastRoll, setLastRoll] = useState(null)
  const [message, setMessage] = useState("Aún no caíste en una casilla con efecto.")

  const squares = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    intro: `Introducción de la casilla ${i + 1}`,
    action: `Acción de la casilla ${i + 1}`
  }))

  const rollDice = () => {
    const roll = Math.ceil(Math.random() * 6)
    setLastRoll(roll)

    setPositions((prev) => {
      const newPos = [...prev]
      newPos[turn] = Math.min(newPos[turn] + roll, 35)
      const currentSquare = squares[newPos[turn] - 1]
      if (currentSquare) {
        setMessage(`📌 ${currentSquare.intro} \n 👉 ${currentSquare.action}`)
      }
      return newPos
    })

    setTurn((t) => (t + 1) % players.length)
  }

  return (
    <div className="gp-container">
      <div className="topbar">
        <h1><span className="emoji">🏢</span> La Ruta de la Unidad</h1>
      </div>

      <div className="gp-layout">
        <section className="board">
          <div className="board-grid">
            {squares.map((sq, i) => {
              const playerHere = positions.findIndex((p) => p === sq.id)
              return (
                <div
                  key={i}
                  className={`square ${i === 34 ? 'win' : ''}`}
                >
                  <span className="num">#{sq.id}</span>
                  {playerHere !== -1 && (
                    <span className="pill">
                      <span className="dot" style={{background: playerHere === 0 ? "red":"blue"}}></span>
                      {players[playerHere]}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <aside className="side">
          <div className="card"><h3>Turno</h3>{players[turn]}</div>
          <div className="card">
            <h3>Jugadores</h3>
            {players.map((p,i)=><div key={i}>{p} - Casilla {positions[i]}</div>)}
          </div>
          <div className="card"><h3>Casilla actual</h3>{message}</div>
        </aside>
      </div>

      <div className="dice-dock">
        <div className="dice-bar">
          <DiceRoller roll={lastRoll} onRoll={rollDice} />
          <button className="gp-btn" onClick={() => window.location.reload()}>Nuevo juego</button>
        </div>
      </div>
    </div>
  )
}