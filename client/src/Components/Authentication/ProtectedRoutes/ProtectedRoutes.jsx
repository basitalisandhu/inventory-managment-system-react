// ProtectedRoute.js
import React from "react";
import { Route, Redirect, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : navigate("/login")
      }
    />
  );
};

export default ProtectedRoute;
