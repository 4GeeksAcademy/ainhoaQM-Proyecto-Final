import React from "react";
import "../../styles/index.css";

//icons
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { TbChevronsLeft } from "react-icons/tb";
import { TbChevronsRight } from "react-icons/tb";

export const Footer = () => (
    <footer className="footer body mt-auto py-3 text-center">
        <h1 className="h1 footer-title"> Comer Comida</h1>
        <h2 className="h2 pb-3"> <TbChevronsLeft />Para Los Que Disfrutan Del Buen Comer<TbChevronsRight /></h2>
        <h3 className="phrase-icon">¡Síguenos!</h3>
        <div>
            <a href="https://www.instagram.com/tucuentadeinstagram" target="_blank" rel="noreferrer" className="social-icon">
                <SlSocialInstagram />
            </a>
			<a href="https://www.facebook.com/tucuentadefacebook" target="_blank" rel="noreferrer" className="social-icon">
                <SlSocialFacebook />
            </a>
            <a href="https://twitter.com/tucuentadetwitter" target="_blank" rel="noreferrer" className="social-icon">
                <SlSocialTwitter />
            </a>
        </div>
        <p className="pt-3"> 
            <span className="icon-copyright">
                <AiOutlineCopyrightCircle />
            </span>
            2023 Comer Comida - All Rights Reserved 
            <br />
            Web and Menu Designs by Ainhoa Quesada 
            <a href="https://github.com/AinhoaQM" target="_blank" rel="noreferrer" className="social-icon-g">
             <SlSocialGithub />
            </a>
        </p>
    </footer>
);

