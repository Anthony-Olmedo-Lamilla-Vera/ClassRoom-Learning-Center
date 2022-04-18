import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { URLGET, URLPOST } from "../Pages/Variables";

export const contextUser = React.createContext();

function ContextUser({ children }) {
  const [user, setUser] = useState(false);
  const [DatosUser, setDatosUser] = useState([]);
  const parseJson = JSON.parse(window.localStorage.getItem("tokenUsuario"));

  useEffect(() => {
    const GetUser = async () => {
      await axios
        .post(URLPOST + "userToken", {
          token: parseJson.tokenUser,
        })
        .then((data) => {
          setUser(true);
        })
        .catch((err) => {
          console.log(err.respon);
          setUser(false);
        });
    };
    console.log(user);
    GetUser();
    GetItemUsuarios();
  }, []);

  const GetItemUsuarios = async () => {
    await axios
      .get(URLGET + "User/" + parseJson.tokenUser)
      .then((resultado) => {
        setDatosUser(resultado.data);
      })
      .catch((error) => {
        console.log(error.response);
        setDatosUser(error.response);
      });
  };

  return (
    <contextUser.Provider value={{ DatosUser, user, setUser }}>
      {children}
    </contextUser.Provider>
  );
}

export default ContextUser;
