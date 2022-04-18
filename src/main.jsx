import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ContextUser from "./Hooks/ContextUser";

ReactDOM.render(
  <React.StrictMode>
    <ContextUser>
      <App />
    </ContextUser>
  </React.StrictMode>,
  document.getElementById("root")
);
