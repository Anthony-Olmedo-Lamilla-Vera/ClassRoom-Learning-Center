import React from "react";
import { Link } from "react-router-dom";

function ItemTareaRestante({ idTarea, NombreTarea, Materia, TiempoRestante }) {
  return (
    <Link to={"/task/" + idTarea}>
      <div className="item_tarea_restante">
        <h3>{NombreTarea}</h3>
        <p>{Materia}</p>
        <p>{TiempoRestante}</p>
      </div>
    </Link>
  );
}

export default ItemTareaRestante;
