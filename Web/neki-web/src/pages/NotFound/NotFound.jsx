import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Style.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <img src={logo} alt="" />
      <h1>Página não encontrada!</h1>
      <Link to={"/"}>
        <button>VOLTAR</button>
      </Link>
    </div>
  );
};

export default NotFound;
