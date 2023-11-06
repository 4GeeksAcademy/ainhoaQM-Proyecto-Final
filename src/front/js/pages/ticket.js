import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../../styles/tickets.css";

//jsPDF
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

//images
import abstract from '../../img/abstract.jpg';
import ComerComidaSquare from '../../img/ComerComidaSquare.png';


export const Ticket = () => {
  const { orderId } = useParams();
  const [order, setorder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(process.env.BACKEND_URL + `/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setorder(data);
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [orderId]);  

  //Empieza jsPDF
  const generatePDF = () => {
    if (order) {
      const doc = new jsPDF();
      const styles = {
        headStyles: {
          fillColor: [254, 132, 109],
        },
        startY: 130,
        columnStyles: {
          0: { cellWidth: 19, halign: 'right' },
          1: { halign: 'left' },
          2: { cellWidth: 18, halign: 'right' }
        },
        bodyStyles: {   
          fontSize: 12,
        }
      };
      const subtotal = order.order_details.reduce((acc, detail) => acc + detail.price, 0).toFixed(2);
      const descuento = order.discount_code ? `${order.discount_code.code}: ${order.discount_code.percentage}%` : '';
      const total = order.total_price.toFixed(2);
      const takeawayText = order.takeaway ? "Comida para llevar" : "Comer en restaurante";
      const imgWidth = 70;
      const imgHeight = 65;
      const imgX = 15;
      const imgY = 5;
      let yPositionTotal = doc.autoTable.previous.finalY + 10;

      // Empezamos a generar el pdf
        //Encabezado
      doc.addImage(ComerComidaSquare, 'JPEG', imgX, imgY, imgWidth, imgHeight);
      doc.setTextColor(255, 83, 52);
      doc.setFontSize(20);
      doc.text(`Comer Comida`, 195, 15, null, null, "right");
      doc.setFontSize(12);
      doc.setTextColor(82, 86, 89);
      doc.text(`C/ Falsa 123, BCN`,  195, 30,null, null, "right");
      doc.text(`NIF A12345678`,  195, 25,null, null, "right");
      doc.text(`Teléfono: 999 999 999`,195, 35,  null, null, "right");
      doc.text(`www.ComerComida.com`, 195, 40, null, null, "right");
      doc.text(`${order.order_date}`, 195, 60, null, null, "right");
      doc.text(`Nº de Pedido: ${order.id}`, 195, 65, null, null, "right");
        //Termina Encabezado
      doc.setFontSize(80);
      doc.setTextColor(255, 83, 52);
      doc.text(`¡`, 40, 98);
      doc.text(`!`, 158, 102);
      doc.setFontSize(40);
      doc.text(`Muchas Gracias`, 52, 90);
      doc.text(`Por Tu Compra`, 55, 105);
      doc.setFontSize(30);
      doc.setTextColor(254, 132, 109);
      doc.text(`Detalles del Pedido`, 60, 125);
      doc.setTextColor(82, 86, 89);
      doc.setFontSize(12);

      const columns = [
        { header: 'Cantidad', dataKey: 'cantidad'},
        { header: 'Productos', dataKey: 'producto'},
        { header: 'Precio', dataKey: 'precio'}
      ];

      const rows = [];

      order.order_details.forEach(detail => {
        if (detail.menu_id) {
          rows.push([{content: detail.quantity}, {content: `Menú`}, {content: `${detail.price.toFixed(2)} €`}]);
          if (detail.menu_description) {
            detail.menu_description.split(',').forEach((item, i) => {
              rows.push(["", item.trim(), ""]);
            });
          }
        }
        if (detail.product_id) {rows.push( [{content: detail.quantity }, {content: `${detail.product_name}`}, {content: `${detail.price.toFixed(2)} €`}])}
      });
      
      autoTable(doc, {
        columns,
        body: rows,
        ...styles,
      });

      // Debajo de la tabla
      doc.setFontSize(12);
      doc.text(`Metodo de Pago: ${order.payment_method}`, 15, doc.autoTable.previous.finalY + 20);
      const estadoPedidoTexto = (order.payment_method === "datafono" || order.payment_method === "efectivo")
        ? "Falta pagar"
        : (order.payment_method === "tarjeta")
          ? "Pagado"
          : "";

      doc.text(`Estado del pedido: ${estadoPedidoTexto}`, 15, doc.autoTable.previous.finalY + 10);
      doc.text(takeawayText, 15, doc.autoTable.previous.finalY + 30);
      doc.text(`Total: ${total} €`, 195, yPositionTotal, null, null, "right");

      if (order.discount_code) {
        doc.text(`Subtotal: ${subtotal} €`, 195, doc.autoTable.previous.finalY + 10, null, null, "right");
        doc.text("Código de Descuento", 195, doc.autoTable.previous.finalY + 20, null, null, "right");
        doc.text(descuento, 195, doc.autoTable.previous.finalY + 30, null, null, "right");
        yPositionTotal += 30; 
      }

      if (order.order_comments) {
        const comments = order.order_comments;
        const maxWidth = 180;
        const lineHeight = 10;
        const commentsArray = doc.splitTextToSize(comments, maxWidth);
      
        doc.setFontSize(12);
        doc.text('Comentarios del Pedido:', 15, doc.autoTable.previous.finalY + 40);
      
        let yPosition = doc.autoTable.previous.finalY + 50;
      
        commentsArray.forEach(line => {
          doc.text(line, 15, yPosition);
          yPosition += lineHeight;
        });
      }
      // Guardar el PDF
      doc.save(`ticket_compra_${order.id}.pdf`);
    }
  };
  // Termina jsPDF

  return (
    <div className="body ticket-background-abstract d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${abstract})`}}>
        <div className="row m-5">
          <div className="col-12 ticket-shadow ticket-rounded ticket-bg-light mb-2">
            <h1 className="ffBG display-5 text-center ticket-color-pink py-3"> ¡Muchas Gracias <br/> Por Tu Compra!</h1>
            <h4 className="ticket-subtitle text-center pb-3"> Este es tu número de pedido: <span className="ticket-color-black">{orderId}</span> </h4>
            <div className=" m-1 p-3 border border-2 border-danger border-opacity-50 ticket-rounded">
              {order && (
                <>
                  <h4 className="text-center pb-1 ticket-color-pink">Detalles del Pedido</h4> 
                  <div className="d-flex justify-content-between pb-2">
                    <p>Nº {order.id}</p>
                    <p className="text-end">{order.order_date}</p>
                  </div>
                  <h4 className="ticket-subtitle">Productos</h4>
                  {order.order_details.some(detail => detail.menu_id) && (
                    <>
                      {order.order_details.map((detail, index) => (
                        <div key={index}>
                          {detail.menu_id && (
                            <>
                              <div className="d-flex justify-content-between">
                                <p> Menú {detail.quantity > 1 && `X ${detail.quantity}`} </p> 
                                <p>{detail.price.toFixed(2)} €</p>
                              </div>
                              {detail.menu_description && detail.menu_description.split(',').map((item, i) => (
                                <p key={i}>{item.trim()}</p>
                              ))}
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {order.order_details.some(detail => detail.product_id) && (
                    <>
                      {order.order_details.map((detail, index) => (
                        <div key={index}>
                          {detail.product_id && (
                            <div className="d-flex justify-content-between">
                              <p> {detail.product_name} {detail.quantity > 1 && `X ${detail.quantity}`} </p> 
                              <p> {detail.price.toFixed(2)} €</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {order.discount_code && (
                    <>
                      <p className="pt-2 text-end">Subtotal: {order.order_details.reduce((acc, detail) => acc + detail.price, 0).toFixed(2)} €</p>
                      <p className="pt-2 text-end">Código de Descuento</p>
                      <p className="text-end">{order.discount_code.code}:{" "}{order.discount_code.percentage}%</p>
                    </>
                  )}
                  <p className="pt-2 text-end">Total: {order.total_price.toFixed(2)} €</p>
                  {order.order_comments && (
                    <>
                      <p>Comentarios: </p>
                      <p className="ticket-comment">{order.order_comments}</p>
                    </>
                  )}
                </>
              )}
            </div>
            <button className="btn btn-secondary float-end mt-1" onClick={generatePDF}>Descargar Factura</button>
            <h4 className="ticket-subtitle text-center mt-5 py-3">¡Que aproveche y sobre todo no te olvides de disfrutar!</h4>
          </div>
        </div>
    </div>
  );
};