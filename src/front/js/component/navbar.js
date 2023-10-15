import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

//components
import { CartButton } from "./cartButton";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const userName = localStorage.getItem("userName");
  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="navbar sticky-top nav-color">
      <ul className="navbar-nav d-flex flex-row justify-content-center align-items-center text-decoration-none">
        <li className="nav-item px-3">
          <Link to="/starters" className="nav-link fs-4">
            <span className="material-symbols-outlined pe-1">tapas</span>
            Entrantes
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/dishes" className="nav-link fs-4">
            <span className="material-symbols-outlined pe-1">
              dinner_dining
            </span>
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
            <span className="material-symbols-outlined pe-1">
              bakery_dining
            </span>
            Postres
          </Link>
        </li>
      </ul>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {store.isAuthenticated
            ? `¡Hola, ${userName}!`
            : "¡Hola! Aún no has iniciado sesión"}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {store.isAuthenticated ? (
            <>
              <li className="nav-item pe-3">
                <Link to="/menu" className="dropdown-item">
                  Carta
                </Link>
              </li>
              <li>
                <Link to="/cart" className="dropdown-item">
                  Mi Cesta{" "}
                </Link>
              </li>
              <li>
                <Link to="/wip" className="dropdown-item">
                  {" "}
                  Mis Pedidos{" "}
                </Link>
              </li>
              <li className="dropdown-divider"></li>
              <li className="nav-item pe-3">
                <Link to="/" className="dropdown-item">
                  Inicio
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link to="/contact" className="dropdown-item">
                  Contacto
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link to="/schedule" className="dropdown-item">
                  Horario
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link to="/reserve" className="dropdown-item">
                  Reservar
                </Link>
              </li>
              <li className="dropdown-divider"></li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="dropdown-item">
                  {" "}
                  Inicia Sesión{" "}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="dropdown-item">
                  {" "}
                  Regístrate{" "}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <CartButton />
    </nav>
  );
};
