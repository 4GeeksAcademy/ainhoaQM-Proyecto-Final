import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

//firabase google
import { FirebaseConfig } from "../component/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

//components
import { Heading } from "../component/heading";

//img
import abstract from "../../img/abstract.jpg";
import iconGmail from "../../img/iconGmail.png";
import iconOutlook from "../../img/iconOutlook.png";


export const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);

    initializeApp(FirebaseConfig);

    const auth = getAuth();

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setUserNotFound(false); 
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/check-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                await sendPasswordResetEmail(auth, email);
                alert("Revisa tu correo electrónico para restablecer tu contraseña");
            } else {
                setUserNotFound(true);
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError({ code: errorCode, message: errorMessage });
        }
    }

    return (
        <><Heading />
        <div className="body background-abstract" style={{ backgroundImage: `url(${abstract})` }}>
            <div className="container-fluid">
                <div className="row m-4 justify-content-center align-items-center">
                    <div className="col-12 rounded shadow bg-light">
                        <form onSubmit={(e) => handleSubmit(e)} className="m-5">
                            <div className="text-center mb-4">
                                <h1 className="h1 px-4"> Cambia tu Contraseña </h1>
                                <p>
                                    Por motivos de seguridad se enviará un enlace a tu dirección de correo para restablecer tu contraseña.
                                </p>
                            </div>
                            {error && (
                                <div className="alert alert-warning"> {error.message} </div>
                            )}
                            {userNotFound && (
                                <div className="alert alert-warning"> 
                                    No se ha encontrado esta dirección de correo vinculada a ningún usuario.
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                autoComplete="current-email" required value={email} onChange={handleInputChange}/>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" className="btn btn-secondary"> Enviar </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary me-3">
                    <img src={iconGmail} alt="Gmail" className="iconGmail p-2" /> Abrir Gmail
                </a>
                <a href="https://outlook.live.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
                    <img src={iconOutlook} alt="Outlook" /> Abrir Outlook
                </a>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <p className="d-flex justify-content-center mx-4 mt-2">¿No has recibido ningún e-mail? No te olvides de revisa la carpeta de spam.</p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
                <p>¿Necesitas ayuda? <Link to="/contact" className="black-link"> Contacta con nosotros </Link></p>
            </div>
        </div></>
    );
};