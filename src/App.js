import React, { useEffect, useState } from "react";
import "./App.css";
import PlayerCard from "./PlayerCard";
import PlayerComparison from "./PlayerComparison";

// Jugadores obtenidos de la Base de Datos o API
const players = [
  {firstName: "Nico", lastName: "Williams"},
  {firstName: "Antonio", lastName: "Martinez"},
  {firstName: "Ilaix", lastName: "Moriba"},
  {firstName: "Alvaro", lastName: "Garcia"},
  {firstName: "Antonio", lastName: "Blanco"},
  {firstName: "Aimar", lastName: "Oroz"},
  {firstName: "lvaro", lastName: "fernandez-1"},
  {firstName: "Natan", lastName: ""},
  {firstName: "Florian", lastName: "Lejeune"},
  {firstName: "Rafa", lastName: "Marin"},
  {firstName: "David", lastName: "Soria"},
];

const formations = {
  "4-4-2": [2, 4, 4, 1],
  "3-4-3": [3, 4, 3, 1],
  "4-3-3": [3, 3, 4, 1],
  "5-3-2": [2, 3, 5, 1]
};

function App() {
  const [formation, setFormation] = useState("4-3-3");

  const renderFormation = () => {
    const scheme = formations[formation];
    let playerIndex = 0;

    return scheme.map((count, rowIdx) => (
      <div className="row" key={rowIdx}>
        {Array.from({ length: count }, (_, i) => {
          const player = players[playerIndex++];
          return player ? (
            <PlayerCard
              key={i}
              firstName={player.firstName}
              lastName={player.lastName}
            />
          ) : (
            <div className="card empty" key={i}>Vacío</div>
          )
        })}
      </div>
    ));
  };

  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const player1 = { name: "Lamine Yamal", marketValue: 120, image: ""};
  const player2 = { name: "Mbappé", marketValue: 160, image: ""};

  useEffect(() => {
    fetch("http://localhost:8000/goleadores") // tu backend
      .then((res) => res.json())
      .then((data) => {
        setScorers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener goleadores:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      {/* NavBar */}
      <div className="navbar">
        <h2>FANTASY TRACKER</h2>
      </div>

      {/* Contenedor principal */}
      <div className="main">
        {/* Columna izquierda: campo + formación */}
        <div className="field-container">
          <div className="controls">
            <label>Formación: </label>
            <select value={formation} onChange={(e) => setFormation(e.target.value)}>
              {Object.keys(formations).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className="formation">{renderFormation()}</div>
        </div>

        {/* Columna derecha: espacio vacío o info */}
        <div className="sidebar">
        <h3 className="titulo_goleadoresN">🏆 Máximos Goleadores</h3>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="top-scorers">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Jugador</th>
                  <th>Equipo</th>
                  <th>⚽ Goles</th>
                </tr>
              </thead>
              <tbody>
                {scorers.slice(0, 10).map((player, index) => {
                  // Comprobar si el jugador está en la lista "players"
                  const isInPlayers = players.some(
                    (p) =>
                      player.nombre.toLowerCase().includes(p.firstName.toLowerCase()) &&
                      (p.lastName === "" || player.nombre.toLowerCase().includes(p.lastName.toLowerCase()))
                  );

                  return (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: isInPlayers ? "#d4edda" : "transparent" 
                      }}
                    >
                      <td
                        style={{
                          fontWeight: index <= 2 ? "bold" : "normal",
                          color: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "#cd7f32" : "black"
                        }}
                      >
                        {index + 1}
                      </td>

                      <td
                        style={{
                          fontWeight: index <= 2 ? "bold" : "normal",
                          color: isInPlayers
                            ? "green"
                            : index === 0
                            ? "gold"
                            : index === 1
                            ? "silver"
                            : index === 2
                            ? "#cd7f32"
                            : "black"
                        }}
                      >
                        {player.nombre}
                      </td>

                      <td>
                        {player.escudo && (
                          <img
                            src={player.escudo}
                            alt={player.equipo}
                            style={{ width: "24px", marginRight: "5px", verticalAlign: "middle" }}
                          />
                        )}
                        {player.equipo}
                      </td>

                      <td
                        style={{
                          fontWeight: index <= 2 ? "bold" : "normal",
                          color: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "#cd7f32" : "black"
                        }}
                      >
                        {player.goles}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}
        </div>
      </div>
      <br></br>
      <div className="sidebar">
        <h2 style={{ textAlign: "center" }}>Comparación de Mercado</h2>
          <PlayerComparison player1={player1} player2={player2} />
      </div>
    </div>
  );
}

export default App;