import React from "react";
import "../styling/Login.scss";
import { Link } from "react-router-dom";
import fb_logo from "../media/fb.png";

function Login() {
  return (
    <div className="login__container">
      <Link to="http://localhost:8080/login/auth/facebook">
        <img src={fb_logo} alt="Entrar com Facebook" />
      </Link>
    </div>
  );
}

export default Login;
