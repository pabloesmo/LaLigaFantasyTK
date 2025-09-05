import React, { useState } from "react";

function SearchPlayer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://back-lf-swgm.onrender.com/jugadores?nombre=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      } else {
        console.error("Error al buscar jugadores");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Búsqueda de Jugadores</h1>
      <input
        type="text"
        placeholder="Nombre del jugador"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
        Buscar
      </button>
      {loading && <p>Cargando...</p>}
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <strong>{player.nombre}</strong> - {player.equipo} - {player.puntos} puntos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPlayer;