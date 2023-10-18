import React from "react";
import "../../styles/index.css";

//images
import abstract from '../../img/abstract.jpg';

export const NotFound = () => {
    return(
        <div className="container-fluid wip-container" style={{backgroundImage: `url(${abstract})`}}>
            <div className="row justify-content-center align-items-center" style={{minHeight: "100vh"}}>
                <div className="col-12 text-center">
                    <h1 className="h1 display-1 wip-text">
                        ERROR 404  <br/> Page Not Found
                    </h1>
                </div>
            </div>
        </div>
    );
};

