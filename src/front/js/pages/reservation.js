import React from "react";
import "../../styles/index.css";

//components
import { FormReservation } from "../component/formReservation";
import { Schedule } from "../component/schedule";

//images
import ComerComida from "../../img/ComerComida.jpg";

export const Reservation = () => {
  return (
    <div className="container-fluid landing-container text-center mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 pt-0 p-4">
            <div className="mb-4 pb-4">
              <img src={ComerComida} alt="Imagen Logo" className="image" />
            </div>
              <Schedule/>
          </div>
          <div className="col-sm-12 col-md-6 contact-us pt-0 p-4">
            <FormReservation/>
          </div>
        </div>
    </div>
  );
};