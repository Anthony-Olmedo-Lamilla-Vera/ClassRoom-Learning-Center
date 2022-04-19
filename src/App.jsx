import { Suspense, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import IndexContenido from "./Pages/ContenidoMateria/IndexContenido";
import IndexExam from "./Pages/Examen/IndexExam";
import IndexHome from "./Pages/Home/IndexHome";
import IndexTask from "./Pages/Task/IndexTask";
import "./App.css";
import IndexLogin from "./Pages/Login/IndexLogin";
import Footer from "./Components/Footer";
import Headers from "./Components/Headers";
import IndexRegister from "./Pages/Register/IndexRegister";
import { contextUser } from "./Hooks/ContextUser";
import IndexMatricula from "./Pages/Matricula/IndexMatricula";
import IndexPanel from "./Pages/PanelControl/IndexPanel";
import IndexCheckTask from "./Pages/CheckTask/IndexCheckTask";
import BeatLoader from "react-spinners/BeatLoader";
import { Modal } from "@material-ui/core";

function App() {
  const { user, DatosUser } = useContext(contextUser);
  return (
    <Suspense fallback={<BeatLoader />}>
      <BrowserRouter>
        {user && <Headers />}

        <Routes>
          <Route
            path="/ClassRoom-Learning-Center"
            element={user ? <IndexHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/Materia/:idmateria"
            element={user ? <IndexContenido /> : <Navigate to="/login" />}
          />
          <Route
            path="/task/:idtarea"
            element={user ? <IndexTask /> : <Navigate to="/login" />}
          />
          <Route path="/Exam/:NameMateria/:idExamen" element={IndexExam} />

          <Route
            path="/login"
            element={!user ? <IndexLogin /> : <Navigate to="/" />}
          />

          <Route
            path="/register"
            element={!user ? <IndexRegister /> : <Navigate to="/" />}
          />
          <Route
            path="/inscribir-materias"
            element={user ? <IndexMatricula /> : <Navigate to="/login" />}
          />
          <Route
            path="/panel-control"
            element={
              Object.keys(DatosUser).length > 0 &&
              DatosUser.usuario.Categoria === "Profesor" ? (
                <IndexPanel />
              ) : (
                <Navigate to="/Error/" />
              )
            }
          />
          <Route
            path="/check-tasks/:idtarea"
            element={user ? <IndexCheckTask /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
