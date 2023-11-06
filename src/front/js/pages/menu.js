import React, { useState,  useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

//components
import { FormMenu } from "../component/formMenu";
import { FirstStarters } from "../component/firstStarters";
import { FirstDishes } from "../component/firstDishes";
import { FirstDrinks } from "../component/firstDrinks";
import { FirstDesserts } from "../component/firstDesserts";

//icons
import { PiWarningCircleDuotone } from "react-icons/pi";

export const Menu = () => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const loginAlertRef = useRef(null);

  useEffect(() => {
    if (showLoginMessage) {
      window.scrollTo({ top: 490, behavior: 'smooth' });
    }
  }, [showLoginMessage]);

  return (
    <>
      <div className="body container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/"> Inicio </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page"> Carta </li>
          </ol>
        </nav>
        <div className="jumbotron-category p-2 mb-4 rounded-3">
          <div className="container-fluid py-5">
            <h1 className="h1 display-3 text-center"> Nuestra Carta </h1>
          </div>
        </div>
        <h1 className="h1 display-6 text-center subtitle">
          ¡Selecciona toda una variedad entre nuestros productos o pide nuestro menu individual por solo 12€!
        </h1>
        <p className="subtitle fs-3 text-center py-3">
          Nuestro menu incluye, un entrante, un plato principal, una bebida y un postre.
        </p>
        {showLoginMessage && (
          <div className="alert alert-warning d-flex justify-content-center align-items-center" role="alert">
            <div className="icon-warning"><PiWarningCircleDuotone /></div>
            <div>
              Por favor, <a href="/auth-page">inicia sesión</a> o{" "}
              <a href="/signup">regístrate</a> para poder añadir productos al carrito
            </div>
          </div>
        )}
        <section className="offer-menu">
          <h2 className="subtitle display-6"> Menu </h2>
          <hr className="my-1" />
          <FormMenu setShowLoginMessage={setShowLoginMessage}/>
        </section>
        <section className="first-products">
          <div className="starters mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Entrantes </h2>
              <Link to="/starters"> Ver más </Link>
            </div>
            <hr className="my-1" />
            <FirstStarters setShowLoginMessage={setShowLoginMessage} />
          </div>
          <div className="dishes mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Platos </h2>
              <Link to="/dishes"> Ver más </Link>
            </div>
            <hr className="my-1" />
            <FirstDishes setShowLoginMessage={setShowLoginMessage} />
          </div>
          <div className="drinks mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Bebidas </h2>
              <Link to="/drinks"> Ver más </Link>
            </div>
            <hr className="my-1 pb-3" />
            <FirstDrinks setShowLoginMessage={setShowLoginMessage} />
          </div>
          <div className="desserts mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Postres </h2>
              <Link to="/desserts"> Ver más </Link>
            </div>
            <hr className="my-1" />
            <FirstDesserts setShowLoginMessage={setShowLoginMessage} />
          </div>
        </section>
      </div>
    </>
  );
};