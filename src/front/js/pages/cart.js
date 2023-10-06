import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";


export const Cart = () => {
    const { store, actions } = useContext(Context);

    const handleAddMore = (productId) => {
        actions.incrementQuantity(productId); 
    }

    const handleSubtractOne = (productId) => {
        actions.decrementQuantity(productId); 
    }

    const handleRemove = (productId) => {
        actions.removeFromCart(productId);
    }

    const handleClearCart = () => {
        actions.clearCart();
    }

    return (
        <div className="container">
            <h1 className="h1">Productos en el carrito</h1>
            <ul className="list-group">
                {store.cart.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.name} - Cantidad: {item.quantity} - Precio: {(item.price * item.quantity).toFixed(2)}
                        <div>
                            <button className="btn btn-secondary mr-2" onClick={() => handleAddMore(item.id)}>+</button>
                            <button className="btn btn-secondary mr-2" onClick={() => handleSubtractOne(item.id)}>-</button>
                            <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-3">
                <h4>Total: {
                    store.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
                }</h4>
            </div>
            <div className="mt-3">
                <button className="btn btn-warning mr-2" onClick={handleClearCart}>Vaciar carrito</button>
                <button className="btn btn-success">
                    <Link to="/ticket" style={{ color: "white", textDecoration: "none" }}>Pagar</Link>
                </button>
            </div>
        </div>
    );    
};




