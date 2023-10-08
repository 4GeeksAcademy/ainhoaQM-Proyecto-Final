import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    Comer Comida
                </a>
            </div>
        </nav>
    );
};
