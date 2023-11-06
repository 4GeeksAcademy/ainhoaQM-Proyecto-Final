import React from 'react';
import { useNavigate  } from "react-router-dom";
import "../../styles/index.css";

//images
import iconPlatos from "../../img/iconPlatos.png";

//icons
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { TbChevronsLeft } from "react-icons/tb";
import { TbChevronsRight } from "react-icons/tb";

export const Footer = () => {
    const navigate = useNavigate();
    const redirectToHome = () => { navigate("/");}
    const scrollToTop = ()  => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const hideButton = location.pathname.startsWith("/ticket/") || location.pathname.startsWith("/payment/")  || location.pathname === "/contact" || location.pathname === "/our-centers" || location.pathname === "/reserve" || location.pathname === "/order";

    return(
        <footer className="footer mt-auto  text-center">
            {!hideButton && (
                <div className="d-grid col-6 pt-3 mt-1 mb-5 mx-auto scroll-up">
                    <button className="btn btn-secondary btn-lg" onClick={scrollToTop}>Ir Arriba</button>
                </div>
            )}
            <div className="footer-color">
                <div className="footer-color heading pointer" onClick={redirectToHome}>
                    <div className="container-fluid">
                        <div className="d-flex justify-content-center align-items-center mx-auto">
                            <span className="heading-title">Comer</span>
                            <img src={iconPlatos} alt="Logo" width="100" height="80" className="d-inline-block"/>
                            <span className="heading-title">Comida</span>
                        </div>
                    </div>
                </div>
                <h3 className="h3 pb-3"> <TbChevronsLeft />Para Los Que Disfrutan Del Buen Comer<TbChevronsRight /></h3>
                <h3 className="phrase-icon">¡Síguenos!</h3>
                <div>
                    <a href="https://www.instagram.com/tucuentadeinstagram" target="_blank" rel="noreferrer" className="social-icon-redes">
                        <SlSocialInstagram />
                    </a>
                    <a href="https://www.facebook.com/tucuentadefacebook" target="_blank" rel="noreferrer" className="social-icon-redes">
                        <SlSocialFacebook />
                    </a>
                    <a href="https://twitter.com/tucuentadetwitter" target="_blank" rel="noreferrer" className="social-icon-redes">
                        <SlSocialTwitter />
                    </a>
                </div>
                <p className="py-3"> 
                    <span className="icon-copyright">
                        <AiOutlineCopyrightCircle />
                    </span>
                    2023 Comer Comida - All Rights Reserved 
                    <br />
                    Web Designs by {" "}
                    <a href="https://github.com/AinhoaQM" target="_blank" rel="noreferrer" className="link-decoration">
                        Ainhoa Quesada<SlSocialGithub className="social-icon-g"/>
                    </a>
                </p>
            </div>
        </footer> 
    );
};