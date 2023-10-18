import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
//iconos
import { BsTrash3 } from "react-icons/bs";

export const Cart = () => {
  const { store, actions } = useContext(Context);

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
    <div className="container cart-container pb-5 body">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/shop">Carta</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cesta
          </li>
        </ol>
      </nav>
      <h1 className="subtitle display-6">Cesta</h1>
      <hr className="my-1" />
      <ul className="list-group">
        {store.cart.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center "
          >
            <span>
              {item.name} <br />
              Cantidad: {item.quantity} <br /> Precio:{" "}
              {(item.price * item.quantity).toFixed(2)} € <br/>
              {item.description && (
                  <span>
                    Descripción: {item.description}
                  </span>
                )
              }
            </span>
            <div className="btn-group p-2">
              <button
                className="btn btn-secondary"
                onClick={() => handleAddMore(item.id)}
              >
                +
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSubtractOne(item.id)}
              >
                -
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleRemove(item.id)}
              >
                <BsTrash3 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total mt-3">
        <h4>
          Total:{" "}
          {store.cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}{" "}
          €
        </h4>
      </div>

      <div className="mt-3 d-flex flex-column flex-md-row justify-content-md-between">
        <button className="btn btn-secondary mb-2 mb-md-0 col-12 col-md-4">
          <Link to="/ticket" style={{ color: "white", textDecoration: "none" }}>
            Confirmar Pedido
          </Link>
        </button>
        <button
          className="btn btn-secondary col-12 col-md-4"
          onClick={handleClearCart}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};
