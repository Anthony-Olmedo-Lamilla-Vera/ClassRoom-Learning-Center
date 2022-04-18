import React from "react";
import { GoAlert } from "react-icons/go";
import ContenidoItems from "./contenidoItems";

function ItemAviso({ id, contenido, titulo, type, editar }) {
  return (
    <ContenidoItems idtask={id} titleSection={type} editar={editar}>
      <div className="contenido_aviso">
        <div className="contenido_cuerpo_aviso">
          <h2>{titulo}</h2>
          <p>{contenido}</p>
        </div>
      </div>
    </ContenidoItems>
  );
}

export default ItemAviso;
