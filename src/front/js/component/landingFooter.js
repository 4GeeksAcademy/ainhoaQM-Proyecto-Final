import React, { useState, useEffect } from 'react';
import "../../styles/landingPage.css";

//icons
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { TbChevronsLeft } from "react-icons/tb";
import { TbChevronsRight } from "react-icons/tb";



export const LandingFooter = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    };
    useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) {
        setShowScrollButton(true);
        } else {
        setShowScrollButton(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    return(
        <>
        <div className={`d-grid col-6 mb-5 mx-auto scroll-up ${showScrollButton ? '' : 'd-none'}`}>
            <button className="btn btn-secondary btn-lg" onClick={scrollToTop}>Ir Arriba</button>
        </div>

        <div className="mt-4 py-3 text-center LP-footer">
            <h1 className="h1 footer-title"> Comer Comida</h1>
            <h2 className="h2 pb-3"> <TbChevronsLeft />Para Los Que Disfrutan Del Buen Comer<TbChevronsRight /></h2>
            <h3 className="LP-phrase-icon">¡Síguenos!</h3>
            <div>
                <a href="https://www.instagram.com/instagram" target="_blank" rel="noreferrer" className="LP-social-icon">
                    <SlSocialInstagram />
                </a>
                <a href="https://www.facebook.com/facebook" target="_blank" rel="noreferrer" className="LP-social-icon">
                    <SlSocialFacebook />
                </a>
                <a href="https://twitter.com/twitter" target="_blank" rel="noreferrer" className="LP-social-icon">
                    <SlSocialTwitter />
                </a>
            </div>
            <p className="pt-4"> 
                <span className="LP-icon-copyright">
                    <AiOutlineCopyrightCircle />
                </span>
                2023 Comer Comida - All Rights Reserved 
                <br />
                Web and Menu Designs by Ainhoa Quesada 
                <a href="https://github.com/AinhoaQM" target="_blank" rel="noreferrer" className="LP-social-icon-g">
                <SlSocialGithub />
                </a>
            </p>
        </div>
        </>
    );
};
