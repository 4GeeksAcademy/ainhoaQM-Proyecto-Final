import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

//stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FormPayment } from "../component/formPayment";
import "../../styles/stripe.css";

export const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  let { orderId } = useParams();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#ff7e67',
      colorText: '#474852',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(process.env.BACKEND_URL + `/api/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      const totalPriceInCents = data.total_price ? Math.round(data.total_price * 100) : null;
      if (totalPriceInCents !== null) {
        console.log("Total Price en centavos:", totalPriceInCents);
        setTotalPrice(totalPriceInCents);
      } else {
        console.error("El precio no es válido:", data.total_price);
      }
    })
    .catch((error) => {
      console.error("Error al hacer el fetch:", error);
    });
  }, [orderId]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(process.env.BACKEND_URL + "/api/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="Payment">
      <p className="fs-1">{orderId}</p>
      {totalPrice !== null && (
        <p>Total Price: {totalPrice}</p>
      )}
      {clientSecret && (
        <Elements stripe={stripePromise} options={options} >
          <FormPayment />
        </Elements>
      )}
    </div>
  );
};