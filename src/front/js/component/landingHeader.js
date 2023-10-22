import React from 'react';
import "../../styles/landingPage.css";

//images
import icoPlatos from "../../img/icoPlatos.png";

export const LandingHeader = () => {
  return (
    <header className="bg-pink text-white text-center py-5">
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center mx-auto">
          <h1 className="display-1"> Comer </h1>
          <img src={icoPlatos}alt="Logo"width="110"height="110"className="d-inline-block p-2"/>
          <h1 className="display-1"> Comida </h1>
        </div>
        <p className="lead">Bienvenido a nuestra cocina, donde cada plato es una experiencia única de sabor y frescura. <br/> 
          Descubre una nueva forma de disfrutar la comida.</p>
      </div>
    </header>
  );
}