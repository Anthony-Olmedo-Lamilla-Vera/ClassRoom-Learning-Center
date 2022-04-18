import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-header">
        <img
          src="https://campusvirtual2.ug.edu.ec/pluginfile.php/1/core_admin/logocompact/300x300/1648243766/icono_Image.jpg"
          alt=""
        />
        <h1>Center Learning</h1>
      </div>
      <div className="footer-contactos">
        <h2>Contactos</h2>
        <nav>
          <li>
            <a href="">Facebook</a>
          </li>
          <li>
            <a href="">Instagram</a>
          </li>
          <li>
            <a href="">LinkedIn</a>
          </li>
          <li>
            <a href="">Twitter</a>
          </li>
        </nav>
      </div>
      <div className="footer-ubicacion">
        <h2>Ubicacion</h2>
        <p>AV 95, MARIA MARTYA </p>
        <p>calle 23</p>
      </div>
      <div className="footer-Desarrollo">
        <h2>Desarrollado por </h2>
        <a href="">
          <img
            src="https://img.freepik.com/psd-gratis/maqueta-logo-pared-gris_35913-2122.jpg"
            alt=""
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
