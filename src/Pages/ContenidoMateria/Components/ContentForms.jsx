import React from "react";

function ContentForms({ children, eventclick }) {
  return (
    <React.Fragment>
      {children}
      <div className="button-inscr">
        <button onClick={eventclick}>Subir Item</button>
      </div>
    </React.Fragment>
  );
}

export default ContentForms;
