import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";


export const FirstDrinks = () => {
    const { store, actions } = useContext(Context);
    const [firstProductsDrinks, setFirstProductsDrinks] = useState([]);
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
    }

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    useEffect(() => {
        fetch(process.env.BACKEND_URL + '/api/category-3/first_products')
            .then(response => response.json())
            .then(data => {
                setFirstProductsDrinks(data.products);
                console.log(data.products);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div className="container">
            {showLoginMessage && (
                <div className="alert alert-warning" role="alert">
                    Por favor, <a href="/login">inicia sesión</a> o <a href="/signup">regístrate</a>  para poder añadir cosas al carrito.
                </div>
            )}
            <div className="row">
                {firstProductsDrinks.map(product => (
                    <div key={product.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-4">
                        <div className="card">
                            <img src={product.image_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h3 className="card-title text-center">{product.name}</h3>
                                <h4 className="card-text text-end p-1">{product.price.toFixed(2)}{" "}€</h4>
                                <div className="card-footer quantity-selector d-flex align-items-center justify-content-center">
                                    <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                                    <span className="px-2">{quantity}</span>
                                    <button onClick={incrementQuantity} className="btn btn-outline-secondary me-3">+</button>
                                    <button onClick={() => addToCart(product, quantity)} className="btn btn-success">Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
