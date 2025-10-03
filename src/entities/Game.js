export const Game = {
  create: async (data) => {
    const game = {
      id: Date.now(),
      name: data.name || "Juego de Unidad",
      players: data.players.map((p, i) => ({
        name: p.name || `Jugador ${i + 1}`,
        color: p.color || ["#EF4444","#3B82F6","#10B981","#F59E0B"][i % 4],
        position: 0,
      })),
      current_player_index: 0,
      last_dice_roll: null,
      status: "playing",
      current_action: null,
      winner: null,
    };
    localStorage.setItem("currentGame", JSON.stringify(game));
    return game;
  },
  get: async () => JSON.parse(localStorage.getItem("currentGame") || "null"),
  update: async (id, updates) => {
    const cur = JSON.parse(localStorage.getItem("currentGame"));
    if (!cur || cur.id !== id) return null;
    const next = { ...cur, ...updates };
    localStorage.setItem("currentGame", JSON.stringify(next));
    return next;
  },
  delete: async () => localStorage.removeItem("currentGame"),
};