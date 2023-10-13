import React, { useState, useEffect } from 'react';
import "../../styles/landingPage.css";

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
        <div className={`d-grid col-6 mx-auto scroll-up ${showScrollButton ? '' : 'd-none'}`}>
            <button className="btn btn-secondary btn-lg" onClick={scrollToTop}>Ir Arriba</button>
        </div>
        
    );
};
