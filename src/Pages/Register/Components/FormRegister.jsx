import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../../Hooks/useInput";
import axios from "axios";
import ErrorsGroup from "./InputGroup";
import ClipLoader from "react-spinners/ClipLoader";
import { URLGET, URLPOST } from "../../Variables";

function FormRegister() {
  const InputNombre = useInput();
  const InputEmail = useInput();
  const InputContraseña = useInput();
  const InputCategoria = useInput();
  const InputCarrera = useInput();

  const [Carreras, setCarreras] = useState([]);
  const [Errores, setErrores] = useState([]);
  const [Loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  async function GetCarreras() {
    await axios
      .get(URLGET + "carreras")
      .then((res) => {
        setCarreras(res.data.modeloCarreras);

        console.log(Carreras);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    GetCarreras();
  }, []);

  async function FuncCreateUser(e) {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(
        URLPOST + "create-user",
        {
          email: InputEmail.Input,
          contraseña: InputContraseña.Input,
          nombre: InputNombre.Input,
          categoria: InputCategoria.Input,
          carrera: InputCarrera.Input,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        Navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrores(err.response.data);

        console.log(Errores);
        console.log(err.response.data);
      });
  }

  return (
    <div className="Register">
      {Loading && (
        <div className="spinnerLoad">
          <ClipLoader loading={Loading} />
        </div>
      )}
      <div className="Login-cont">
        <form className="login-Form">
          <h4>Registrarse</h4>
          {Errores.length > 0 && <ErrorsGroup errors={Errores} />}
          <input
            value={InputNombre.Input}
            onChange={InputNombre.targetInput}
            type="text"
            placeholder=" Ingrese su Nombre de usuario "
            required
          />
          <input
            type="email"
            placeholder=" Ingrese su Email "
            value={InputEmail.Input}
            required
            onChange={InputEmail.targetInput}
          />
          <input
            type="password"
            placeholder="Ingrese su Contraseña"
            value={InputContraseña.Input}
            required
            onChange={InputContraseña.targetInput}
          />

          <div className="select-user">
            <label>Tipo de Usuario</label>
            <select required onChange={InputCategoria.targetInput}>
              <option value="">Seleccione un tipo </option>
              <option value="Estudiante">Estudiante</option>
              <option value="Profesor">Profesor</option>
            </select>
          </div>
          <div className="select-user">
            <label htmlFor="">Carrera</label>
            <select required onChange={InputCarrera.targetInput}>
              <option value="">Elija una Carrera</option>
              {Carreras.length > 0 &&
                Carreras.map((itemcarrera) => {
                  console.log(InputCarrera.Input);
                  return (
                    <option value={itemcarrera._id}>
                      {itemcarrera.NombreCarrera}
                    </option>
                  );
                })}
            </select>
          </div>

          <button onClick={FuncCreateUser}>Registro</button>
          <div className="link-nouser">
            <Link to="/login">Ya tienes un Usuario ? </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRegister;
