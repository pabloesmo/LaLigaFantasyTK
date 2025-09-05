import React from "react";
import { motion } from "framer-motion";
import "./App.css";

const PlayerComparison = ({ player1, player2 }) => {
    return (
        <div className="comparacion-container">
            <motion.div className="player-card"
                        whileHover={{ scale : 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}>
                
                <img 
                    src={player1.image || "/default-player.png"}
                    alt={player1.name}
                    className="player-img"
                />
                <h3>{player1.name}</h3>
                <p>Valor: {player1.marketValue || "N/A"} M€</p>
            </motion.div>

            <div className="vs-text">VS</div>

            <motion.div className="player-card"
                        whileHover={{ scale : 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}>
                
                <img 
                    src={player2.image || "/default-player.png"}
                    alt={player2.name}
                    className="player-img"
                />
                <h3>{player2.name}</h3>
                <p>Valor: {player2.marketValue || "N/A"} M€</p>
            </motion.div>
        </div>
    );
};

export default PlayerComparison;