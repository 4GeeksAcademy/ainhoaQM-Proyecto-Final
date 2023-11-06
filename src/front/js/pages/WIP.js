import React from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "../../styles/index.css";

//images
import abstract from '../../img/abstract.jpg';

export const WIP = () => {
    const navigate = useNavigate(); 

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className="wip-container" style={{backgroundImage: `url(${abstract})`}}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 text-center">
                    <h1 className="h1 display-1 wip-text">
                        ¡Lo siento! <br/> Esta página esta en proceso de creación.
                    </h1>
                </div>
                <Link to="/" className="m-3 btn btn-secondary col-4">Ir a la Página Principal</Link>
                <button className="m-3 btn btn-secondary col-4 mt-3 p-2" onClick={goBack}>Ir Atrás</button>
            </div>
        </div>
    );
};
