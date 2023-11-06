import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/landingPage.css";

export const LandingNavbar = () => {
  const { store, actions } = useContext(Context);
  const userName = localStorage.getItem("userName");
  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-pink fixed-top">
      <div className="container">
        {store.isAuthenticated ? (
          <>
            <div className="ms-auto">
              <div className="dropdown">
                <button className="btn dropdown-toggle align-items-end justify-content-end ms-auto"
                  type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  {`¡Hola, ${userName}!`}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link to="/shop" className="dropdown-item"> Carta </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="dropdown-item">Mi Cesta </Link>
                  </li>
                  <li>
                    <Link to="/orders-history" className="dropdown-item"> Mis Pedidos </Link>
                  </li>
                  <li className="dropdown-divider"/>
                  <li className="nav-item pe-3">
                    <Link to="/" className="dropdown-item"> Inicio </Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link to="/contact" className="dropdown-item"> Contacto </Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link to="/our-centers" className="dropdown-item"> Nuestros Centros </Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link to="/reserve" className="dropdown-item"> Reservar </Link>
                  </li>
                  <li className="dropdown-divider"/>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}> Cerrar Sesión </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="navbar-text mx-auto justify-content-center align-items-center text-center">
            <Link to="/auth-page" className="text-white">Regístrate</Link>{" "} o {" "}
            <Link to="/auth-page" className="text-white">Inicia sesión</Link>{" "}
            con nosotros para poder hacer tu pedido online
          </div>
        )}
      </div>
    </nav>
  );
};