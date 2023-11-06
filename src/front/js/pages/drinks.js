import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

//icons
import { PiWarningCircleDuotone } from "react-icons/pi";

export const Drinks = () => {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

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
    setProducts(products.map((p) => ({ ...p, quantity: newQuantity })));
  };

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-3/products")
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.products.sort((a, b) => a.id - b.id);
        setProducts(
          sortedProducts.map((product) => ({
            ...product,
            quantity: 1,
          }))
        );
        console.log(sortedProducts);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (showLoginMessage) {
      window.scrollTo(0, 0);
    }
  }, [showLoginMessage]);

  return (
    <div className="container body">
      {showLoginMessage && (
        <div className="alert alert-warning d-flex justify-content-center align-items-center" role="alert">
          <div className="icon-warning"><PiWarningCircleDuotone /></div>
          <div>
            Por favor, <a href="/auth-page">inicia sesión</a> o{" "}
            <a href="/signup">regístrate</a> para poder añadir productos al carrito
          </div>
        </div>
      )}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/"> Inicio </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/shop"> Carta </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page"> Bebidas </li>
        </ol>
      </nav>
      <div className="jumbotron-category p-2 mb-4 rounded-3">
        <div className="container-fluid py-5">
          <h1 className="h1 display-1 text-center"> Bebidas </h1>
        </div>
      </div>
      <h2 className="subtitle display-6"> Refrescos 500 ml </h2>
      <hr className="my-1" />
      <div className="row p-3">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-4">
            <div className="card">
              <img src={product.image_url} className="card-img-top card-img" alt={product.name} />
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
                    const updatedProducts = products.map((p) =>
                      p.id === product.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                    );
                    setProducts(updatedProducts);
                  }} > - 
                </button>
                <span className="px-2">{product.quantity}</span>
                <button className="btn btn-outline-secondary me-3"
                  onClick={() => {
                    const updatedProducts = products.map((p) =>
                      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                    setProducts(updatedProducts);
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
