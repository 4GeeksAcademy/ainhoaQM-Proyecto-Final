import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext"; 
import "../../styles/index.css";

export const FormReservation = () => {
  const { store } = useContext(Context);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showContactLink, setShowContactLink] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
  const tomorrowISOString = tomorrow.toISOString().split("T")[0];
  const isMonday = new Date().getDay() === 1;
  const [showMessageMonday, setShowMessageMonday] = useState(false);
  const [formData, setFormData] = useState({
    name: store.isAuthenticated ? store.user_name || '' : localStorage.getItem('userName') || '',
    email: store.isAuthenticated ? store.userEmail || '' : localStorage.getItem('userEmail') || '',
    location: '',
    date: '',
    time: '',
    numberOfPeople: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "date") {
      const selectedDate = new Date(value);
      if (selectedDate.getDay() === 1) {
        setShowMessageMonday(true);
        return;
      } else {
        setShowMessageMonday(false);
      }
    }
  
    setFormData({
      ...formData,
      [name]: value
    });
  
    if (name === "numberOfPeople" && value > 8) {
      setShowContactLink(true);
      setDisableButton(true); 
    } else {
      setShowContactLink(false);
      setDisableButton(false); 
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      name: formData.name === '' ?  '' : formData.name,
      email: formData.email === '' ? '' : formData.email,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      numberOfPeople: formData.numberOfPeople
    };
    try { 
      const response = await fetch(process.env.BACKEND_URL + "/api/create-reservation", {
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
          date: '',
          time: '',
          numberOfPeople: ''
        });
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
      <h1 className="title-section display-4">Reservar Mesa</h1>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label color-pink fs-4"> Nombre </label>
          <input type="text" className="form-control" id="name" name="name" required autoComplete="name"
            value={formData.name} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label color-pink fs-4"> Correo Electrónico </label>
          <input type="email" className="form-control" id="email" name="email" required autoComplete="email"
            value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label color-pink fs-4"> Ubicación </label>
          <select
            className="form-select" id="location" name="location" required
            value={formData.location} onChange={handleChange}>
            <option>Selecciona una opción</option>
            <option value="Calle Falsa, 123 CP: 00000 Barcelona">Calle Falsa, 123 CP: 00000 Barcelona</option>
            <option value="Calle Ficticia, 456 CP: 00000 Madrid">Calle Ficticia, 456 CP: 00000 Madrid</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label color-pink fs-4"> Fecha </label>
          <input type="date" className="form-control" id="date" name="date" required
            min={tomorrowISOString} value={formData.date} onChange={handleChange} disabled={isMonday}/>
          {showMessageMonday && (
            <div className="alert alert-warning mt-2" role="alert">
              Los lunes estamos cerrados, excepto algunos festivos, por favor si quieres hacer una reserva en lunes{" "}
              <a href="/contact">ponte en contacto con nosotros</a>.
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label color-pink fs-4"> Hora </label>
          <input type="time" className="form-control" id="time" name="time" required
            value={formData.time} onChange={handleChange} />
          <div className="alert alert-warning mt-2" role="alert">
            No se aceptaran reservas fuera de nuestro horario laboral, si tienes alguna duda{" "}
            <a href="/contact">ponte en contacto con nosotros</a>.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="numberOfPeople" className="form-label color-pink m-0 fs-4"> Nº de Personas <br/>  </label>
          <span> (Mínimo 2)</span>
          <input type="number" className="form-control mt-2" id="numberOfPeople" name="numberOfPeople" required
            min="2" max="8" value={formData.numberOfPeople} onChange={handleChange} />
          {showContactLink && (
            <div className="alert alert-warning mt-2" role="alert">
              Si quieres hacer una reserva de más de 8 personas, por favor{" "}
              <a href="/contact">ponte en contacto con nosotros</a>.
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-secondary col-6" disabled={disableButton}> Reservar Mesa </button>
      </form>
      {submitStatus === 'success' && (
        <div className="alert alert-success mt-3" role="alert">
          ¡Tu solicitud de reserva se realizó correctamente! Nuestro equipo te enviará un correo electrónico para confirmar la reserva.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-warning mt-3" role="alert"> Hubo un error al realizar la reserva. Por favor, inténtalo de nuevo. </div>
      )}
    </div>
  );
};