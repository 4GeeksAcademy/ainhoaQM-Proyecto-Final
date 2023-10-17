import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

//components
import { FormMenu } from "../component/formMenu";
import { FirstStarters } from "../component/firstStarters";
import { FirstDishes } from "../component/firstDishes";
import { FirstDrinks } from "../component/firstDrinks";
import { FirstDesserts } from "../component/firstDesserts";

export const Menu = () => {
  return (
    <>
      <div className="container body">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Inicio</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Carta
            </li>
          </ol>
        </nav>
        <section className="offer-menu">
          <h2 className="subtitle display-6"> Menu </h2>
          <hr className="my-1" />
          <FormMenu />
        </section>
        <section className="first-products">
          <div className="starters mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Entrantes </h2>
              <Link to="/starters">Ver más</Link>
            </div>
            <hr className="my-1" />
            <FirstStarters />
          </div>
          <div className="dishes mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Platos </h2>
              <Link to="/dishes">Ver más</Link>
            </div>
            <hr className="my-1" />
            <FirstDishes />
          </div>
          <div className="drinks mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Bebidas </h2>
              <Link to="/drinks">Ver más</Link>
            </div>
            <hr className="my-1 pb-3" />
            <FirstDrinks />
          </div>
          <div className="desserts mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="subtitle display-6"> Postres </h2>
              <Link to="/desserts">Ver más</Link>
            </div>
            <hr className="my-1" />
            <FirstDesserts />
          </div>
        </section>
      </div>
    </>
  );
};
