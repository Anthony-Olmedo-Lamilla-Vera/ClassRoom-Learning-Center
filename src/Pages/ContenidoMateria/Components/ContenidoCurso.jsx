import React from "react";
import ItemArchivos from "./ItemArchivos";
import ItemAviso from "./ItemAviso";
import ItemTask from "./ItemTask";

function ContenidoCurso({ edit, data }) {
  return (
    <div className="contenido_curso">
      {data.map((itemdata, key) => {
        return itemdata.Tipo === "aviso" ? (
          <ItemAviso
            id={itemdata._id}
            key={itemdata._id}
            titulo={itemdata.Titulo}
            contenido={itemdata.Descripcion}
            type="aviso"
            editar={edit}
          />
        ) : itemdata.Tipo === "archivo" ? (
          <ItemArchivos
            id={itemdata._id}
            key={itemdata._id}
            Descripcion={itemdata.Descripcion}
            NombreArchivo={itemdata.Documento}
            Titulo={itemdata.Titulo}
            editar={edit}
          />
        ) : itemdata.Tipo === "tarea" ? (
          <ItemTask
            nombre={itemdata.Titulo}
            Descripcion={itemdata.Descripcion}
            key={itemdata._id}
            id={itemdata.idTarea}
            editar={edit}
          />
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default ContenidoCurso;
