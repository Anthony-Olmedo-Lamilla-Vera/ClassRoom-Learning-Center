import React from "react";
import { Link } from "react-router-dom";

function IndexPanel() {
  return (
    <main>
      <h1>Panel de Control - Docentes</h1>

      <table>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Nivel</th>
            <th>Curso</th>
            <th>Alumnos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ingles</td>
            <td>Cienccias</td>
            <td>Computacion</td>
            <td>Lenguaje</td>
            <td>
              <Link to="/"> Revisar Materias</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default IndexPanel;
