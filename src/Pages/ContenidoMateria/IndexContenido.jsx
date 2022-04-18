import React, { useContext, useEffect, useState } from "react";
import Headpage from "../../Components/Headpage";
import ContenidoCurso from "./Components/ContenidoCurso";
import { contextUser } from "../../Hooks/ContextUser";
import { useInput } from "../../Hooks/useInput";
import FormTarea from "./Form/FormTarea";
import FormAviso from "./Form/FormAviso";
import FormArchivo from "./Form/FormArchivo";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URLGET } from "../Variables";
import SpinLoader from "../../Components/SpinLoader";
import { BsArrowLeft } from "react-icons/bs";

function IndexContenido() {
  const [Editar, setEditar] = useState(false);
  const { user, DatosUser } = useContext(contextUser);
  const [Loading, setLoading] = useState(true);
  const [AgregarItem, setAgregarItem] = useState(false);
  const [Contenido, setContenido] = useState();
  const InputOption = useInput();
  const { idmateria } = useParams();
  console.log(idmateria);
  useEffect(() => {
    if (!Editar) {
      setAgregarItem(false);
    }
  }, [Editar]);

  const arrayDatos = [];

  async function GetContenidoMateria() {
    const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));

    await axios
      .get(URLGET + "GetMateria-contenido/" + idmateria, {
        headers: {
          authorization: `bearer ${parseJson.tokenUser}`,
        },
      })
      .then((dateMateria) => {
        setLoading(false);
        arrayDatos.push(dateMateria.data);
        setContenido(arrayDatos[0]);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error.response);
      });
  }
  const navig = useNavigate();
  useEffect(() => {
    GetContenidoMateria();
  }, []);

  return (
    <Headpage titulo={"Materia"} descripcion="Contenido de materia ">
      <SpinLoader Cargado={Loading} />
      <main className="contenido">
        {Object.keys(DatosUser).length > 0 &&
          DatosUser.usuario.Categoria === "Profesor" && (
            <div className="btn-agregarElemento">
              <button
                onClick={() => (Editar ? setEditar(false) : setEditar(true))}
              >
                {Editar ? "Quitar Edicion de Pagina" : "Editar"}
              </button>
              {Editar && (
                <button
                  onClick={() =>
                    AgregarItem ? setAgregarItem(false) : setAgregarItem(true)
                  }
                >
                  {!AgregarItem ? "Agregar Elemento [+]" : "Quitar Modal"}
                </button>
              )}
            </div>
          )}

        {AgregarItem && (
          <div className="form-item">
            <form>
              <div className="input-item">
                <label>Tipo de Item</label>
                <select onChange={InputOption.targetInput}>
                  <option value="">Elija un tipo de item</option>
                  <option value="aviso">Aviso</option>
                  <option value="tarea">Tarea</option>
                  <option value="archivo">Archivo</option>
                </select>
              </div>
              {InputOption.Input === "tarea" && (
                <FormTarea
                  nombreMat={Contenido.materia.Nombre}
                  nivelmat={Contenido.materia.Nivel}
                  materiaid={idmateria}
                  tipo={InputOption.Input}
                />
              )}
              {InputOption.Input === "aviso" && (
                <FormAviso materiaid={idmateria} tipo={InputOption.Input} />
              )}
              {InputOption.Input === "archivo" && (
                <FormArchivo
                  nomn
                  materiaid={idmateria}
                  tipo={InputOption.Input}
                />
              )}
            </form>
          </div>
        )}

        <div className="contenido_logoDocente">
          <img
            src="https://img.freepik.com/vector-gratis/fondo-isometrico-material-matematicas_23-2148148447.jpg"
            alt=""
          />
          <h2>
            {Contenido &&
              Object.keys(Contenido).length > 0 &&
              Contenido.materia.Nombre}
          </h2>
        </div>
        {Contenido &&
        Object.keys(Contenido).length > 0 &&
        Contenido.materia &&
        Contenido.materia.Contenidos.length > 0 ? (
          <ContenidoCurso data={Contenido.materia.Contenidos} edit={Editar} />
        ) : (
          <div className="msg-sinContenido">
            <p> ! Sin Contenido</p>
            <Link to="/">Regresar</Link>
          </div>
        )}
      </main>
    </Headpage>
  );
}

export default IndexContenido;
