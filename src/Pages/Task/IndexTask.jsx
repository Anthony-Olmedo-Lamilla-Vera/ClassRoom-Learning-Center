import axios from "axios";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Headpage from "../../Components/Headpage";
import { URLGET } from "../Variables";
import TableDetail from "./TableDetail";
import TareasRestantes from "./TareasRestantes";
import moment from "moment";
import { contextUser } from "../../Hooks/ContextUser";
import SpinLoader from "../../Components/SpinLoader";
import { FaFilePdf } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";

function IndexTask() {
  const { idtarea } = useParams();
  const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));
  const [Entrega, setEntrega] = useState({});
  const [Cargado, setCargado] = useState(true);
  const { user, DatosUser } = useContext(contextUser);
  console.log(idtarea);
  useEffect(() => {
    setCargado(true);
    const getTarea = async () => {
      const peticion = await axios
        .get(URLGET + "Get-Entrega/" + idtarea, {
          headers: {
            authorization: `bearer ${parseJson.tokenUser}`,
          },
        })
        .then(async (res) => {
          setEntrega(res.data);
          setCargado(false);
        })
        .catch((error) => {
          setCargado(false);
          console.log(error.response);
        });
      return peticion;
    };
    getTarea();
  }, [idtarea]);
  console.log(Entrega);

  return (
    <Headpage titulo="Tareas" descripcion={"Tareas para subir"}>
      <main className="Task-upload">
        <SpinLoader Cargado={Cargado} />

        <section>
          {Object.keys(DatosUser).length > 0 &&
            DatosUser.usuario.Categoria === "Profesor" && (
              <div className="abrir-check">
                <Link to={"/check-tasks/" + idtarea}>Revisar Tarea</Link>
              </div>
            )}
          {Object.keys(Entrega).length > 0 && (
            <article>
              <h2>TAREA : {Entrega.ModelTareas.Nombre}</h2>
              <p>{Entrega.ModelTareas.Descripcion}</p>
              {Entrega.ModelTareas.Documentos.length > 0 && (
                <a
                  href={Entrega.ModelTareas.Documentos[0].URLdocumento}
                  target="_blank"
                >
                  <FaFilePdf size={40} />
                  {Entrega.ModelTareas.Documentos.length > 0 &&
                    Entrega.ModelTareas.Documentos[0].TituloDocumento}
                </a>
              )}
              {
                <p>
                  Estado de la Tarea :{" "}
                  <span>
                    {Entrega.Entrega.length > 0
                      ? Entrega.Entrega[0].EstadoEntrega
                      : "No hay Entrega"}{" "}
                  </span>
                </p>
              }
            </article>
          )}
          {Object.keys(Entrega).length > 0 && Entrega.Entrega.length > 0 && (
            <TableDetail
              observacion={Entrega.Entrega[0].Observacion}
              estadoRevision={Entrega.Entrega[0].EstadoEntrega}
              nota={Entrega.Entrega[0].Nota}
              NombreButton="Editar Entrega"
              nombresubirbutton={"Editar Subida"}
              tareaid={idtarea}
              fechamax={moment(Entrega.ModelTareas.FechaPublicacion).format(
                "LLL"
              )}
              tiemporest={moment(
                Entrega.ModelTareas.FechaPublicacion
              ).fromNow()}
              fechaEntrega={moment(Entrega.ModelTareas.FechaEntrega).format(
                "LLL"
              )}
            />
          )}

          {Object.keys(Entrega).length > 0 && Entrega.Entrega.length < 1 && (
            <TableDetail
              NombreButton="Realizar Entrega "
              nombresubirbutton={"Realizar Subida"}
              fechamax={moment(Entrega.ModelTareas.FechaPublicacion).format(
                "LLL"
              )}
              tiemporest={moment(
                Entrega.ModelTareas.FechaPublicacion
              ).fromNow()}
              tareaid={idtarea}
            />
          )}
        </section>

        <aside>
          <div className="tareas-restantes">
            <h2>Tareas Restantes </h2>
            <TareasRestantes />
          </div>
        </aside>
      </main>
    </Headpage>
  );
}

export default IndexTask;
