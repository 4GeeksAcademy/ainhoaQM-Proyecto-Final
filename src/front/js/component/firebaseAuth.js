import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link  } from 'react-router-dom';
import "../../styles/index.css";

import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//icons
import { FcGoogle } from "react-icons/fc";


export const FirebaseAuth = () => {
    const { actions} = useContext(Context);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    initializeApp(FirebaseConfig);    

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

            fetch(`${process.env.BACKEND_URL}/api/signup-firebase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {

                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userName', data.user_name);
            })
            .catch(error => {
                console.error('Error al enviar datos al backend:', error);
            });

            actions.setIsAuthenticated(true, user.displayName);
            navigate('/shop')
        })
        .catch((error) => {
            console.error(error);

            const errorCode = error.code;

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

    return(
        <div className="btn-group btn-secondary my-3" role="group" aria-label="Basic example">
            <button type="button" onClick={callLoginGoogle} className="btn btn-secondary btn-lg"><FcGoogle/></button>
            <button type="button" onClick={callLoginGoogle} className="btn btn-secondary btn-lg">Iniciar Sesión con Google</button>
        </div>
    );
};

  