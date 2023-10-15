import React from "react";
import "../../styles/index.css";
//components
import { FormReservation } from "../component/formReservation";
import { Schedule } from "../component/schedule";

export const Reservation = () => {
  return (
    <div className="container-fluid landing-container text-center mt-5">
        <div className="row">
            <div className="col-sm-12 col-md-6 contact-us p-5">
                <FormReservation/>
            </div>
            
            <div className="col-sm-12 col-md-6 contact-us p-5">
                <Schedule/>
            </div>
        </div>
    </div>
  );
};
