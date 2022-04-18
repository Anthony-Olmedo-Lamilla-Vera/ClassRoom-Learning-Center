import axios from "axios";
import React from "react";
import { useInput } from "../../../Hooks/useInput";
import { URLPOST } from "../../Variables";
import ContentForms from "../Components/ContentForms";

function FormAviso({ materiaid, tipo }) {
  const TituloAviso = useInput();
  const DescripcionAviso = useInput();

  async function uploadAviso(e) {
    e.preventDefault();
    const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));
    await axios
      .post(
        URLPOST + "create-content",
        {
          idmateria: materiaid,
          tipo: tipo,
          titulo: TituloAviso.Input,
          contenido: DescripcionAviso.Input,
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
    <ContentForms eventclick={uploadAviso}>
      <div className="input-item">
        <label>Nombre Aviso </label>
        <input
          type="text"
          value={TituloAviso.Input}
          onChange={TituloAviso.targetInput}
        />
      </div>
      <div className="input-item">
        <label>Contenido Aviso </label>
        <textarea
          value={DescripcionAviso.Input}
          onChange={DescripcionAviso.targetInput}
          cols={0}
          rows={3}
        />
      </div>
    </ContentForms>
  );
}

export default FormAviso;
