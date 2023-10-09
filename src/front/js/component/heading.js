import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

// img
import icoPlatos from "../../img/icoPlatos.png";

export const Heading = () => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate("/");
    }

    return (
            <div className="heading" onClick={redirectToHome}>
                <div className="container-fluid p-2">
                    <div className="d-flex justify-content-center align-items-center text-decoration-none mx-auto">
                        <span className="heading-title">Comer</span>
                        <img
                            src={icoPlatos}
                            alt="Logo"
                            width="100"
                            height="80"
                            className="d-inline-block p-2"
                        />
                        <span className="heading-title">Comida</span>
                    </div>
                </div>
            </div>

    );
};
