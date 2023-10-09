import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import "../../styles/index.css";

export const Ticket = () => {
    const { store } = useContext(Context);
    const cart = store.cart;
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handlePayment = (e) => {
        e.preventDefault();
        if (acceptTerms) {
            alert("Pago procesado exitosamente. ¡Gracias por tu compra!");
        } else {
            alert("Por favor, acepta los términos y condiciones para finalizar el pedido.");
        }
    };

    const handleAcceptTerms = () => {
        setAcceptTerms(!acceptTerms);
    };

    const handleTakeawayOption = (option) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((item) => item !== option)
            : [...selectedOptions, option];
        setSelectedOptions(updatedOptions);
    };    

    return (
        <div className="container body">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Inicio</a></li>
                    <li className="breadcrumb-item"><a href="/shop">Tienda</a></li>
                    <li className="breadcrumb-item"><a href="/cart">Cesta</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Confirmar Pedido</li>

                </ol>
            </nav>
            <h1 className="h1">Resumen de la Compra</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - Cantidad: {item.quantity} - Precio: {(item.price * item.quantity).toFixed(2)}
                    </li>
                ))}
            </ul>
            <form onSubmit={handlePayment}>
                <div>
                    <h1 className="h1">¿Dónde quieres disfrutar de tu comida?</h1>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="eatInRestaurant"
                            name="eatingOption"
                            value="restaurant"
                            checked={selectedOptions.includes("restaurant")}
                            onChange={() => handleTakeawayOption("restaurant")}
                        />
                        <label className="form-check-label" htmlFor="eatInRestaurant">
                            En el restaurante
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="takeaway"
                            name="eatingOption"
                            value="takeaway"
                            checked={selectedOptions.includes("takeaway")}
                            onChange={() => handleTakeawayOption("takeaway")}
                        />
                        <label className="form-check-label" htmlFor="takeaway">
                            Prefiero la comida para llevar
                        </label>
                    </div>
                    {selectedOptions.includes("takeaway") && (
                        <div>
                            <h1 className="h1">¿Cómo prefieres recibir tu comida para llevar?</h1>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="pickup"
                                    name="takeawayOption"
                                    value="pickup"
                                    checked={selectedOptions.includes("pickup")}
                                    onChange={() => handleTakeawayOption("pickup")}
                                />
                                <label className="form-check-label" htmlFor="pickup">
                                    Recoger en el restaurante
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="delivery"
                                    name="takeawayOption"
                                    value="delivery"
                                    checked={selectedOptions.includes("delivery")}
                                    onChange={() => handleTakeawayOption("delivery")}
                                />
                                <label className="form-check-label" htmlFor="delivery">
                                    Mejor tráemelo a casa
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <label htmlFor="inputDiscountCode" className="form-label">
                        <h1 className='h1'>¿Tienes un cupón de descuento?</h1>
                    </label>
                    <p>Si tienes un cupón de descuento, ingrésalo a continuación:</p>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="inputDiscountCode"
                            placeholder="Código de descuento"
                            aria-label="Código de descuento"
                            aria-describedby="button-addon2"
                        />
                        <button className="btn btn-secondary" type="button" id="button-addon2">
                            Enviar
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="h1">¿Cómo quieres pagar?</h1>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="payWithCard"
                            name="paymentOption"
                            value="card"
                        />
                        <label className="form-check-label" htmlFor="payWithCard">
                            Pagar online con Tarjeta
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="payWithPaypal"
                            name="paymentOption"
                            value="paypal"
                        />
                        <label className="form-check-label" htmlFor="payWithPaypal">
                            Datáfono en tienda
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="payWithCash"
                            name="paymentOption"
                            value="cash"
                        />
                        <label className="form-check-label" htmlFor="payWithCash">
                            Pagar en Efectivo
                        </label>
                    </div>
                </div>
                <div>
                    <h1 className="h1">Comentarios del Pedido</h1>
                    <p>Observaciones:</p>
                    <textarea className="form-control" rows="4" maxLength="2000" placeholder="Escribe tus comentarios aquí..."/>
                </div>
                <div>
                    <h1 className="h1">Política de privacidad</h1>
                        <p>Debes aceptar el aviso legal y las condiciones de uso antes de continuar</p>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={acceptTerms}
                                onChange={handleAcceptTerms}
                            />
                            <label className="form-check-label">
                                He leído y acepto la <Link to="/wip">Política de Privacidad</Link> y las <Link to="/wip">Condiciones generales de compra</Link>.
                            </label>
                        </div>
                    </div>
                <button type="submit" className={`btn btn-success ${!acceptTerms ? "disabled-button" : ""}`} 
                    disabled={!acceptTerms}>
                    Finalizar Pedido
                </button>
                <button type="submit" className="btn btn-success">Cancelar Pedido</button>
            </form>
        </div>
    );
};
