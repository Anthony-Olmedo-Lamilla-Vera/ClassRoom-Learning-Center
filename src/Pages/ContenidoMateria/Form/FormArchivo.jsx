import axios from "axios";
import React from "react";
import { useInput } from "../../../Hooks/useInput";
import { URLPOST } from "../../Variables";
import ContentForms from "../Components/ContentForms";

function FormArchivo({ materiaid, tipo }) {
  const TituloArchivo = useInput();
  const DescripcionArchivo = useInput();
  async function uploadArchivo(e) {
    e.preventDefault();
    const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));
    await axios
      .post(
        URLPOST + "create-content",
        {
          idmateria: materiaid,
          tipo: tipo,
          titulo: TituloArchivo.Input,
          contenido: DescripcionArchivo.Input,
        },
        {
          headers: {
            authorization: `bearer ${parseJson.tokenUser}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <ContentForms eventclick={uploadArchivo}>
      <div className="input-item">
        <label>Nombre Archivo</label>
        <input
          value={TituloArchivo.Input}
          onChange={TituloArchivo.targetInput}
          type="text"
        />
      </div>
      <div className="cont-Entrega">
        <div className="input-item-entrega">
          <label>Archivos </label>

          <input
            value={DescripcionArchivo.Input}
            onChange={DescripcionArchivo.targetInput}
            className="input-files"
            type="file"
            placeholder="Suba archivos"
          />
        </div>
      </div>
    </ContentForms>
  );
}

export default FormArchivo;
