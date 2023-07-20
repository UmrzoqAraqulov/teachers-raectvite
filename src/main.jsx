import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "antd/dist/reset.css";
import TeacherContext from "./useContext/TeacherContext.jsx";
import StudentContext from "./useContext/StudentContext.jsx";
import LoginContext from "./useContext/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TeacherContext>
    <LoginContext>
      <StudentContext>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StudentContext>
    </LoginContext>
  </TeacherContext>
);
