import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { contextUser } from "../Hooks/ContextUser";
import { BiExit } from "react-icons/bi";

function Headers() {
  const { DatosUser } = useContext(contextUser);
  function CerrarSession() {
    window.localStorage.removeItem("tokenUsuario");
    window.location.reload();
  }

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </Link>
      </div>
      <nav>
        {DatosUser.usuario &&
          DatosUser.usuario.Categoria === "Estudiante" &&
          DatosUser.usuario.Carrera && (
            <li className="nav-detail">
              <p href="">
                {"Carrera |" + DatosUser.usuario.Carrera.NombreCarrera}
              </p>
            </li>
          )}
        <li className="nav-detail">
          <p href="">
            {DatosUser &&
            DatosUser.usuario &&
            DatosUser.usuario.Categoria &&
            DatosUser.usuario.Categoria === "Estudiante"
              ? "Semestre | " + DatosUser.usuario.Semestre
              : "Docente"}
          </p>
        </li>
        <li className="user nav-detail">
          <a>{DatosUser && DatosUser.usuario && DatosUser.usuario.Nombre}</a>
        </li>
      </nav>
      <div className="cerrar-session">
        {DatosUser &&
          DatosUser.usuario &&
          DatosUser.usuario.Categoria &&
          DatosUser.usuario.Categoria !== "Estudiante" && (
            <Link to={"/panel-control"}>Panel de Control</Link>
          )}
        <button onClick={CerrarSession}>Cerrar Session</button>
      </div>

      <div className="buttons">
        <button onClick={CerrarSession}>
          <BiExit size={30} color={"#a8201a"} />
          salir
        </button>
      </div>
    </header>
  );
}

export default Headers;
