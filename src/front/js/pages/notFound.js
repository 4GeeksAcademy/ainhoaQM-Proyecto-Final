import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

//images
import abstract from '../../img/abstract.jpg';

export const NotFound = () => {
    useEffect(() => {
        const footer = document.querySelector(".footer");
        const navbar = document.querySelector(".navbar");
        const heading = document.querySelector(".heading");
        
        if (footer) {
            footer.style.display = "none";
        }
        if (navbar) {
            navbar.style.display = "none";
        }
        if (heading) {
            heading.style.display = "none";
        }

        return () => {
            if (footer) {
                footer.style.display = "block";
            }
            if (navbar) {
                navbar.style.display = "block";
            }
            if (heading) {
                heading.style.display = "block";
            }
        };
    }, []);

    return(
        <div className="body container-fluid wip-container" style={{backgroundImage: `url(${abstract})`}}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 text-center">
                    <h1 className="h1 display-1 wip-text">
                        ERROR 404  <br/> Page Not Found
                    </h1>
                    <Link to="/" className="m-3 btn btn-secondary col-8">Ir a la Página Principal</Link>
                </div>
            </div>
        </div>
    );
};

