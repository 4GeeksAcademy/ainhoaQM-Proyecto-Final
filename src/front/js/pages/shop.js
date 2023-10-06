import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import { WelcomeMessage } from "../component/welcomeMessage";
import { FirstDrinks } from "../component/firstDrinks";
import { CartButton } from "../component/cartButton";

export const Shop = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <div className="container">
      {store.isAuthenticated && (
        <>
          <CartButton />
          <WelcomeMessage userName={store.userName} />
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
      <section className="components-shop">
        <FirstDrinks />
        <Link to="/drinks" className="btn btn-primary">
            Ir a Bebidas
        </Link>
      </section>
    </div>
  );
};
