import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./index.scss";

const Navbar = () => {
  const [screeSelected, setScreenSelected] = useState(
    parseInt(localStorage.getItem("page")) || 0
  );
  return (
    <nav className="nav-container">
      <div className="nav-container-list">
        <Link
          onClick={() => {
            localStorage.setItem("page", 0);
            setScreenSelected(0);
          }}
          className={classNames("nav-container-list-item", {
            "nav-container-list-item--focus": screeSelected === 0,
          })}
          to="/"
        >
          Crear nueva lista de tareas
        </Link>
        <Link
          onClick={() => {
            setScreenSelected(1);
            localStorage.setItem("page", 1);
          }}
          className={classNames("nav-container-list-item", {
            "nav-container-list-item--focus": screeSelected === 1,
          })}
          to="/about"
        >
          Ver listas existentes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
