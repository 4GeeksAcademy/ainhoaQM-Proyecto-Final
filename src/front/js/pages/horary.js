import React from "react";
import "../../styles/index.css";
//components
import { Schedule } from "../component/schedule";
//images
import ComerComida from '../../img/ComerComida.jpg';


export const Horary = () => {
  return (
    <div className="container-fluid body text-center mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 contact-us pt-0 p-5">
            <h1 className="h1 title-section display-4">Horario</h1>
            <Schedule />
          </div>
          <div className="col-sm-12 col-md-6 pt-0 p-5">
            <div className="image-container">
              <img src={ComerComida} alt="Imagen logo" className="image"/>
            </div>
          </div>
        </div>
    </div>
  );
};
