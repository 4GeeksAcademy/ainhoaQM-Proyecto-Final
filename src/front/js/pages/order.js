import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Order = () => {
  const { store, actions } = useContext(Context);
  const cart = store.cart;
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    const discountCode = document.getElementById('inputDiscountCode').value;
    const percentage = await actions.validateDiscount(discountCode);

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
        code: discountCode, 
        percentage: store.discountPercentage
      };
    }    
    return { totalPrice: totalPrice.toFixed(2), discountInfo };
  };

  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (acceptTerms) {
      const payment_method = document.querySelector('input[name="paymentOption"]:checked').value;
      const comments = document.getElementById('comments').value;
      const takeaway = document.getElementById('takeaway').checked;
      
      const cart = store.cart;
      const products = [];
      const menus = [];
  
      cart.forEach(item => {
        if ('product_id' in item) {
          products.push(item);
        } else if ('menu_id' in item) {
          menus.push(item);
        }
      });
  
      const orderData = {
        cart: [...products, ...menus], 
        payment_method,
        takeaway,
        comments,
        discountCode,
      };
      console.log('orderData:', orderData);

      try {
        const authToken = localStorage.getItem('token');
        const response = await fetch(process.env.BACKEND_URL + "/api/create-order", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(orderData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            alert('Pedido creado exitosamente');
            actions.clearCart();

            if (paymentOption === 'card') {
              navigate('/payment');
            } else {
              navigate('/ticket');
            }
          } else {
            alert('Error al crear el pedido');
          }
        } else {
          alert('Error al enviar la solicitud al servidor');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al conectarse con el servidor');
      }
    } else {
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
            <a href="/"> Inicio </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop"> Carta </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/cart"> Cesta </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page"> Confirmar Pedido </li>
        </ol>
      </nav>
      <div className="purchase-overview">
        <h1> Resumen de la Compra </h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Cantidad: {item.quantity} - Precio:{" "}
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div>
          <h1> Total a Pagar: </h1>
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
              name="takeaway"
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
              name="takeaway"
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
            id="comments" 
            name="comments"
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
