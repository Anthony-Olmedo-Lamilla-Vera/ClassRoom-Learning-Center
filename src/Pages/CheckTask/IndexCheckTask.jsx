import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinLoader from "../../Components/SpinLoader";
import { URLGET } from "../Variables";
import FormReview from "./Components/FormReview";

function IndexCheckTask() {
  const { idtarea } = useParams();
  const [DataEntregas, setDataEntregas] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [AlumnCheck, setAlumnCheck] = useState({});
  async function GetEstudentsEntrega() {
    await axios
      .get(URLGET + "GetUsers-Tareas/" + idtarea)
      .then((dataitem) => {
        setDataEntregas(dataitem.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }

  useEffect(() => {
    GetEstudentsEntrega();
  }, []);

  return (
    <main className="check-task-main">
      <SpinLoader Cargado={Loading} />
      <h1>Check Task</h1>
      <h3>
        Tarea :{" "}
        {DataEntregas &&
          DataEntregas.length > 0 &&
          DataEntregas[0].Tarea.Nombre}
      </h3>
      <div className="cont-grid-check">
        {Object.keys(AlumnCheck).length > 0 && AlumnCheck.URLEntrega ? (
          <section className="check-task-preview">
            <embed
              type="application/pdf"
              width="80%"
              height="100%"
              src={AlumnCheck.URLEntrega}
            />
          </section>
        ) : (
          ""
        )}
        <aside className="check-task-estudents">
          {Object.keys(AlumnCheck).length > 0 && (
            <FormReview
              alumno={AlumnCheck.Estudiante.Nombre}
              email={AlumnCheck.Estudiante.Email}
              idEntrega={AlumnCheck._id}
            />
          )}
          <h2>Estudiantes - Entregas</h2>
          <ul>
            {DataEntregas && DataEntregas.length > 0 ? (
              DataEntregas.map((itementrega) => {
                return (
                  <li onDoubleClick={() => setAlumnCheck(itementrega)}>
                    <div className="text-estudent-check">
                      <p>{itementrega.Estudiante.Nombre}</p>
                      <p>{itementrega.Estudiante.Email}</p>
                    </div>
                    <p>Nota : {itementrega.Nota}</p>
                  </li>
                );
              })
            ) : (
              <p>Sin Entregas</p>
            )}
          </ul>
        </aside>
      </div>
    </main>
  );
}

export default IndexCheckTask;
