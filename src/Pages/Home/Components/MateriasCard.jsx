import React, { useContext } from "react";
import { contextUser } from "../../../Hooks/ContextUser";
import CardMateria from "./CardMateria";

function MateriasCard() {
  const { DatosUser } = useContext(contextUser);
  return (
    <div className="container-materias">
      {DatosUser &&
        DatosUser.Materias &&
        DatosUser.Materias.map((itemMateria, key) => {
          return (
            <CardMateria
              key={key}
              id={itemMateria._id}
              nameMateria={itemMateria.Nombre}
              cantidad={itemMateria.Estudiantes.length}
              idCurso={itemMateria.Curso}
            />
          );
        })}
    </div>
  );
}

export default MateriasCard;
