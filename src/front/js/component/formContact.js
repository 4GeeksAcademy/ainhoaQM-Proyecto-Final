import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext"; 
import "../../styles/index.css";

export const FormContact = () => {
  const { store } = useContext(Context);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('name:', name, 'value:', value);
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      name: formData.name === '' ? null : formData.name,
      email: formData.email === '' ? null : formData.email,
      message: formData.message
    };
    try { 
        const response = await fetch(process.env.BACKEND_URL + "/api/contact", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          const offset = 100; 
          window.scrollBy(0, offset);
        } else {
          setSubmitStatus('error');
        }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setSubmitStatus('error');
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
  
    if (storedName && storedEmail) {
      setFormData({
        ...formData,
        name: storedName,
        email: storedEmail
      });
    }
  }, []);

  return (
    <div>
      <h1 className="title-section display-4">Contacta con nosotros</h1>
      <p className="p-3">
        ¿Tienes alguna pregunta o comentario? No dudes en ponerte en
        contacto con nosotros. Estamos aquí para ayudarte.
      </p>
      <p className="p-3">
        Puedes contactarnos a través del siguiente formulario, llamándonos por teléfono o
        directamente a nuestro correo electrónico.
      </p>
      <p>
        <strong>Teléfono:</strong>{" "}
        933 123 123 <br/>
        <strong>Correo Electrónico:</strong>{" "}
        <a href="mailto:info@tudominio.com">info@comercomida.com</a>
      </p>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label color-pink fs-4"> Nombre </label>
          <input type="text" className="form-control" id="name" name="name" required autoComplete="name"  
          value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label color-pink fs-4"> Correo Electrónico </label>
          <input type="email" className="form-control" id="email" name="email" required autoComplete="email"
          value={formData.email}  onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label color-pink fs-4"> Mensaje </label>
          <textarea className="form-control" id="message" name="message" rows="5" required
            value={formData.message} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary"> Enviar Mensaje </button>
      </form>
      {submitStatus === 'success' && (
        <div className="alert alert-success mt-3" role="alert"> ¡El mensaje se envió con éxito! </div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-warning mt-3" role="alert"> Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo. </div>
      )}
    </div>
  );
};