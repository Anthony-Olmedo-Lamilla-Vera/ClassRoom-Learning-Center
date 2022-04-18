import React, { useContext } from "react";
import { contextUser } from "../../Hooks/ContextUser";
import ItemTareaRestante from "./Components/ItemTareaRestante";
function TareasRestantes() {
  const { DatosUser } = useContext(contextUser);

  return (
    <div className="cont_tareas_restantes">
      {DatosUser &&
        DatosUser.Materias &&
        DatosUser.Materias.map((itemMateria) => {
          return itemMateria.Tareas.map((itemTarea, key) => {
            return (
              <ItemTareaRestante
                idTarea={itemTarea._id}
                key={key}
                Materia={itemMateria.Nombre}
                NombreTarea={itemTarea.Nombre}
                TiempoRestante={itemTarea.FechaLimite}
              />
            );
          });
        })}
    </div>
  );
}

export default TareasRestantes;
