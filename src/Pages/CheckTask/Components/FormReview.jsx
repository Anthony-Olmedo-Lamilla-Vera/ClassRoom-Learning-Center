import axios from "axios";
import React from "react";
import { useInput } from "../../../Hooks/useInput";
import { URLPUT } from "../../Variables";

function FormReview({ idEntrega, alumno, email }) {
  const NotaInput = useInput();
  const ObservacionInput = useInput();
  async function Calificar(e) {
    e.preventDefault();
    await axios
      .put(URLPUT + "calificar/" + idEntrega, {
        nota: NotaInput.Input,
        observacion: ObservacionInput.Input,
      })
      .then((respuesta) => {
        window.location.reload();
        console.log(respuesta.data);
      })
      .catch((err) => console.log(err.response));
  }
  return (
    <div className="check-task-form">
      <div className="head-task-form">
        <h3>Estudiante</h3>
        <p>
          {alumno} - {email}
        </p>
      </div>
      <form className="form-task" action="">
        <div className="item-input">
          <label htmlFor="">Calificacion </label>
          <input
            value={NotaInput.Input}
            onChange={NotaInput.targetInput}
            type="number"
          />
        </div>
        <div className="item-input">
          <label htmlFor="">Observacion </label>
          <input
            value={ObservacionInput.Input}
            onChange={ObservacionInput.targetInput}
            type="text"
          />
        </div>
        <div className="button-inscr">
          <button onClick={Calificar}>Calificar</button>
        </div>
      </form>
    </div>
  );
}

export default FormReview;
