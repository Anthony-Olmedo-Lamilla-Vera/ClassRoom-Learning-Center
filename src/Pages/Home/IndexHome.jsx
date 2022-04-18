import React, { useContext, useEffect } from "react";
import Headpage from "../../Components/Headpage";
import MateriasCard from "./Components/MateriasCard";
import ContainerTareas from "./Components/ContainerTareas";
import { contextUser } from "../../Hooks/ContextUser";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import SpinLoader from "../../Components/SpinLoader";
function IndexHome() {
  const { user, DatosUser } = useContext(contextUser);
  const navigate = useNavigate();

  async function Prueba() {
    const formData = new FormData();
    formData.append("msg", "Hola desde form data");
    await axios
      .post("//localhost:4000/api/prueba", { msg: "Perrrrrra" })
      .then((data) => console.log(data.data));
  }

  useEffect(() => {
    {
      DatosUser &&
        DatosUser.Materias &&
        DatosUser.Materias.length < 1 &&
        navigate("/inscribir-materias");
    }
  }, [DatosUser]);
  return (
    <Headpage titulo={"Inicio"} descripcion={"Inicio de plataforma"}>
      <SpinLoader />
      <section className="Tareas-Vigentes">
        <h2>Tareas</h2>
        <ContainerTareas />
      </section>
      <section className="Materias">
        <h2>Materias </h2>
        <MateriasCard />
      </section>
    </Headpage>
  );
}

export default IndexHome;
