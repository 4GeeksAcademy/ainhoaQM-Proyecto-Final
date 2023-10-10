import React from "react";
import { Link } from "react-router-dom";
import "../../styles/landingPage.css";
import { LandingNavbar } from "../component/landingNavbar";
import ComerComida from "../../img/ComerComida.jpg";

export const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <div className="container landing-container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <img src={ComerComida} alt="Comer Comida" className="landing-header-image mx-auto d-block" />
          </div>
          <div className="col-lg-12">
            <div className="landing-header-content text-center text-lg-start">
              <h1 className="landing-header-title">¡Ordena tu comida en línea!</h1>
              <h2 className="landing-header-description">Explora nuestra deliciosa selección de platos</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


