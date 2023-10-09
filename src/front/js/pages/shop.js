import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/index.css";

//components
import { WelcomeMessage } from "../component/welcomeMessage";
import { FirstDrinks } from "../component/firstDrinks";
import { Navbar } from "../component/navbar";

export const Shop = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  console.log("Rendering Shop. isAuthenticated:", store.isAuthenticated);
  return (
    <>
    {store.isAuthenticated && <Navbar />}
    <div className="container body">
      {store.isAuthenticated && (
        <>
          <WelcomeMessage userName={store.userName} />
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Inicio</a></li>
          <li className="breadcrumb-item active" aria-current="page">Tienda</li>
        </ol>
      </nav>
      <section className="first-products">
          <div className="starters mt-4">
              <div className="d-flex justify-content-between align-items-center">
                  <h2 className="subtitle display-6"> Entrantes </h2>
                  <Link to="/starters">Ver más</Link>
              </div>
              <hr className="my-1" />
          </div>
          <div className="dishes mt-4">
              <div className="d-flex justify-content-between align-items-center">
                  <h2 className="subtitle display-6"> Platos </h2>
                  <Link to="/dishes">Ver más</Link>
              </div>
              <hr className="my-1" />
          </div>
          <div className="drinks mt-4">
              <div className="d-flex justify-content-between align-items-center">
                  <h2 className="subtitle display-6"> Bebidas </h2>
                  <Link to="/drinks">Ver más</Link>
              </div>
              <hr className="my-1 pb-3" />
              <FirstDrinks/>
          </div>
          <div className="desserts mt-4">
              <div className="d-flex justify-content-between align-items-center">
                  <h2 className="subtitle display-6"> Postres </h2>
                  <Link to="/desserts">Ver más</Link>
              </div>
              <hr className="my-1" />
          </div>
      </section>
    </div>
    </>
  );
};
