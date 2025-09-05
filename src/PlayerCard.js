import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerCard = ({ firstName, lastName }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const params = { nombre: firstName };
        if(lastName) {
          params.apellido = lastName;
        }
        const res = await axios.get("https://back-lf-swgm.onrender.com/jugador-imagen", {
          params: { nombre: firstName, apellido: lastName },
        });
        setImageUrl(res.data.image_url);
      } catch (err) {
        console.error("Error obteniendo imagen:", err);
        setImageUrl("https://media.futbolfantasy.com/thumb/400x400/v202209182308/uploads/images/jugadores/ficha/00.png"); // fallback
      }
    };

    fetchImage();
  }, [firstName, lastName]);

  return (
    <div className="card">
      {imageUrl ? (
        <img src={imageUrl} alt={`${firstName} ${lastName}`} className="player-image" />
      ) : (
        <p>Cargando...</p>
      )}
      <p className="player-name">{firstName} {lastName}</p>
    </div>
  );
}

export default PlayerCard;
