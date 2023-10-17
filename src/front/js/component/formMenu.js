import React, { useState, useEffect } from 'react';

export const FormMenu = ({ actions }) => {
  const [starterOptions, setStarterOptions] = useState([]);
  const [dishesOptions, setDishesOptions] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState([]);
  const [dessertOptions, setDessertOptions] = useState([]);
  const [selectedStarter, setSelectedStarter] = useState('');
  const [selectedDishes, setSelectedDishes] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedDessert, setSelectedDessert] = useState('');

    const handleAddToCart = () => {
        const menuDescription = `Starter: ${selectedStarter}, Dishes: ${selectedDishes}, Drink: ${selectedDrink}, Dessert: ${selectedDessert}`;
        const menuProduct = { name: 'menu', price: 12, description: menuDescription };
        console.log('Product to add to cart:', menuProduct);
        actions.addToCart(menuProduct, 1);

        setSelectedStarter('');
        setSelectedDishes('');
        setSelectedDrink('');
        setSelectedDessert('');
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
      <h2>Selecciona tu Menú</h2>
      <div className="mb-3">
        <label htmlFor="starter" className="form-label">Starter</label>
        <select
          className="form-select form-select-lg"
          id="starter"
          value={selectedStarter}
          onChange={(e) => setSelectedStarter(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          {starterOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="dishes" className="form-label">Plato Principal</label>
        <select
          className="form-select form-select-lg"
          id="dishes"
          value={selectedDishes}
          onChange={(e) => setSelectedDishes(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          {dishesOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="drink" className="form-label">Bebida</label>
        <select
          className="form-select form-select-lg"
          id="drink"
          value={selectedDrink}
          onChange={(e) => setSelectedDrink(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          {drinkOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="dessert" className="form-label">Postre</label>
        <select
          className="form-select form-select-lg"
          id="dessert"
          value={selectedDessert}
          onChange={(e) => setSelectedDessert(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          {dessertOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <button type="button" className="btn btn-secondary" onClick={handleAddToCart}>Agregar al Carrito</button>
    </div>
  );
};
