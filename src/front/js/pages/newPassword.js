import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

//components
import { Heading } from "../component/heading";

//iconos
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

//img
import abstract from "../../img/abstract.jpg";

export const NewPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (newPassword.length < 8) {
            setError({ code: 400, message: "La contraseña debe tener al menos 8 caracteres." });
            return;
        }
    
        if (newPassword !== repeatPassword) {
            setError({ code: 400, message: "Las contraseñas no coinciden." });
            return;
        }
    
        // Verificar el email
        try {
            const emailResponse = await fetch(`${process.env.BACKEND_URL}/api/check-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
    
            if (!emailResponse.ok) {
                setEmailError(true);
                return;
            }
        } catch (error) {
            console.error("Error al verificar el email:", error);
            setError({ code: 500, message: "Ocurrió un error al verificar el email." });
            return;
        }
    
        // Cambiar la contraseña
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/new-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword, repeatPassword }),
            });
    
            if (response.ok) {
                alert("Tu contraseña ha sido cambiada exitosamente");
                navigate("/auth-page");
            } else {
                const responseData = await response.json();
                console.error("Error de respuesta:", responseData);
    
                if (response.status === 400) {
                    setError({ code: 400, message: "El correo electrónico ingresado ya está registrado. Por favor, inicia sesión o utiliza otro correo electrónico." });
                } else {
                    setError({ code: 500, message: "Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde." });
                }
            }
        } catch (error) {
            console.error("Error al verificar el email:", error);
            setError({ code: 500, message: error.message });
        }
    };    

    return (
        <><Heading />
        <div className="body background-abstract" style={{ backgroundImage: `url(${abstract})` }}>
            <div className="container">
                <div className="row m-5 justify-content-center">
                    <div className="col-12 rounded shadow bg-light">
                        <form onSubmit={(e) => handleSubmit(e)} className="m-5">                            
                            <div className="text-center mb-4">
                                <h1 className="h1">Cambia tu contraseña</h1>
                            </div>
                            {error && (
                                <div className="alert alert-warning"> {error.message} </div>
                            )}
                            {emailError && (
                                <div className="alert alert-warning">
                                    No se ha encontrado esta dirección de correo vinculada a ningún usuario.
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                autoComplete="current-email" required value={email} onChange={handleEmailChange}  />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                                <div className="input-group">
                                    <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword" name="password" autoComplete="current-password" 
                                    required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <button className="btn btn-secondary" type="button" onClick={toggleShowPassword}>
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputRepeatPassword" className="form-label"> Repetir Contraseña </label>
                                <div className="input-group">
                                    <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputRepeatPassword" name="repeatPassword" autoComplete="current-password" required
                                        value={repeatPassword}
                                        onChange={handleRepeatPasswordChange}
                                    />
                                    <button type="button" className="btn btn-secondary"
                                        onClick={toggleShowPassword}>
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-secondary"> Cambiar Contraseña </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
                    <p>¿Necesitas ayuda? <Link to="/contact" className="black-link"> Contacta con nosotros </Link></p>
                </div>
            </div>
        </div>
        </>
    );
};