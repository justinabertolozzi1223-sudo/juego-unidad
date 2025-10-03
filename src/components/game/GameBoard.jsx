import React from 'react'

const COLS = 7
const ROWS = 5

function getSquareStyle(effect) {
  if (effect === 'WIN') return 'sq-win'
  if (effect === 'LOSE_TURN') return 'sq-pause'
  if (effect?.startsWith('ADVANCE')) return 'sq-advance'
  if (effect?.startsWith('BACK')) return 'sq-back'
  return 'sq-normal'
}

export default function GameBoard({ players, board, winner }) {
  const squares = []
  for (let i = 1; i <= 35; i++) squares.push(i)

  return (
    <div className="board">
      <div className="grid">
        {squares.map((n) => {
          const data = board[n]
          const here = players.filter(p => p.position === n)
          const cls = getSquareStyle(data?.effect)
          return (
            <div key={n} className={`cell ${cls}`}>
              <div className="cell-num">#{n}</div>
              {/* insignia de efecto */}
              {data?.effect && data.effect !== 'NONE' && data.effect !== 'WIN' && (
                <span className="badge">
                  {data.effect === 'LOSE_TURN' ? '⏸' :
                   data.effect.startsWith('ADVANCE') ? '↗' :
                   data.effect.startsWith('BACK') ? '↙' : ''}
                </span>
              )}
              {/* jugadores */}
              <div className="pills">
                {here.map((p, i) => (
                  <span key={i} className="pill" style={{ background: p.color }}>
                    {p.name}
                  </span>
                ))}
              </div>
              {/* meta */}
              {n === 35 && <div className="flag">🏁</div>}
            </div>
          )
        })}
      </div>
      {winner && (
        <div className="win-banner">🎉 {winner} ganó</div>
      )}
    </div>
  )
}