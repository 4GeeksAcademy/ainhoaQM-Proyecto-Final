import React from "react";
import "../../styles/index.css";

//images
import abstract from '../../img/abstract.jpg';

export const WIP = () => {
    return (
        <div className="container-fluid wip-container" style={{backgroundImage: `url(${abstract})`}}>
            <div className="row justify-content-center align-items-center" style={{minHeight: "100vh"}}>
                <div className="col-12 text-center">
                    <h1 className="h1 wip-text">
                        Sorry! <br/> This page is work in progress
                    </h1>
                </div>
            </div>
        </div>
    );
};
