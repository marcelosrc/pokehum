import React from "react";
import "../styling/Login.scss";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login__container">
      <Link to="http://localhost:8080/login/auth/facebook">
        <h1>Entrar</h1>
      </Link>
    </div>
  );
}

export default Login;
