import React from "react";
import "../../styles/index.css";
//components
import { FormContact } from "../component/formContact";
//images
import cucharas from '../../img/cucharas.jpg';


export const Contact = () => {
  return (
    <div className="container-fluid landing-container text-center mt-5">
        <div className="row">
            <div className="col-sm-12 col-md-6 contact-us pt-0 p-5">
                <FormContact />
            </div>
            <div className="col-sm-12 col-md-6 contact-us pt-0 p-5">
                
            </div>
        </div>
    </div>
  );
};
