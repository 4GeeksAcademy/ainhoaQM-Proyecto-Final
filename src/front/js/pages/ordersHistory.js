import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const user_id = JSON.parse(atob(token.split('.')[1])).user_id;
        const response = await fetch(process.env.BACKEND_URL + `/api/user-orders/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <div className="body">
      <div className="container">
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
      </div>  
      <div className="mx-5">
        <h1 className="subtitle display-6"> Mis Pedidos </h1>
        <hr className="my-1" />  
      </div>  
      <div className="section">
        <div className="row col-12 px-4 justify-content-center">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="card col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mt-2 me-2" style={{ maxWidth: '300px' }}>
                <div className="card-header">Nº de pedido: {order.id}</div>
                <div className="card-body">
                  <p className="card-text">Fecha de Pedido: {order.order_date}</p>
                  <p className="card-text">Método de Pago: {order.payment_method}</p>
                  <p className="card-text">Total: {order.total_price} €</p>
                </div>
                <div className="card-footer">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${order.id}`}> Ver Detalles </button>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning" role="alert"> Aún no has realizado ninguna compra en nuestra página web. </div>
          )}
        </div>
        {orders.map((order) => (
          <div key={order.id} className="modal fade" id={`modal-${order.id}`} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Nº de pedido: {order.id}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <h5>Detalles del Pedido:</h5>
                  <ul>
                    {order.order_details.map((item, index) => (
                      <li key={index}>
                        {item.product_name && (
                          <p>
                            {item.product_name} {item.quantity > 1 && `X ${item.quantity}`}
                          </p>
                        )}
                        {item.menu_id && (
                          <>
                            <p> Menu </p>
                            <p>{item.menu_description}</p>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  {order.order_comments && (
                    <>
                      <h5> Comentarios: </h5>
                      <p className="ticket-comment">{order.order_comments}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
};
