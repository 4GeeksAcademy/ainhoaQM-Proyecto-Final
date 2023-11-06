import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const FirstDrinks = ({ setShowLoginMessage }) => {
  const { store, actions } = useContext(Context);
  const [firstProductsDrinks, setFirstProductsDrinks] = useState([]);

  const addToCart = (product, quantity) => {
    if (store.isAuthenticated) {
      actions.addToCart(product, quantity);
      console.log(`Se agregó ${quantity} ${product.name} al carrito.`);
      setQuantity(1);    
    } else {
      setShowLoginMessage(true);
    }
  };

  const setQuantity = (newQuantity) => {
    setFirstProductsDrinks(firstProductsDrinks.map((p) => ({ ...p, quantity: newQuantity })));
  };

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-3/products")
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.products.sort((a, b) => a.id - b.id);
        setFirstProductsDrinks(
          sortedProducts.map((product) => ({
            ...product,
            quantity: 1,
          }))
        );
        console.log(sortedProducts);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {firstProductsDrinks.slice(0, 4).map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-4">
            <div className="card">
              <img src={product.image_url} className="card-img-top card-img" alt={product.name}/>
              <div className="card-body d-flex flex-column justify-content-between"> 
                <h3 className="card-title text-center">{product.name}</h3>
                <div className="mt-auto"> 
                  <h4 className="card-text text-end p-1 mb-0">
                    {product.price.toFixed(2)} €
                  </h4>
                </div>
              </div>
              <div className="card-footer quantity-selector d-flex align-items-center justify-content-center">
                <button className="btn btn-outline-secondary"
                  onClick={() => {
                    const updatedProducts = firstProductsDrinks.map((p) =>
                      p.id === product.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                    );
                    setFirstProductsDrinks(updatedProducts);
                  }}> -
                </button>
                <span className="px-2">{product.quantity}</span>
                <button className="btn btn-outline-secondary me-3"
                  onClick={() => {
                    const updatedProducts = firstProductsDrinks.map((p) =>
                      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                    setFirstProductsDrinks(updatedProducts);
                  }}> +
                </button>
                <button onClick={() => addToCart(product, product.quantity)} className="btn btn-secondary"> Añadir </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};