import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  let { orderId } = useParams();

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
  

  return (
    <div className="Payment">
      <p className="fs-1">{orderId}</p>
      {totalPrice !== null && (
        <p>Total Price: {totalPrice}</p>
      )}
    </div>
  );
};