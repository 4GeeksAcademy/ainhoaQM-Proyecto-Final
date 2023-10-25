import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../../styles/tickets.css";

//images
import cucharas from '../../img/cucharas.jpg';
import abstract from '../../img/abstract.jpg';
import ComerComida from '../../img/ComerComida.jpg';

export const Ticket = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(process.env.BACKEND_URL + `/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setOrderDetails(data);
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [orderId]);  

  return (
    <div className="body ticket-background-abstract" style={{backgroundImage: `url(${abstract})`}}>
        <div className="row m-5">
          <div className="col-sm-12 col-md-6 ticket ticket-rounded ticket-shadow ticket-bg-light mb-2">
            <h1 className="ffBG display-5 ticket-color-pink">¡Muchas Gracias Por Tu Compra!</h1>
            <h4 className="ticket-subtitle">Este es tu número de pedido: {orderId} </h4>
            <div className="px-5 mx-5">
              {orderDetails && (
                <>
                  <h4>Detalles del Pedido</h4> 
                  <div className="d-flex justify-content-between">
                    <p>Nº del pedido: {orderDetails.id}</p>
                    <p>{orderDetails.order_date}</p>
                  </div>
                  <h4>Productos</h4>
                  {orderDetails.order_details.some(detail => detail.menu_id) && (
                    <>
                      {orderDetails.order_details.map((detail, index) => (
                        <div key={index}>
                          {detail.menu_id && (
                            <>
                              <div className="d-flex justify-content-between">
                                <p>Menú  {detail.quantity > 1 && `X ${detail.quantity}`} </p> 
                                <p>Precio: {detail.price.toFixed(2)} €</p>
                              </div>
                              {detail.menu_description && detail.menu_description.split(',').map((item, i) => (
                                <p key={i}>{item.trim()}</p>
                              ))}
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {orderDetails.order_details.some(detail => detail.product_id) && (
                    <>
                      {orderDetails.order_details.map((detail, index) => (
                        <div key={index}>
                          {detail.product_id && (
                            <div className="d-flex justify-content-between">
                              <p> {detail.product_name} {detail.quantity > 1 && `X ${detail.quantity}`} </p> 
                              <p>Precio: {detail.price.toFixed(2)} €</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {orderDetails.discount_code && (
                    <>
                      <p className="text-end">Subtotal: {orderDetails.order_details.reduce((acc, detail) => acc + detail.price, 0).toFixed(2)} €</p>
                      <p className="text-end">Código de Descuento</p>
                      <p className="text-end">{orderDetails.discount_code.code}:{" "}{orderDetails.discount_code.percentage}%</p>
                    </>
                  )}
                  <p className="text-end">Total: {orderDetails.total_price.toFixed(2)} €</p>
                  {orderDetails.order_comments && (
                    <p>Comentarios: {orderDetails.order_comments}</p>
                  )}
                </>
              )}
            </div>
            <h4 className="ticket-subtitle pb-5">¡Que aproveche y sobre todo no te olvides de disfrutar!</h4>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="ticket-image-container pb-2">
              <img src={ComerComida} alt="Imagen logo" className="ticket-image"/>
            </div>
            <div className="ticket-image-container justify-content-center mb-2">
              <img src={cucharas} alt="Imagen de unas cucharas" className="ticket-image"/>
            </div>
          </div>
        </div>
    </div>
  );
};
