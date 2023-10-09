import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

//componentes
import { CartButton } from "./cartButton";

export const Navbar = () => {
  return (
    <nav className="navbar sticky-top heading" data-bs-theme="dark">
      <ul className="navbar-nav d-flex flex-row justify-content-center align-items-center text-decoration-none">
        <li className="nav-item px-3">
          <Link to="/starters" className="nav-link fs-4">
            <span className="material-symbols-outlined pe-1">tapas</span>
            Entrantes
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/dishes" className="nav-link fs-4">
            <span className="material-symbols-outlined pe-1">dinner_dining</span>
            Platos
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/drinks" className="nav-link fs-4">
            <span className="material-symbols-outlined pe-1">water_full</span>
            Bebidas
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/desserts" className="nav-link fs-4">
            <span className="material-symbols-outlined pe-1">bakery_dining</span>
            Postres
          </Link>
        </li>
      </ul>
      <CartButton />
    </nav>
  );
};
