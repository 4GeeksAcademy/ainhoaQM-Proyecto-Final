import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/index.css";

//images
import cucharas from "../../img/cucharas.jpg";

export const FormMenu = ({ setShowLoginMessage }) => {
  const { store, actions } = useContext(Context);

  const areAllOptionsSelected = () => {
    return selectedStarter !== '' && selectedDishes !== '' && selectedDrink !== '' && selectedDessert !== '';
  };

  const [selectedStarter, setSelectedStarter] = useState('');
  const [selectedDishes, setSelectedDishes] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedDessert, setSelectedDessert] = useState('');
  
  const [starterOptions, setStarterOptions] = useState([]);
  const [dishesOptions, setDishesOptions] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState([]);
  const [dessertOptions, setDessertOptions] = useState([]);


  const addMenuToCart = () => {
    if (store.isAuthenticated) {
      const menuDescription = `Entrante: ${selectedStarter}, 1er Plato: ${selectedDishes}, Bebida: ${selectedDrink}, Postre: ${selectedDessert}`;
      const menuProduct = { name: 'Menú', price: 12.00, description: menuDescription };
      actions.addToCart(menuProduct, 1); 
      setSelectedStarter('');
      setSelectedDishes('');
      setSelectedDrink('');
      setSelectedDessert('');
      console.log(`Se agregó 1 menú al carrito.`);
    } else {
      setShowLoginMessage(true);
    }
  };

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-1/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const starterNames = data.products.map(starter => starter.name);
        setStarterOptions(starterNames);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-2/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const dishesNames = data.products.map(dish => dish.name);
        setDishesOptions(dishesNames);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-3/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const drinksNames = data.products.map(drink => drink.name);
        setDrinkOptions(drinksNames);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-4/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const dessertsNames = data.products.map(dessert => dessert.name);
        setDessertOptions(dessertsNames);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 image-container">
          <img src={cucharas} alt="Cucharas" className="image"/> 
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
          <h2>Selecciona tu Menú</h2>
          <label htmlFor="starter" className="form-label">Entrante</label>
          <select className="form-select form-select-lg" id="starter" 
            value={selectedStarter} onChange={(e) => setSelectedStarter(e.target.value)} >
            <option>Selecciona una opción</option>
            {starterOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <label htmlFor="dishes" className="form-label">Plato Principal</label>
          <select className="form-select form-select-lg" id="dishes"
            value={selectedDishes} onChange={(e) => setSelectedDishes(e.target.value)}>
            <option>Selecciona una opción</option>
            {dishesOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <label htmlFor="drink" className="form-label">Bebida</label>
          <select className="form-select form-select-lg" id="drink"
            value={selectedDrink} onChange={(e) => setSelectedDrink(e.target.value)}>
            <option>Selecciona una opción</option>
            {drinkOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <label htmlFor="dessert" className="form-label">Postre</label>
          <select className="form-select form-select-lg" id="dessert"
            value={selectedDessert} onChange={(e) => setSelectedDessert(e.target.value)}>
            <option>Selecciona una opción</option>
            {dessertOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
            <button type="button" className="btn btn-secondary mt-3 float-end" 
            onClick={addMenuToCart} disabled={!areAllOptionsSelected()}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};