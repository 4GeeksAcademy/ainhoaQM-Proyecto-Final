import React from "react";
import { useParams, Link } from 'react-router-dom';

export const Payment = () => {
  let { orderId } = useParams();
  return (
    <div className="body text-center">
        <p className="fs-1">{orderId}</p>
        <Link to={`/payment-ticket/${orderId}`} className="btn btn-primary">Pagar</Link>
    </div>
  );
};