import React, { useState, useEffect, useContext } from "react";
import "../../styles/index.css";

export const Breadcrumb = () => {
    return (
        <nav style={{'--bs-breadcrumb-divider': '>'}} aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Inicio</a></li>
                <li className="breadcrumb-item active" aria-current="page">Tienda</li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
