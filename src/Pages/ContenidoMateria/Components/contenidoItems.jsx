import axios from "axios";
import React from "react";
import { GoAlert } from "react-icons/go";
import { URLDELETE } from "../../Variables";

function ContenidoItems({ editar, children, titleSection, idtask }) {
  async function DeleteItem() {
    await axios
      .delete(URLDELETE + "delete-content/" + idtask)
      .then((itemdel) => {
        window.location.reload();
        console.log(itemdel.data);
      });
  }

  return (
    <div className="bordes-item">
      {editar && (
        <div className="button-agregarElemento button_editar">
          <button onClick={DeleteItem} className="delete-button">
            Eliminar
          </button>
          <button className="">Editar</button>
        </div>
      )}
      <h4>
        {titleSection === "aviso" && (
          <div className="contenido_head-aviso">
            <span className="icon-aviso">
              <GoAlert />
            </span>
            <p className="">Aviso</p>
          </div>
        )}
      </h4>
      {children}
    </div>
  );
}

export default ContenidoItems;
