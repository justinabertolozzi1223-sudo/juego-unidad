import React from 'react'

export default function PlayerPanel({ players, turnIndex, lastRoll, current, winner }) {
  return (
    <aside className="panel">
      <section className="panel-box">
        <h3>Turno</h3>
        <div className="panel-line">
          {winner ? '—' : (players[turnIndex]?.name || '—')}
        </div>
      </section>

      <section className="panel-box">
        <h3>Jugadores</h3>
        <div className="plist">
          {players.map((p, i) => (
            <div key={i} className={`prow ${i === turnIndex ? 'active' : ''}`}>
              <span className="dot" style={{ background: p.color }} />
              <span className="pname">{p.name}</span>
              <span className="ppos">Casilla {p.position}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-box">
        <h3>Casilla actual</h3>
        {current ? (
          <div className="current">
            <div className="c-top">
              <b>{current.playerName}</b> cayó en <b>#{current.number}</b>
              {lastRoll != null && <span className="roll"> (Dado: {lastRoll})</span>}
            </div>
            <div className="c-intro">{current.intro}</div>
            <div className="c-action"><b>Acción:</b> {current.action}</div>
          </div>
        ) : (
          <div className="current muted">Aún no caíste en una casilla con efecto.</div>
        )}
      </section>
    </aside>
  )
}