import React, { useState } from "react";
import "../../styles/index.css";

//firabase google
import { firebaseConfig } from "../component/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

//img
import abstract from "../../img/abstract.jpg";

export const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);

    initializeApp(firebaseConfig);

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
        <div className="body background-abstract" style={{ backgroundImage: `url(${abstract})` }}>
            <div className="container">
                <div className="row m-5 justify-content-center">
                    <div className="col-12 form-rounded form-shadow bg-light">
                        <form onSubmit={(e) => handleSubmit(e)} className="m-5">
                            <div className="text-center mb-4">
                                <h1 className="h1">Resetea tu contraseña</h1>
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
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-secondary">Restablecer Contraseña</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

