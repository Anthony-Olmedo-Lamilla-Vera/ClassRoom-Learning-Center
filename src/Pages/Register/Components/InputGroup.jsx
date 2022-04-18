import React from "react";

function ErrorsGroup({ errors = [] }) {
  return (
    <div className="Errors-group">
      <div className="msg-error">
        {errors.length > 0 &&
          errors.map((element) => {
            console.log(element);
            return (
              <p>
                <strong>{element.param}</strong> {element.msg}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default ErrorsGroup;
