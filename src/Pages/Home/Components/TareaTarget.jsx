import React from "react";
import { Link } from "react-router-dom";
function TareaTarget({ idtarea, Titulo, Materia, TiempoEntrega }) {
  return (
    <Link to={`/task/${idtarea}`}>
      <div className="cont-target-tarea">
        <h3>{Titulo}</h3>
        <p>{Materia}</p>
        <p>Tiempo de entrega </p>
        <p>{TiempoEntrega}</p>
      </div>
    </Link>
  );
}

export default TareaTarget;
