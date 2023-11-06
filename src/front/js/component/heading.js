import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

//images
import iconPlatos from "../../img/iconPlatos.png";

export const Heading = () => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate("/");
    }

    return (
        <div className="heading pointer" onClick={redirectToHome}>
            <div className="container-fluid p-2">
                <div className="d-flex justify-content-center align-items-center mx-auto">
                    <span className="heading-title">Comer</span>
                    <img src={iconPlatos} alt="Logo" width="100" height="80" className="d-inline-block"/>
                    <span className="heading-title">Comida</span>
                </div>
            </div>
        </div>
    );
};