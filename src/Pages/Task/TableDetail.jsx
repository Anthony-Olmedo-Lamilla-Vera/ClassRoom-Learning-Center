import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URLPOST } from "../Variables";

function TableDetail({
  estadoRevision,
  nota,
  tareaeditad,
  tiemporest,
  fechamax,
  NombreButton,
  nombresubirbutton,
  tareaid,
  fechaEntrega,
  observacion,
}) {
  const [File, setFile] = useState([]);
  const [ModalEntrega, setModalEntrega] = useState(false);
  const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));
  const navigate = useNavigate();

  async function RealizarEntrega(e) {
    console.log(tareaid);
    e.preventDefault();

    if (NombreButton === "Editar Entrega") {
      console.log("EDITAR ENTREGA");
    } else {
      console.log("Realizar Entrega");

      const Data = new FormData();
      Data.append("file", File);
      Data.append("idtarea", tareaid);
      await axios
        .post(URLPOST + "entrega-tarea", Data, {
          headers: {
            authorization: `bearer ${parseJson.tokenUser}`,
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => console.log(error.response));
    }
  }
  return (
    <section>
      <div className="contenido-tarea">
        <table>
          <tbody>
            <tr>
              <th>Calificado </th>
              <td> {estadoRevision} </td>
            </tr>
            <tr>
              <th>Calificacion </th>
              <td> {nota}</td>
            </tr>
            {observacion && (
              <tr>
                <th>Observacion</th>
                <td>{observacion}</td>
              </tr>
            )}
            <tr>
              <th>Tarea Editada </th>
              <td>{tareaeditad}</td>
            </tr>
            <tr>
              <th>Tiempo Restante </th>
              <td>{tiemporest}</td>
            </tr>
            <tr>
              <th>Fecha max. Entrega</th>
              <td>{fechamax}</td>
            </tr>
            {fechaEntrega && (
              <tr>
                <th>Fecha Entregada</th>
                <td>{fechaEntrega}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={() =>
            ModalEntrega ? setModalEntrega(false) : setModalEntrega(true)
          }
        >
          {NombreButton}
        </button>
      </div>
      {ModalEntrega && (
        <section className="cont-Entrega">
          <div className="area_input">
            <div className="titulo-area">
              <p>Suba sus Archivos aqui</p>
            </div>
            <form action="">
              <div className="input-item-entrega">
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="application/pdf"
                  className="input-files"
                  type="file"
                  placeholder="Suba archivos"
                />
              </div>
              <div className="subirEntrega-btn">
                <button onClick={RealizarEntrega}>{nombresubirbutton}</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </section>
  );
}

export default TableDetail;
