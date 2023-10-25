import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link  } from 'react-router-dom';
import "../../styles/index.css";

//firabase google
import { firebaseConfig } from "../component/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

//img
import abstract from "../../img/abstract.jpg";

export const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    user_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const responseData = await response.json();
        console.error("Error de respuesta:", responseData);

        if (response.status === 400) {
          setErrorMessage(
            "El correo electrónico ingresado ya está registrado. Por favor, inicia sesión o utiliza otro correo electrónico."
          );
        } else {
          setErrorMessage(
            "Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde."
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
  // Termina Firebase Google
    
  return (
    <div
      className="body background-abstract" style={{ backgroundImage: `url(${abstract})` }}>
      <div className="row m-5">
        <div className="col-md-6 p-4 section rounded shadow bg-light">
          <form className="m-5" onSubmit={handleSignup}>
            <div className="text-center mb-4">
              <h1 className="h1">Registro</h1>
            </div>
            {errorMessage && (
              <div className="alert alert-warning" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                <h5 className="m-0">Nombre de usuario</h5>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="user_name"
                autoComplete="username"
                required
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                <h5 className="m-0">Correo electrónico</h5>
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                <h5 className="m-0">Contraseña</h5>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputRepeatPassword" className="form-label">
                <h5 className="m-0">Repetir contraseña</h5>
              </label>
              <div className="input-group">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  className="form-control"
                  id="inputRepeatPassword"
                  name="repeatPassword"
                  autoComplete="current-password"
                  required
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleShowRepeatPassword}
                >
                  {showRepeatPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary float-end">
              Registrarse
            </button>
          </form>
        </div>
        <div className="col-md-6 align-self-center">
          <div className="section text-center">
            <p className="mt-3">
              ¿Ya tienes cuenta con nosotros?{" "}
              <Link to="/login" className="white-link">
                Inicia Sesión
              </Link>
            </p>
            <p className="mb-3">
              ¿Has olvidado tu contraseña?{" "}
              <Link to="/WIP" className="white-link">
                Recupérala
              </Link>
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
