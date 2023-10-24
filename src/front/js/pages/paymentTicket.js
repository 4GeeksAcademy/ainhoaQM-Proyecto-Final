import React from "react";
import { useParams } from 'react-router-dom';
import "../../styles/tickets.css";

//images
import cucharas from '../../img/cucharas.jpg';
import abstract from '../../img/abstract.jpg';
import ComerComida from '../../img/ComerComida.jpg';


export const PaymentTicket = () => {
  let { orderId } = useParams();
  return (
    <div className="body text-center ticket-background-abstract" style={{backgroundImage: `url(${abstract})`}}>
        <div className="row m-5">
          <div className="col-sm-12 col-md-6 ticket ticket-rounded ticket-shadow ticket-bg-light mb-2">
            <h1 className="ffBG display-4 ticket-color-pink">¡Muchas Gracias Por Tu Compra!</h1>
            <h4 className="ticket-subtitle">Este es tu numero de ticket para pagar y recoger tu pedido</h4>
            <p className="fs-1">{orderId}</p>
            <h4 className="ticket-subtitle pb-5">¡Que aproveche y sobreto no te olvides de disfrutar!</h4>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="ticket-image-container pb-2">
              <img src={ComerComida} alt="Imagen logo" className="ticket-image"/>
            </div>
            <div className="ticket-image-container justify-content-center mb-2">
              <img src={cucharas} alt="Imagen de unas cucharas" className="ticket-image"/>
            </div>
          </div>
        </div>
    </div>
  );
};