import React from "react";
import "../../styles/index.css";
//components
import { FormContact } from "../component/formContact";
//images
import cucharas from '../../img/cucharas.jpg';
import ComerComida from '../../img/ComerComida.jpg';


export const Contact = () => {
  return (
    <div className="container-fluid body text-center mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 contact-us pt-0 p-5">
            <FormContact />
          </div>
          <div className="col-sm-12 col-md-6 pt-0 p-5">
            <div className="image-container">
              <img src={ComerComida} alt="Imagen logo" className="image"/>
            </div>
            <div className="image-container">
              <img src={cucharas} alt="Imagen cucharas" className="image"/>
            </div>
          </div>
        </div>
    </div>
  );
};
