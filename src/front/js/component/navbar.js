import React, { useContext} from "react";
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
          <Link to="/shop" className="nav-link">
            <span className="material-symbols-outlined pe-1">menu_book</span> Menú
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/starters" className="nav-link">
            <span className="material-symbols-outlined pe-1">tapas</span> Entrantes
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/dishes" className="nav-link">
            <span className="material-symbols-outlined pe-1"> dinner_dining </span> Platos
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/drinks" className="nav-link">
            <span className="material-symbols-outlined pe-1">water_full</span> Bebidas
          </Link>
        </li>
        <li className="nav-item pe-3">
          <Link to="/desserts" className="nav-link">
            <span className="material-symbols-outlined pe-1"> bakery_dining </span> Postres
          </Link>
        </li>
      </ul>
      {store.isAuthenticated ? (
        <div className="dropdown p-1">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            {`¡Hola, ${userName || store.userName}!`}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to="/cart" className="dropdown-item"> Mi Cesta </Link>
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
              <Link to="/our-centers" className="dropdown-item"> Nuestros Centros</Link>
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
      ) : (
        <Link to="/auth-page" className="btn" id="dropdownMenuButton"> {`¡Hola! Aún no has iniciado sesión`} </Link>
      )}
      <div className="pe-3">
        <CartButton/>
      </div>
    </nav>
  );
};