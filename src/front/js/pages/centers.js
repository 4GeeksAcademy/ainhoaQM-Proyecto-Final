import React from "react";
import "../../styles/index.css";
//components
import { Schedule } from "../component/schedule";
import { MapBCN }  from "../component/mapBCN";
import { MapMadrid }  from "../component/mapMadrid";

//images
import ComerComida from '../../img/ComerComida.jpg';

export const Centers = () => {
  return (
    <div className="container-fluid body text-center">
      <h1 className="h1 title-section display-4 text-center"> Encuéntranos en </h1>
      <div className="row d-flex justify-content-center px-2">
        <div className="col-md-6 pb-3">
          <h1 className="subtitle pb-2"> Barcelona </h1>
          <p className="fs-4 pb-1"> Calle Falsa, 123 CP: 00000 </p>
          <div className="container-map">
            <MapBCN/>
          </div>
        </div>
        <div className="col-md-6 pb-3">
          <h1 className="subtitle pb-2"> Madrid </h1>
          <p className="fs-4 pb-1"> Calle Ficticia, 456 CP: 00000 </p>
          <div className="container-map">
            <MapMadrid/>
          </div>
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-sm-12 col-md-6 contact-usd-flex flex-column justify-content-center align-items-center">
          <h1 className="h1 title-section display-4"> Horario </h1>
          <Schedule />
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="image-container">
            <img src={ComerComida} alt="Imagen logo" className="image"/>
          </div>
        </div>
      </div>
    </div>
  );
};
