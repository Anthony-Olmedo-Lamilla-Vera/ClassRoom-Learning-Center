import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { URLGET, URLPOST } from "../../Variables";
import { contextUser } from "../../../Hooks/ContextUser";
import { useInput } from "../../../Hooks/useInput";
function InputMatricula() {
  const { DatosUser } = useContext(contextUser);
  const [Materias, setMaterias] = useState([]);
  const [DatosInscripciones, setDatosInscripciones] = useState({});
  const [Inscripciones, setInscripciones] = useState([]);
  const InputCarrera = useInput();
  const InputSemestre = useInput();
  const InputMateria = useInput();
  let materia = [];
  useEffect(() => {
    const getcarre = async () => {
      await axios
        .get(URLGET + "Get-materias/" + DatosUser.usuario.Carrera)
        .then((res) => {
          setDatosInscripciones(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    Object.keys(DatosUser).length > 0 && getcarre();
  }, [DatosUser]);

  async function InscribirseMaterias(e) {
    e.preventDefault();
    const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));
    await axios
      .post(
        URLPOST + "Inscripcion-Materias",
        {
          materias: Inscripciones,
        },
        {
          headers: {
            Authorization: `bearer ${parseJson.tokenUser}`,
          },
        }
      )
      .then((res) => window.location.reload())
      .catch((err) => console.log(err.response));
  }

  const Agregate_Materia = (e) => {
    e.preventDefault();
    const itemMatricula = {
      Carrera: InputCarrera.Input,
      Materia: InputMateria.Input,
      Semestre: parseInt(InputSemestre.Input),
    };
    setInscripciones([...Inscripciones, itemMatricula]);
  };

  console.log(Inscripciones);

  return (
    <React.Fragment>
      <form action="">
        <h1>Inscribir Materias </h1>
        <div className="input-item">
          <label>Elije Carrera </label>
          <select
            value={InputCarrera.Input}
            onChange={InputCarrera.targetInput}
          >
            <option value="">Elija su Carrera</option>
            {Object.keys(DatosInscripciones).length > 0 && (
              <option value={DatosInscripciones.ContenidoCarrera._id}>
                {DatosInscripciones.ContenidoCarrera.NombreCarrera}
              </option>
            )}
          </select>
        </div>
        <div className="input-item">
          <label>Elije Semestre</label>
          <select
            value={InputSemestre.Input}
            onChange={InputSemestre.targetInput}
          >
            <option value="">Elija su Semestre</option>
            {Object.keys(DatosInscripciones).length > 0 &&
              DatosInscripciones.MateriaSemestres.map((itemSemestres, key) => {
                return (
                  <option key={key} value={itemSemestres.numeroSemestre}>
                    {itemSemestres.numeroSemestre}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="input-item">
          <label>Elije materias</label>
          <select
            value={InputMateria.Input}
            onChange={InputMateria.targetInput}
          >
            <option value="">Elija su Materia</option>
            {Object.keys(DatosInscripciones).length > 0 &&
              InputSemestre.Input !== "" &&
              InputSemestre.Input !== null &&
              DatosInscripciones.MateriaSemestres.filter((item) => {
                let res = item.numeroSemestre === parseInt(InputSemestre.Input);
                if (res === true) {
                  materia.push(item);
                }
              })}
            {materia.length > 0 &&
              materia[0].contenidoSemestre.map((itemSemestres, key) => {
                return (
                  <option key={key} value={itemSemestres.Nombre}>
                    {itemSemestres.Nombre}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="button-agregate">
          <button onClick={Agregate_Materia}>Agregar Materia (+)</button>
        </div>
        <div className="button-inscr">
          <button onClick={InscribirseMaterias}>Inscribirse</button>
        </div>
      </form>

      <div className="materias-inscriptas">
        <table>
          <thead>
            <tr>
              <th>Carrera</th>

              <th>Materia Inscrita</th>

              <th>Semestre Materia</th>
            </tr>
          </thead>
          <tbody>
            {Inscripciones.length > 0 &&
              Inscripciones.map((itemIns, key) => {
                return (
                  <tr key={key}>
                    <td>{itemIns.Carrera}</td>
                    <td>{itemIns.Materia}</td>
                    <td>{itemIns.Semestre}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default InputMatricula;
