import React from 'react';
import "../../styles/landingPage.css";

//images
import iconPlatos from "../../img/iconPlatos.png";

export const LandingHeader = () => {
  return (
    <header className="bg-pink text-white text-center py-5">
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center mx-auto">
          <h1 className="display-1"> Comer </h1>
          <img src={iconPlatos}alt="Logo"width="100"height="80"className="d-inline-block"/>
          <h1 className="display-1"> Comida </h1>
        </div>
        <p className="lead">Bienvenido a nuestra cocina, donde cada plato es una experiencia única de sabor y frescura. <br/> 
          Descubre una nueva forma de disfrutar la comida.</p>
      </div>
    </header>
  );
}