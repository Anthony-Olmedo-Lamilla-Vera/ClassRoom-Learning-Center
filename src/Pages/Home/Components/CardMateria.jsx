import React from "react";
import { Link } from "react-router-dom";

function CardMateria({ nameMateria, cantidad, idCurso, id }) {
  return (
    <Link to={"/Materia/" + id}>
      <div className="cont-card-materia">
        <div className="title-materia">
          <h3 className="title-materia">{nameMateria}</h3>
        </div>

        <p className="cantidad-alumnos">Cantidad Alumnos : {cantidad}</p>
        <p className="id-curso">Id curso : {idCurso}</p>
      </div>
    </Link>
  );
}

export default CardMateria;
