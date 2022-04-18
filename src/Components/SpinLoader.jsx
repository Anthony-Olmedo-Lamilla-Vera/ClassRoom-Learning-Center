import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

function SpinLoader({ Cargado }) {
  return (
    <React.Fragment>
      {Cargado && (
        <div className="spinnerLoad">
          <BeatLoader color="#fff" size={50} loading={Cargado} />
        </div>
      )}
    </React.Fragment>
  );
}

export default SpinLoader;
