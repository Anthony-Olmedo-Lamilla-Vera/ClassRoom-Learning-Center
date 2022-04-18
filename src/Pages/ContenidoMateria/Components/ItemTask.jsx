import React from "react";
import ContenidoItems from "./contenidoItems";
import { Link } from "react-router-dom";
import { AiFillFolderOpen } from "react-icons/ai";

function ItemTask({ id, editar, nombre, Descripcion }) {
  return (
    <ContenidoItems idtask={id} editar={editar}>
      <div className="contenido_head-aviso">
        <Link className="link-redirect" to={"/task/" + id}>
          <span className="icon-aviso">
            <AiFillFolderOpen />
          </span>
          <p className="">{nombre}</p>
        </Link>
      </div>
      <p>{Descripcion}</p>
    </ContenidoItems>
  );
}

export default ItemTask;
