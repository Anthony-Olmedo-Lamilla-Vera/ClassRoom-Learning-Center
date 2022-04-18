import React from "react";
import ContenidoItems from "./contenidoItems";
import { GoAlert } from "react-icons/go";
import { VscFilePdf } from "react-icons/vsc";

function ItemArchivos({
  id,
  Descripcion,
  Titulo,
  NombreArchivo,
  editar,
  type,
}) {
  return (
    <ContenidoItems idtask={id} editar={editar} titleSection={type}>
      <div className="contenido_archivo">
        <h3>{Titulo}</h3>
        <p>{Descripcion}</p>
        <a href="" className="color_contenido">
          <span className="icon-arhivo">
            <VscFilePdf />
          </span>
          <span>{NombreArchivo}</span>
        </a>
      </div>
    </ContenidoItems>
  );
}

export default ItemArchivos;
