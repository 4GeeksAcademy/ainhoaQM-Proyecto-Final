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
            <div className="col-sm-12 col-md-6 contact-us pt-0 p-5">
                <FormReservation/>
            </div>
            
            <div className="col-sm-12 col-md-6 contact-us pt-0  p-5">
              <div style={{ textAlign: 'center', marginTop: '10px',  marginBottom: '10px' }}>
                <img src={ComerComida} alt="Imagen Logo" style={{ width: '100%', height: 'auto' }} />
              </div>
                <Schedule/>
            </div>
        </div>
    </div>
  );
};
