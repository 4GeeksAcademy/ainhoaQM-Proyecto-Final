import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

//icons
import { TiShoppingCart } from "react-icons/ti";
import { BsTrash3 } from "react-icons/bs";

export const CartButton = () => {
  const { store, actions } = useContext(Context);
  const totalQuantity = store.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const offcanvasRef = useRef();

  const handleAddMore = (productId) => {
    actions.incrementQuantity(productId);
  };

  const handleSubtractOne = (productId) => {
    actions.decrementQuantity(productId);
  };

  const handleRemove = (productId) => {
    actions.removeFromCart(productId);
  };

  useEffect(() => {
    const offcanvasElement = offcanvasRef.current;

    const showHandler = () => {
      if (!store.isAuthenticated) {
        offcanvasElement.hide();
      }
    };

    const hiddenHandler = () => {
      offcanvasElement.hide();
      document.querySelector(".cart-button").classList.remove("active");
    };

    offcanvasElement.addEventListener("show.bs.offcanvas", showHandler);
    offcanvasElement.addEventListener("hidden.bs.offcanvas", hiddenHandler);

    return () => {
      offcanvasElement.removeEventListener("show.bs.offcanvas", showHandler);
      offcanvasElement.removeEventListener("hidden.bs.offcanvas", hiddenHandler);
    };
  }, [store.isAuthenticated]);

  return (
    <>
      {store.isAuthenticated && (
        <button
          className="btn btn-secondary cart-button"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          {totalQuantity} <TiShoppingCart style={{ fontSize: "2rem" }} />
        </button>
      )}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-header pb-0">
          <h2 className="offcanvas-title" id="offcanvasRightLabel">
            Tu carrito
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            {store.cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center cart-item"
                style={{
                  backgroundColor: "#ffd5cd",
                  border: "1px solid #ff7e67",
                  margin: "5px 0",
                }}
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
                    className="btn btn-danger"
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
          <div className="mt-3 d-flex justify-content-center">
            <Link to="/cart" className="btn btn-secondary col-12 col-md-8" style={{ textDecoration: "none" }}>
              Ver artículos en tu cesta
            </Link>
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <button className="btn btn-secondary mb-2 mb-md-0 col-12 col-md-8">
              <Link
                to="/ticket"
                style={{ color: "white", textDecoration: "none" }}
              >
                Confirmar Pedido
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
