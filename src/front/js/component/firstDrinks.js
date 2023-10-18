import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const FirstDrinks = ({ setShowLoginMessage }) => {
  const { store, actions } = useContext(Context);
  const [firstProductsDrinks, setFirstProductsDrinks] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product, quantity) => {
    if (store.isAuthenticated) {
      actions.addToCart(product, quantity);
      setQuantity(1);
      console.log(`Se agregó ${quantity} ${product.name} al carrito.`);
    } else {
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
    fetch(process.env.BACKEND_URL + "/api/category-3/products")
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.products.sort((a, b) => a.id - b.id);
        setFirstProductsDrinks(sortedProducts);
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
              <img
                src={product.image_url}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column justify-content-between"> 
                <h3 className="card-title text-center">{product.name}</h3>
                <div className="mt-auto"> 
                  <h4 className="card-text text-end p-1 mb-0">
                    {product.price.toFixed(2)} €
                  </h4>
                </div>
              </div>
              <div className="card-footer quantity-selector d-flex align-items-center justify-content-center">
                <button
                  onClick={decrementQuantity}
                  className="btn btn-outline-secondary"
                >
                  -
                </button>
                <span className="px-2">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="btn btn-outline-secondary me-3"
                >
                  +
                </button>
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="btn btn-secondary"
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};