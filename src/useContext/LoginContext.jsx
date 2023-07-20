import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LoginInfo = createContext();

const LoginContext = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || false
  );
  const state = {
    auth,
    setAuth,
  };
  return <LoginInfo.Provider value={state}>{children}</LoginInfo.Provider>;
};

LoginContext.propTypes={
  children:PropTypes.element
}

export default LoginContext;
