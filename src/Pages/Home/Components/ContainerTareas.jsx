import React, { useContext, useEffect } from "react";
import TareaTarget from "./TareaTarget";

import { contextUser } from "../../../Hooks/ContextUser";

function ContainerTareas() {
  const { DatosUser } = useContext(contextUser);
  return (
    <div className="container-tareas">
      {DatosUser &&
        DatosUser.Materias &&
        DatosUser.Materias.map((itemMateria) => {
          return itemMateria.Tareas.map((itemTarea, key) => {
            return (
              <TareaTarget
                idtarea={itemTarea._id}
                key={key}
                Materia={itemMateria.Nombre}
                Titulo={itemTarea.Nombre}
                TiempoEntrega={itemTarea.FechaLimite}
              />
            );
          });
        })}
    </div>
  );
}

export default ContainerTareas;
