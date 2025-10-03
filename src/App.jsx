import React, { useState } from "react";

/* ==================== TABLERO ==================== */
const BOARD = [
  { intro: "Todo equipo comienza con entusiasmo, pero necesita dirección.", action: "El equipo grita su nombre o inventa uno en 5 segundos." },                         // 1
  { intro: "La unidad depende de que hablemos claro y nos entendamos.", action: "Todos dicen juntos una palabra positiva (ej.: confianza, respeto, alegría)." },    // 2
  { intro: "Cuando hay malos entendidos, el equipo se frena.", action: "Este equipo pierde un turno.", skip: true },                                               // 3  (pierde turno)
  { intro: "El agradecimiento enciende la energía del equipo.", action: "Cada persona agradece al de al lado con una palabra." },                                   // 4
  { intro: "Un buen clima acelera los logros.", action: "Avanzan dos casillas.", advance: 2 },                                                                     // 5  (+2)
  { intro: "Un equipo no solo habla, también escucha.", action: "Una persona dice una palabra motivadora, el resto la repite en eco." },                            // 6
  { intro: "Los rumores dañan la confianza.", action: "Retroceden una casilla.", back: 1 },                                                                        // 7  (-1)
  { intro: "La risa compartida une y relaja.", action: "Ríen forzadamente 10 segundos (termina en carcajadas reales)." },                                          // 8
  { intro: "Moverse juntos genera confianza.", action: "Aplauden todos al mismo tiempo a la cuenta de 3." },                                                        // 9
  { intro: "Si no confiamos, el equipo se quiebra.", action: "Todos gritan juntos: “¡Sí se puede!”." },                                                             // 10
  { intro: "Un mal clima tira abajo la motivación.", action: "Retroceden 2 casillas.", back: 2 },                                                                   // 11 (-2)
  { intro: "No hay nada más poderoso que celebrar juntos.", action: "Gritan una palabra de festejo en equipo: “¡Logrado!”, “¡Victoria!”, etc." },                   // 12
  { intro: "Las distracciones quitan energía.", action: "El equipo pierde un turno.", skip: true },                                                                 // 13 (pierde turno)
  { intro: "La creatividad compartida nos une y nos impulsa.", action: "Inventan un lema en 15 segundos y lo dicen todos juntos." },                                // 14
  { intro: "Dar feedback mejora la unidad.", action: "Cada uno dice al de al lado: “Me gusta de vos…” + algo positivo." },                                          // 15
  { intro: "Los pequeños logros fortalecen el clima.", action: "Avanzan una casilla.", advance: 1 },                                                                // 16 (+1)
  { intro: "Un clima positivo se contagia.", action: "Todos levantan las manos y gritan: “¡Vamos equipo!”." },                                                      // 17
  { intro: "Cuando no hay unidad, aparecen obstáculos.", action: "Retroceden 3 casillas.", back: 3 },                                                               // 18 (-3)
  { intro: "Un buen clima ayuda a levantarse después de una caída.", action: "Todos juntos dicen: “¡Podemos con todo!”." },                                         // 19
  { intro: "La empatía es la llave para un buen clima: ponernos en el lugar del otro fortalece la unidad.", action: "Cada persona le dice a quien tenga más cerca: “Te escucho”, mirándolo a los ojos." }, // 20
  { intro: "Cuando la motivación está alta, el equipo avanza con más fuerza.", action: "Avanzan 2 casillas.", advance: 2 },                                         // 21 (+2)
  { intro: "Si no todos reman en la misma dirección, el equipo se frena.", action: "Pierden un turno.", skip: true },                                               // 22 (pierde turno)
  { intro: "Cuando alguien se cae, el equipo lo levanta.", action: "Todos chocan la mano con alguien distinto a su lado." },                                        // 23
  { intro: "Si las distracciones invaden, la unidad se resquebraja.", action: "Retroceden 1 casilla.", back: 1 },                                                   // 24 (-1)
  { intro: "Un buen clima se construye celebrando cada avance.", action: "Todos dicen al unísono: “¡Bien ahí, equipo!”." },                                         // 25
  { intro: "Si no aceptamos cambios, nos quedamos atrás.", action: "Retroceden 2 casillas.", back: 2 },                                                             // 26 (-2)
  { intro: "Un equipo con energía positiva contagia entusiasmo.", action: "Todos se ponen de pie 5 segundos y hacen un gesto de victoria." },                       // 27
  { intro: "Si los conflictos no se abordan, se convierten en barreras.", action: "Pierden un turno.", skip: true },                                                // 28 (pierde turno)
  { intro: "Cooperar significa sumar talentos distintos para el mismo fin.", action: "Dos personas del equipo inventan juntas un gesto y el resto lo repite." },     // 29
  { intro: "El mal clima agota y nos hace retroceder.", action: "Retroceden 3 casillas.", back: 3 },                                                                // 30 (-3)
  { intro: "Cuando recuperamos la confianza, el equipo resurge.", action: "Avanzan 2 casillas.", advance: 2 },                                                      // 31 (+2)
  { intro: "Reír en los momentos difíciles une más que cualquier discurso.", action: "Todos cuentan hasta 3 y hacen su mejor carcajada." },                         // 32
  { intro: "Un líder que inspira enciende el clima de todo el equipo.", action: "Cada uno dice una palabra que lo inspire en voz alta." },                           // 33
  { intro: "Cuando estamos cerca de la meta, la unión es la clave.", action: "Todos gritan: “¡Juntos hasta el final!”." },                                          // 34
  { intro: "Hoy aprendimos que no se trata de correr solos, sino de llegar todos juntos.", action: "¡Toda la sala de pie, aplauso fuerte y grito final: “¡Unidos lo logramos!”!", win: true }, // 35
];

/* ===== helpers visuales ===== */
function classForSquare(sq) {
  if (sq?.win) return "win";
  if (sq?.advance) return "ok";
  if (sq?.back) return "bad";
  if (sq?.skip) return "skip";
  return "";
}
function chipLabel(sq) {
  if (sq?.advance) return `+${sq.advance}`;
  if (sq?.back) return `-${sq.back}`;
  if (sq?.skip) return "⏸";
  if (sq?.win) return "🏁";
  return "";
}

/* ====== colores cíclicos para jugadores ====== */
const COLORS = ["red", "blue", "green", "purple", "amber"];

/* ==================== APP ==================== */
export default function App() {
  const [stage, setStage] = useState("setup"); // "setup" | "game"

  // estado persistente entre vistas
  const [players, setPlayers] = useState([
    { id: 1, name: "Jugador 1", color: "red", pos: 0, skip: false },
    { id: 2, name: "Jugador 2", color: "blue", pos: 0, skip: false },
  ]);

  if (stage === "setup") {
    return (
      <SetupScreen
        initialPlayers={players}
        onStart={(list) => {
          const ready = list
            .filter((p) => p.name.trim() !== "")
            .map((p, i) => ({
              id: i + 1,
              name: p.name.trim(),
              color: COLORS[i % COLORS.length],
              pos: 0,
              skip: false,
            }));
          if (ready.length === 0) return;
          setPlayers(ready);
          setStage("game");
        }}
      />
    );
  }

  return <GameScreen playersInitial={players} onBackToSetup={() => setStage("setup")} />;
}

/* ==================== SETUP SCREEN ==================== */
function SetupScreen({ initialPlayers, onStart }) {
  const [list, setList] = useState(
    initialPlayers.map((p, i) => ({ id: i + 1, name: p.name }))
  );

  function addPlayer() {
    setList((prev) => [...prev, { id: prev.length + 1, name: `Jugador ${prev.length + 1}` }]);
  }
  function removePlayer(idx) {
    setList((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="page">
      <div className="topbar">
        <h1>
          <span className="emoji">🏢</span> La Ruta de la Unidad
        </h1>
      </div>

      <div className="gp-container" style={{ maxWidth: 1000 }}>
        <div className="gp-layout" style={{ gridTemplateColumns: "1fr 0.9fr" }}>
          {/* ---- Columna izquierda: configuración ---- */}
          <div className="card" style={{ padding: 24 }}>
            <h3>Configurar jugadores</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {list.map((p, idx) => (
                <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ width: 24, opacity: 0.6 }}>{idx + 1}.</span>
                  <input
                    className="gp-input"
                    value={p.name}
                    onChange={(e) => {
                      const v = e.target.value;
                      setList((prev) => {
                        const n = [...prev];
                        n[idx] = { ...n[idx], name: v };
                        return n;
                      });
                    }}
                    placeholder={`Jugador ${idx + 1}`}
                  />
                  {list.length > 1 && (
                    <button className="gp-btn" onClick={() => removePlayer(idx)}>
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button className="gp-btn" onClick={addPlayer}>
                + Agregar jugador
              </button>
              <button
                className="gp-btn primary"
                onClick={() => onStart(list)}
                title="Se necesita al menos 1 jugador"
              >
                🚀 Comenzar juego
              </button>
            </div>

            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
              * Se necesita al menos 1 jugador.
            </div>
          </div>

          {/* ---- Columna derecha: reglas ---- */}
          <div className="card" style={{ padding: 24 }}>
            <h3>📋 Reglas del Juego</h3>
            <ul style={{ marginTop: 10, lineHeight: 1.5 }}>
              <li> Cada jugador tira el dado y avanza casillas</li>
              <li> Al caer en una casilla, realice la actividad indicada</li>
              <li> Algunas casillas te harán avanzar, retroceder o perder turno</li>
              <li> El primer jugador en llegar a la casilla 35 gana</li>
              <li> ¡Diviértanse fortaleciendo el equipo!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== GAME SCREEN ==================== */
function GameScreen({ playersInitial, onBackToSetup }) {
  const [players, setPlayers] = useState(playersInitial);
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState(null);
  const [winner, setWinner] = useState(null);

  // casilla donde cayó el que tiró (para "Casilla actual")
  const [lastSquareInfo, setLastSquareInfo] = useState(null);

  const current = players[turn];

  function newGame() {
    setPlayers((ps) => ps.map((p) => ({ ...p, pos: 0, skip: false })));
    setTurn(0);
    setDice(null);
    setWinner(null);
    setLastSquareInfo(null);
  }

  function applySquareEffect(square, playerIndex) {
    setPlayers((prev) => {
      const n = [...prev];
      const p = { ...n[playerIndex] };

      if (square.advance) p.pos = Math.min(35, p.pos + square.advance);
      if (square.back) p.pos = Math.max(0, p.pos - square.back);
      if (square.skip) p.skip = true;
      if (square.win) p.pos = 35;

      n[playerIndex] = p;
      return n;
    });

    if (square.win) setWinner(players[playerIndex]);
  }

  function nextTurn() {
    setTurn((t) => (t + 1) % players.length);
  }

  function roll() {
    if (winner) return;

    // pierde turno
    if (current.skip) {
      setPlayers((prev) => {
        const n = [...prev];
        n[turn] = { ...n[turn], skip: false };
        return n;
      });
      setDice(null);
      setLastSquareInfo(null);
      nextTurn();
      return;
    }

    const d = Math.floor(Math.random() * 6) + 1;
    setDice(d);

    let newPos = Math.min(35, (current.pos ?? 0) + d);

    setPlayers((prev) => {
      const n = [...prev];
      n[turn] = { ...n[turn], pos: newPos };
      return n;
    });

    const square = BOARD[newPos - 1];
    setLastSquareInfo(square ?? null);

    setTimeout(() => {
      if (square) applySquareEffect(square, turn);
      setTimeout(() => {
        if (!square?.win) nextTurn();
      }, 80);
    }, 80);
  }

  function renderPills(idx) {
    const num = idx + 1;
    const here = players.filter((p) => p.pos === num);
    return (
      <div className="pills">
        {here.map((p) => (
          <span key={p.id} className="pill">
            <span className={`dot ${p.color}`} />
            {p.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="topbar">
        <h1>
          <span className="emoji">🏢</span> La Ruta de la Unidad
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="gp-btn" onClick={onBackToSetup}>
            Configurar jugadores
          </button>
          <button className="gp-btn" onClick={newGame}>
            Nuevo juego
          </button>
        </div>
      </div>

      <div className="gp-container">
        <div className="gp-layout">
          <section className="board">
            <div className="board-grid">
              {BOARD.map((sq, i) => (
                <div key={i} className={`square ${classForSquare(sq)}`}>
                  <span className="num">#{i + 1}</span>
                  {renderPills(i)}
                  {chipLabel(sq) && <span className="chip">{chipLabel(sq)}</span>}
                </div>
              ))}
            </div>
          </section>

          <aside className="side">
            <div className="card">
              <h3>Turno</h3>
              <div>{winner ? "—" : current?.name}</div>
            </div>

            <div className="card">
              <h3>Jugadores</h3>
              <div className="list">
                {players.map((p) => (
                  <div className="row" key={p.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className={`dot ${p.color}`} />
                      {p.name}
                    </div>
                    <div style={{ opacity: 0.7 }}>
                      Casilla {p.pos ?? 0}
                      {p.skip ? " · (pierde 1 turno)" : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3>Casilla actual</h3>
              {!lastSquareInfo ? (
                <div style={{ opacity: 0.7 }}>Tirar el dado para comenzar…</div>
              ) : (
                <>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{lastSquareInfo.intro}</div>
                  <div style={{ opacity: 0.85 }}>{lastSquareInfo.action}</div>
                </>
              )}
            </div>
          </aside>
        </div>

        <div className="dice-dock">
          <div className="dice-bar">
            <div className="dice">{dice ?? "•"}</div>
            {winner ? (
              <span style={{ fontWeight: 700, color: "#059669" }}>
                ¡{winner.name} ganó! 🎉
              </span>
            ) : (
              <button className="gp-btn primary" onClick={roll}>
                Tirar dado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}