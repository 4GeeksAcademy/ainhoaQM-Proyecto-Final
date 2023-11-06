import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/index.css";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const FormLogin = () => {
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
        <><form onSubmit={handleLogin} className="p-4">
            <div className="text-center mb-4">
                <h1 className="h1 pt-4"> Inicia sesión </h1>
            </div>
            {errorMessage && (
                <div className="alert alert-warning" role="alert"> {errorMessage} </div>
            )}
            <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                    <h5> Correo electrónico </h5>
                </label>
                <input type="email" className="form-control" id="inputEmail" name="email" autoComplete="email" required
                    value={formData.email} onChange={handleChange}/>
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                    <h5> Contraseña </h5>
                </label>
                <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword" name="password" autoComplete="current-password" required
                        value={formData.password} onChange={handleChange}/>
                    <button className="btn btn-secondary" type="button" onClick={toggleShowPassword}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                </div>
                {formErrors.password && <div className="error-message">{formErrors.password}</div>}
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-secondary col-6"> Iniciar Sesión </button>
            </div>
        </form>
        <p className="py-4 px-2 text-center">
            ¿Has olvidado tu contraseña?{' '}
            <Link to="/reset-password">Recupérala aquí</Link>
        </p> </>         
    );
};