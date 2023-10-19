import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link  } from 'react-router-dom';
import "../../styles/index.css";

//firabase google
import { firebaseConfig } from "../component/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//iconos
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

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

    // Empieza Firebase Google
    const provider = new GoogleAuthProvider();

    initializeApp(firebaseConfig);

    const auth = getAuth();
    function callLoginGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const userName = user.displayName;
            const email = user.email
            const password = 'loginWithGoogle';
            const repeatPassword = 'loginWithGoogle';

            const data = {
                user_name:userName, 
                email:email, 
                password:password, 
                repeatPassword:repeatPassword,
            };
            console.log("Contenido de data:", data);

            fetch(`${process.env.BACKEND_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del backend:', data);
            })
            .catch(error => {
                console.error('Error al enviar datos al backend:', error);
            });

            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', user.displayName);

            actions.setIsAuthenticated(true, user.displayName);
            navigate('/shop')
        })
        .catch((error) => {
            console.error(error);
        
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData ? error.customData.email : null;
            const credential = GoogleAuthProvider.credentialFromError(error);
        
            switch (errorCode) {
                case 'auth/cancelled-popup-request':
                    alert('La solicitud de ventana emergente fue cancelada');
                    break;
                case 'auth/user-not-found':
                    alert('Usuario no encontrado');
                    break;
                case 'auth/wrong-password':
                    alert('Contraseña incorrecta');
                    break;
                default:
                    alert('Ocurrió un error inesperado, por favor inicia sesion con tu e-mail y contraseña o prueba el inicio de sesion con Google más tarde');
            }
        });            
    }    
    // Termina Firebase Google

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
                    const userEmail = responseData.email;

                    if (userToken) {
                        const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
                        const user_name = decodedToken.user_name;

                        actions.setIsAuthenticated(true, user_name);
                        console.log('Autenticado:', store.isAuthenticated);
                        
                        localStorage.setItem('token', userToken);
                        localStorage.setItem('userEmail', userEmail);
                        localStorage.setItem('userName', user_name);
                    }

                    navigate('/shop'); 
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
                <div className="col-md-6 p-4 section form-rounded form-shadow bg-light">
                    <form className="m-5" onSubmit={handleLogin}>
                        <div className="text-center mb-4">
                            <h1 className="h1">Iniciar Sesión</h1>
                        </div>
                        {errorMessage && (
                            <div className="alert alert-warning" role="alert">
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
                        <button type="submit" className="btn btn-secondary float-end">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
                <div className="col-md-6 align-self-center">
                    <div className="section text-center">
                        <p className="mt-3">
                            ¿No tienes cuenta?{' '}
                            <Link to="/signup" className="white-link">Regístrate aquí</Link>
                        </p>
                        <p className="mb-3">
                            ¿Has olvidado tu contraseña?{' '}
                            <Link to="/reset-password" className="white-link">Recupérala aquí</Link>
                        </p>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5" id="divider">
                                    <hr/>
                                </div>
                                <div className="col-2" id="text-divider">
                                    O
                                </div>
                                <div className="col-5" id="divider">
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group btn-secondary my-3" role="group" aria-label="Basic example">
                            <button type="button" onClick={callLoginGoogle} className="btn btn-secondary btn-lg"><FcGoogle/></button>
                            <button type="button" onClick={callLoginGoogle} className="btn btn-secondary btn-lg">Iniciar Sesión con Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};