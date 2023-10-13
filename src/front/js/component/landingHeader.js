import React from 'react';
import "../../styles/landingPage.css";

export const LandingHeader = () => {
  return (
    <header className="bg-pink text-white text-center py-5">
      <div className="container-fluid">
        <h1 className="display-1 title-header">Comer Comida</h1>
        <p className="lead">Bienvenido a nuestra cocina, donde cada plato es una experiencia única de sabor y frescura. <br/> 
            Descubre una nueva forma de disfrutar la comida.</p>
      </div>
    </header>
  );
}
