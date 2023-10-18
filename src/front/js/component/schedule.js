import React from "react";

export const Schedule = () => {
  return (
    <div>
        <h1 className="subtitle p-1">Entre Semana</h1>
        <div className="d-flex justify-content-between">
        <div className="flex-grow-1 text-end px-1">
            <p>Lunes</p>
            <p>Martes</p>
            <p>Miercoles</p>
            <p>Jueves</p>
            <p>Viernes</p>
        </div>
        <div className="flex-grow-1 text-start px-1">
            <p>CERRADOS</p>
            <p>12 pm A 4 pm | 7 pm A 10 pm</p>
            <p>12 pm A 4 pm | 7 pm A 10 pm</p>
            <p>12 pm A 4 pm | 7 pm A 10 pm</p>
            <p>12 pm A 4 pm | 7 pm A 10 pm</p>
        </div>
        </div>
        <h1 className="subtitle p-1 pt-3">Fin de Semana y Festivos</h1>
        <div className="d-flex justify-content-between">
        <div className="flex-grow-1 text-end px-1">
            <p>Sábados</p>
            <p>Domingos</p>
            <p>Festivos</p>
        </div>
        <div className="flex-grow-1 text-start px-1">
            <p>8 am A 4 pm | 7 pm A 12 pm</p>
            <p>8 am A 4 pm | 7 pm A 12 pm</p>
            <p>8 am A 4 pm | 7 pm A 12 pm</p>
        </div>
        </div>
    </div>
  );
};

