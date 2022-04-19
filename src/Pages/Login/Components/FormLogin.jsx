import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contextUser } from "../../../Hooks/ContextUser";
import BounceLoader from "react-spinners/BounceLoader";
import { useInput } from "../../../Hooks/useInput";
import ErrorsGroup from "../../Register/Components/InputGroup";
import { URLPOST } from "../../Variables";

function FormLogin() {
  const InputEmail = useInput();
  const InputPassword = useInput();
  const [Errores, setErrores] = useState([]);
  const Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { user, setUser } = useContext(contextUser);

  const Funclogin = async (e) => {
    setLoading(true);

    e.preventDefault();
    await axios
      .post(URLPOST + "login-user", {
        email: InputEmail.Input,
        contraseña: InputPassword.Input,
      })
      .then((respuesta) => {
        window.localStorage.setItem(
          "tokenUsuario",
          JSON.stringify(respuesta.data)
        );
        setUser(true);
        Navigate("/");

        console.log(respuesta.data);
      })
      .catch((errors) => {
        setLoading(false);
        console.log(errors.response);
        setUser(false);
        setErrores(errors.response.data);
      });
  };

  return (
    <div className="Register">
      {Loading && (
        <div className="spinnerLoad">
          <BounceLoader loading={Loading} />
        </div>
      )}
      <div className="Login-cont">
        <form action="" className="login-Form">
          <h4>Iniciar Sesion</h4>
          {Errores.length > 0 && <ErrorsGroup errors={Errores} />}
          <input
            type="email"
            value={InputEmail.Input}
            placeholder=" Ingrese su Email "
            onChange={InputEmail.targetInput}
            required
          />
          <input
            type="password"
            value={InputPassword.Input}
            placeholder="Ingrese su Contraseña"
            onChange={InputPassword.targetInput}
            required
          />
          <div></div>
          <button onClick={Funclogin}>Iniciar Sesion</button>
          <div className="link-nouser">
            <Link to="/register">No tienes un Usuario ? </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
