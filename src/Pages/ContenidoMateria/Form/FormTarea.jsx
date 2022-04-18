import axios from "axios";
import React, { useState } from "react";
import { useInput } from "../../../Hooks/useInput";
import { URLPOST } from "../../Variables";
import ContentForms from "../Components/ContentForms";

function FormTarea({ nombreMat, nivelmat }) {
  const NombreTarea = useInput();
  const DescripcionTarea = useInput();
  const FechaEntrega = useInput();
  const [Files, setFiles] = useState([]);

  async function EntregarTarea(e) {
    e.preventDefault();
    const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));

    const Data = new FormData();
    Data.append("Nombre", NombreTarea.Input);
    Data.append("fechaLimite", FechaEntrega.Input);
    Data.append("descripcion", DescripcionTarea.Input);
    Data.append("file", Files);
    Data.append("materia", nombreMat);
    Data.append("nivel", nivelmat);

    await axios
      .post(URLPOST + "create-Tarea", Data, {
        headers: {
          authorization: `bearer ${parseJson.tokenUser}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <ContentForms eventclick={EntregarTarea}>
      <div className="input-item">
        <label>Nombre Tarea</label>
        <input
          value={NombreTarea.Input}
          onChange={NombreTarea.targetInput}
          type="text"
        />
      </div>
      <div className="input-item">
        <label>Descripcion Tarea</label>
        <textarea
          value={DescripcionTarea.Input}
          onChange={DescripcionTarea.targetInput}
          type="text"
        />
      </div>
      <div className="input-item">
        <label>Fecha Entrega / Hora </label>
        <input
          value={FechaEntrega.Input}
          onChange={FechaEntrega.targetInput}
          type="datetime-local"
        />
      </div>

      <section className="cont-Entrega">
        <div className="input-item-entrega">
          <label>Archivos </label>
          <input
            multiple
            accept="application/pdf"
            onChange={(e) => {
              setFiles(e.target.files[0]);
            }}
            className="input-files"
            type="file"
            placeholder="Suba archivos"
          />
        </div>
      </section>
    </ContentForms>
  );
}

export default FormTarea;
