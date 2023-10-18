import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Ticket = () => {
  const { store, actions } = useContext(Context);
  const cart = store.cart;
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const handleDiscountSubmit = async (e) => {
    console.log('Submit button clicked');
    e.preventDefault();
    const discountCode = document.getElementById('inputDiscountCode').value;
    console.log('Discount code:', discountCode);
    const percentage = await actions.validateDiscount(discountCode);
    console.log('Percentage:', percentage);

    if (percentage > 0) {
        setDiscountCode(discountCode); 
    } else {
        alert("Código de descuento inválido");
    }
    actions.setDiscountPercentage(percentage); 
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });

    let discountInfo = null;

    if (store.discountPercentage > 0 && discountCode) { 
      const discountAmount = totalPrice * (store.discountPercentage / 100);
      totalPrice -= discountAmount;
    
      discountInfo = {
        code: discountCode, // Usa el código de descuento almacenado en el estado
        percentage: store.discountPercentage
      };
    }    
    return { totalPrice: totalPrice.toFixed(2), discountInfo };
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (acceptTerms) {
        const totalPrice = calculateTotalPrice(); 
        const discountedPrice = totalPrice - (totalPrice * (store.discountPercentage / 100));
        alert(`Pago procesado exitosamente. Descuento aplicado: ${store.discountPercentage}%. Total a pagar: ${discountedPrice}€`);
    } else {
        alert("Por favor, acepta los términos y condiciones para finalizar el pedido.");
    }
  };

  const handleCancelOrder = () => {
    actions.clearCart();
    navigate('/shop');
  };
  

  const handleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  return (
    <div className="container body">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Inicio</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop">Carta</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/cart">Cesta</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Confirmar Pedido
          </li>
        </ol>
      </nav>
      <div className="purchase-overview">
        <h1>Resumen de la Compra</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Cantidad: {item.quantity} - Precio:{" "}
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div>
          <h1>Total a Pagar:</h1>
          <p>{calculateTotalPrice().totalPrice} €</p>
          {calculateTotalPrice().discountInfo && (
            <div>
              <p>Cupón aplicado: {calculateTotalPrice().discountInfo.name}</p>
              <p>Porcentaje de descuento: {calculateTotalPrice().discountInfo.percentage}%</p>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <div>
          <h1>¿Dónde quieres disfrutar de tu comida?</h1>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="eatInRestaurant"
              name="eatingOption"
              value="restaurant"
            />
            <label className="form-check-label" htmlFor="eatInRestaurant">
              En el restaurante
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="takeaway"
              name="eatingOption"
              value="takeaway"
            />
            <label className="form-check-label" htmlFor="takeaway">
              Prefiero la comida para llevar
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="inputDiscountCode" className="form-label">
            <h1>¿Tienes un cupón de descuento?</h1>
          </label>
          <p>Si tienes un cupón de descuento, ingrésalo a continuación:</p>
          <div className="col-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="inputDiscountCode"
                name="inputDiscountCode"
                placeholder="Código de descuento"
                aria-label="Código de descuento"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-secondary"
                type="button"
                id="button-addon2"
                onClick={handleDiscountSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1>¿Cómo quieres pagar?</h1>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="payWithCard"
              name="paymentOption"
              value="card"
            />
            <label className="form-check-label" htmlFor="payWithCard">
              Pagar online con Tarjeta
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="payWithPaypal"
              name="paymentOption"
              value="paypal"
            />
            <label className="form-check-label" htmlFor="payWithPaypal">
              Datáfono en tienda
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="payWithCash"
              name="paymentOption"
              value="cash"
            />
            <label className="form-check-label" htmlFor="payWithCash">
              Pagar en Efectivo
            </label>
          </div>
        </div>
        <div>
          <h1>Comentarios del Pedido</h1>
          <p>Observaciones:</p>
          <textarea
            className="form-control"
            id="comentarios" 
            name="comentarios"
            rows="4"
            maxLength="2000"
            placeholder="Escribe tus comentarios aquí..."
          />
        </div>
        <div>
          <h1>Política de privacidad</h1>
          <p>
            Debes aceptar el aviso legal y las condiciones de uso antes de
            continuar
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptTerms}
              onChange={handleAcceptTerms}
            />
            <label className="form-check-label" htmlFor="acceptTerms">
              He leído y acepto la <Link to="/wip">Política de Privacidad</Link>{" "}
              y las <Link to="/wip">Condiciones generales de compra</Link>.
            </label>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancelOrder}
        >
          Cancelar Pedido
        </button>
        <button
          type="submit"
          className={`btn btn-secondary ${
            !acceptTerms ? "disabled-button" : ""
          }`}
          disabled={!acceptTerms}
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
};
