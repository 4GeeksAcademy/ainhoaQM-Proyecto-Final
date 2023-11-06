import React, { useState } from "react";
import "../../styles/index.css";

//components
import { Heading } from "../component/heading";
import { FormLogin } from "../component/formLogin";
import { FormSignup } from "../component/formSignup";
import { FirebaseAuth } from "../component/firebaseAuth";

//images
import abstract from '../../img/abstract.jpg';

export const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleShowLogin = () => {
        setShowLogin(true);
    };

    const handleShowRegister = () => {
        setShowLogin(false);
    };

    return (
        <><Heading />
        <div className="body section background-abstract" style={{ backgroundImage: `url(${abstract})`}}>
            <FirebaseAuth />
            <div className="container">
                <div className="row text-center">
                    <div className="col-5 pb-1" id="divider">
                        <hr />
                    </div>
                    <div className="col-2 pb-1" id="text-divider"> O </div>
                    <div className="col-5 pb-1" id="divider">
                        <hr />
                    </div>
                </div>
            </div>
                <div className="col-md-6 rounded shadow bg-light mx-auto"> 
                    <div className="d-flex w-100">
                        <label htmlFor="tab1" className={`col-6 py-3 nav login-button  ${showLogin ? 'active' : ''}`} onClick={handleShowLogin}> Iniciar Sesión </label>
                        <label htmlFor="tab2" className={`col-6 py-3 nav register-button  ${!showLogin ? 'active' : ''}`} onClick={handleShowRegister}> Regístrarse </label>
                    </div>
                    <div className="justify-content-center w-100">
                       {showLogin ? <FormLogin /> : <FormSignup handleShowLogin={handleShowLogin} />}
                    </div>
                </div>
        </div></>
    );
};
