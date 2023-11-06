import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import "../../styles/index.css";

//images
import menu from '../../img/menu.png';

export const Cart = () => {
  const { store, actions } = useContext(Context);
  console.log(store)

  const handleAddMore = (productId) => {
    actions.incrementQuantity(productId);
  };

  const handleSubtractOne = (productId) => {
    actions.decrementQuantity(productId);
  };

  const handleRemove = (productId) => {
    actions.removeFromCart(productId);
  };

  const handleClearCart = () => {
    actions.clearCart();
  };

  return (
    <div className="body container pb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/shop">Carta</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page"> Cesta </li>
        </ol>
      </nav>
      <h1 className="subtitle display-6"> Cesta </h1>
      <hr className="my-1" />
      <div className="row">
        {store.cart.map((item) => (
          <div key={item.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-3">
            <div className="card g-0">
              <div className="col-md-12 d-flex justify-content-center">
                {item.name === 'Menú' && (
                  <img src={menu} className="menu-img img-fluid" alt="Menu" />
                )}
                {item.name !== 'Menú' && (
                  <img src={item.image_url} className="img-fluid cart-img" alt={item.name} />
                )}
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{item.name}</h5>
                  {item.name === 'Menú' && (
                    <div>
                      <a className="a" data-bs-toggle="modal" data-bs-target={`#modal-${item.id}`}> Ver Detalles </a>
                    </div>
                  )}
                </div>
                <div className="card-text py-1"> Cantidad: {item.quantity} </div>
                <div className="card-text py-1"> Precio: {(item.price * item.quantity).toFixed(2)} € </div>
                <div className="btn-group pt-3">
                  <button className="btn btn-secondary" onClick={() => handleAddMore(item.id)}> + </button>
                  <button className="btn btn-secondary" onClick={() => handleSubtractOne(item.id)}> - </button>
                  <button className="btn btn-secondary" onClick={() => handleRemove(item.id)}> <BsTrash3 /> </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total mt-3">
        <h4>
          Total:{" "}
          {store.cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}{" "} €
        </h4>
      </div>
      <div className="mt-3 d-flex flex-column flex-md-row justify-content-md-between">
        <button className="btn btn-secondary mb-2 mb-md-0 col-12 col-md-4">
          <Link to="/order" style={{ color: "white", textDecoration: "none" }} > Confirmar Pedido </Link>
        </button>
        <button onClick={handleClearCart} className="btn btn-secondary col-12 col-md-4" > Vaciar carrito </button>
      </div>
      {store.cart.map((item) => (
        <div key={item.id} className="modal fade" id={`modal-${item.id}`} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{item.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body pt-0">
                <div> Descripción: </div>
                {item.description && (
                  <div>
                    {item.description.split(',').map((substring, index) => (
                      <div key={index}>{substring}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );  
};