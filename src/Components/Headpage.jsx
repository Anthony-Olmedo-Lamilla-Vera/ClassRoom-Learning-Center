import React from "react";
import { Helmet } from "react-helmet";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Headpage({ children, titulo = "", descripcion = "" }) {
  const navig = useNavigate();
  return (
    <React.Fragment>
      <Helmet>
        <title>{titulo} | Center Learning </title>
        <meta name="description" content={descripcion} />
      </Helmet>
      <div className="btn-left-nav">
        <button onClick={() => navig(-1)}>
          <BsArrowLeft size={40} />
        </button>
      </div>
      {children}
    </React.Fragment>
  );
}

export default Headpage;
