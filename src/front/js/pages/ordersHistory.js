import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";


export const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const user_id = JSON.parse(atob(userToken.split('.')[1])).user_id;
        const response = await fetch(process.env.BACKEND_URL + `/api/user-orders/${user_id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setOrders(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container body">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"> Inicio </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/shop"> Carta </Link> 
          </li>
          <li className="breadcrumb-item active" aria-current="page"> Mis Pedidos </li>
        </ol>
      </nav>
      <h1 className="subtitle display-6"> Mis Pedidos </h1>
      <hr className="my-1" />
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className="card col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card-order-header">Orden #{order.id}</div>
            <div className="card-order-body">
              <h5 className="card-order">Fecha de Pedido: {order.order_date}</h5>
              <p className="card-order-text">Método de Pago: {order.payment_method}</p>
              <p className="card-order-text">Total: ${order.total_price}</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${order.id}`}> Ver Detalles </button>
            </div>
          </div>
        ))}
      </div>
      {orders.map((order) => (
        <div key={order.id} className="modal fade" id={`modal-${order.id}`} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Orden #{order.id}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h5>Detalles del Pedido:</h5>
                <ul>
                  {order.order_details.map((item, index) => (
                    <li key={index}>
                      {item.product_name && (
                        <span>{item.product_name} - </span>
                      )}
                      {item.menu_description}
                      <span className="quantity">Cantidad: {item.quantity}</span>
                      <span className="price">Precio: ${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );  
};