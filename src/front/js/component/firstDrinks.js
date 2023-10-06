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
        fetch('https://3001-4geeksacade-ainhoaqmpro-uo0f993hh47.ws-eu105.gitpod.io/api/category-3/first_products')
            .then(response => response.json())
            .then(data => {
                setFirstProductsDrinks(data.products);
                console.log(data.products);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    useEffect(() => {
        // Después de cargar los productos, inicializamos el carrusel
        if (firstProductsDrinks.length > 0) {
            $('.owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            });
        }
    }, [firstProductsDrinks]);

    return (
        <div className="container">
            {showLoginMessage && (
                <div className="alert alert-warning" role="alert">
                    Por favor, <a href="/login">inicia sesión</a> o <a href="/signup">regístrate</a>  para poder añadir cosas al carrito.
                </div>
            )}
            <div className="owl-carousel">
                {firstProductsDrinks.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={product.image_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price.toFixed(2)}</p>
                                <div className="quantity-selector">
                                    <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                                    <span>{quantity}</span>
                                    <button onClick={incrementQuantity} className="btn btn-outline-secondary">+</button>
                                </div>
                                <button onClick={() => addToCart(product, quantity)} className="btn btn-success">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
