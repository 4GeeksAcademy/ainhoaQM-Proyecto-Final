import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

//icons
import { PiWarningCircleDuotone } from "react-icons/pi";

export const Desserts = () => {
  const { store, actions } = useContext(Context);
  const [desserts, setDesserts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const addToCart = (product, quantity) => {
    if (store.isAuthenticated) {
      actions.addToCart(product, quantity);
      setQuantity(1);
      console.log(`Se agregó ${quantity} ${product.name} al carrito.`);
    } else {
      setShowLoginMessage(true);
    }
  };

  const handleCartButtonClick = () => {
    if (!store.isAuthenticated) {
      setShowLoginMessage(true);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-4/products")
      .then((response) => response.json())
      .then((data) => {
        const sortedDesserts = data.products.sort((a, b) => a.id - b.id);
        setDesserts(sortedDesserts);
        console.log(sortedDesserts);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (showLoginMessage) {
      window.scrollTo(0, 0);
    }
  }, [showLoginMessage]);

    return (
        <>
        <div className="container body">
            {showLoginMessage && (
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <div className="icon-warning">
                        <PiWarningCircleDuotone />
                    </div>
                    <div>
                        Por favor, <a href="/login">inicia sesión</a> o <a href="/signup">regístrate</a>  para poder añadir cosas al carrito.
                    </div>
                </div>
            )}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Inicio</a></li>
                    <li className="breadcrumb-item"><a href="/shop">Tienda</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Postres</li>
                </ol>
            </nav>
            <div className="jumbotron-category p-2 mb-4 rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="h1 display-3 text-center">Postres</h1>
                </div>
            </div>
            <h2 className="subtitle display-6"> Postres Caseros </h2>
            <hr className="my-1" />
            <div className="row p-3">
                {desserts.slice(0, 6).map((dessert) => (
                    <div key={dessert.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-4">
                        <div className="card">
                            <img src={dessert.image_url} className="card-img-top" alt={dessert.name}/>
                            <div className="card-body">
                                <h3 className="card-title text-center">{dessert.name}</h3>
                                <h4 className="card-text text-end p-1">{dessert.price.toFixed(2)} €</h4>
                                <div className="card-footer quantity-selector d-flex align-items-center justify-content-center">
                                    <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                                    <span className="px-2">{quantity}</span>
                                    <button onClick={incrementQuantity}className="btn btn-outline-secondary me-3">+</button>
                                    <button onClick={() => addToCart(dessert, quantity)} className="btn btn-success">Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="subtitle display-6"> Helados</h2>
            <hr className="my-1" />
            <div className="row p-3">
                {desserts.slice(6).map((dessert) => (
                    <div key={dessert.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-4">
                        <div className="card">
                            <img src={dessert.image_url} className="card-img-top" alt={dessert.name}/>
                            <div className="card-body">
                                <h3 className="card-title text-center">{dessert.name}</h3>
                                <h4 className="card-text text-end p-1">{dessert.price.toFixed(2)} €</h4>
                                <div className="card-footer quantity-selector d-flex align-items-center justify-content-center">
                                    <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                                    <span className="px-2">{quantity}</span>
                                    <button onClick={incrementQuantity}className="btn btn-outline-secondary me-3">+</button>
                                    <button onClick={() => addToCart(dessert, quantity)} className="btn btn-success">Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
