import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  let { orderId } = useParams();
  const navigate = useNavigate();

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

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ticket/${orderId}`);


    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCVV("");
  };

  return (
    <div className="body section col-12">
      <div className="Payment">
        <p className="subtitle display-6 pb-2">Pedido Nº {orderId}</p>
        {/*{totalPrice !== null && (
        <p>Total Price: {totalPrice}</p>
      )}  */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="cardNumber" className="form-label">Número de Tarjeta</label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          pattern="[0-9]*"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        </div>
        <div className="mb-3">
          <label htmlFor="cardHolder" className="form-label">Titular de la Tarjeta</label>
          <input
            type="text"
            className="form-control"
            id="cardHolder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="expiryDate" className="form-label">Fecha de Expiración (mm/aaaa)</label>
        <input
          type="text"
          className="form-control"
          id="expiryDate"
          pattern="\d{2}/\d{4}"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        </div>
        <div className="mb-3">
        <label htmlFor="cvv" className="form-label">CVV</label>
        <input
          type="text"
          className="form-control"
          id="cvv"
          pattern="[0-9]*"
          value={cvv}
          onChange={(e) => setCVV(e.target.value)}
          required
        />
        </div>
        <button type="submit" className="btn btn-secondary col-12">Pagar</button>
      </form>
    </div>
  );
};
