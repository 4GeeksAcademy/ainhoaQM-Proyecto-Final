import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link  } from 'react-router-dom';
//iconos
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
//images
import abstract from '../../img/abstract.jpg';

export const Login = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    function handleGoogleLogin() {
        // Redirect to the Flask backend route for Google login
        window.location.href = '/login/google';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            const emailRegex = /\S+@\S+\.\S+/;
            setFormErrors({
                ...formErrors,
                email: emailRegex.test(value) ? '' : 'El correo electrónico no es válido'
            });
        } else if (name === 'password') {
            setFormErrors({
                ...formErrors,
                password: value.length >= 8 ? '' : 'La contraseña debe tener al menos 8 caracteres'
            });
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            errors.email = 'El correo electrónico no es válido';
        }

        if (formData.password.length < 8) {
            isValid = false;
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const userToken = responseData.token;

                    if (userToken) {
                        const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
                        const user_name = decodedToken.user_name;

                        console.log('Token:', userToken);
                        console.log('User Name:', user_name);

                        actions.setIsAuthenticated(true);
                        console.log('Autenticado:', store.isAuthenticated);

                        localStorage.setItem('userName', user_name);
                    }

                    navigate('/'); 
                } else {
                    const responseData = await response.json();
                    console.error('Error de respuesta:', responseData);

                    if (response.status === 401) {
                        setErrorMessage('Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.');
                    } else {
                        setErrorMessage('Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className="body background-abstract" style={{backgroundImage: `url(${abstract})`}}>
            <div className="row m-5">
                <div className="col-md-6 p-4 section rounded shadow bg-light">
                    <form className="m-5" onSubmit={handleLogin}>
                        <div className="text-center mb-4">
                            <h1 className="h1">Iniciar Sesión</h1>
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                                <h5>Correo electrónico</h5>
                            </label>
                            <input type="email" className="form-control" id="inputEmail" name="email" autoComplete="email" required
                                value={formData.email} onChange={handleChange}
                            />
                            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">
                                <h5>Contraseña</h5>
                            </label>
                            <div className="input-group">
                                <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword" name="password" autoComplete="current-password" required
                                    value={formData.password} onChange={handleChange}
                                />
                                <button className="btn btn-secondary" type="button" onClick={toggleShowPassword}>
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible />
                                    ) : (
                                        <AiOutlineEye />
                                    )}
                                </button>
                            </div>
                            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary float-end">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
                <div className="col-md-6 align-self-center">
                    <div className="section text-center">
                        <p>
                            ¿No tienes cuenta?{' '}
                            <Link to="/signup" className="white-link">Regístrate aquí</Link>
                        </p>
                        <p>
                            ¿Has olvidado tu contraseña?{' '}
                            <Link to="/WIP" className="white-link">Recupérala aquí</Link>
                        </p>
                        <button className="btn btn-secondary" type="button" onClick={handleGoogleLogin}>
                            hola google
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};