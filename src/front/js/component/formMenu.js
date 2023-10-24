import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/index.css";

//images
import cucharas from "../../img/cucharas.jpg";

export const FormMenu = ({ setShowLoginMessage }) => {
  const { store, actions } = useContext(Context);

  const areAllOptionsSelected = () => {
    return (
      selectedStarterId !== undefined &&
      selectedDishId !== undefined &&
      selectedDrinkId !== undefined &&
      selectedDessertId !== undefined
    );
  };
  

  const [selectedStarter, setSelectedStarter] = useState('');
  const [selectedDish, setSelectedDish] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedDessert, setSelectedDessert] = useState('');

  const [selectedStarterId, setSelectedStarterId] = useState();
  const [selectedDishId, setSelectedDishId] = useState();
  const [selectedDrinkId, setSelectedDrinkId] = useState();
  const [selectedDessertId, setSelectedDessertId] = useState();

  const [starterOptions, setStarterOptions] = useState([]);
  const [dishOptions, setDishOptions] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState([]);
  const [dessertOptions, setDessertOptions] = useState([]);

  const addMenuToCart = () => {
    if (store.isAuthenticated) {
      const menuDescription = `Entrante: ${selectedStarter}, 1er Plato: ${selectedDish}, Bebida: ${selectedDrink}, Postre: ${selectedDessert}`;
      const menuProduct = { name: 'Menú', price: 12.00, description: menuDescription };

      const data = {
        starter_id: selectedStarterId, 
        dish_id: selectedDishId, 
        drink_id: selectedDrinkId, 
        dessert_id: selectedDessertId,
        starter_name: selectedStarter,
        dish_name: selectedDish,
        drink_name: selectedDrink,
        dessert_name: selectedDessert
      };
      console.log('Data a enviar:', data);

      fetch(process.env.BACKEND_URL + "/api/create-menu", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Nuevo menú creado:', data);
        
        const menuProductWithId = { ...menuProduct, id: data.id }; 
        actions.addToCart(menuProductWithId, 1);
        setSelectedStarter('');
        setSelectedDish('');
        setSelectedDrink('');
        setSelectedDessert('');
        console.log(`Se agregó 1 menú al carrito.`);
      })
      .catch((error) => {
        console.error('Error al crear el menú:', error);
      });

    } else {
      setShowLoginMessage(true);
    }
  };

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-1/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const starterOptions = data.products.map(starter => {
          return { id: starter.id, name: starter.name };
        });
        setStarterOptions(starterOptions);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-2/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const dishOptions = data.products.map(dish => {
          return { id: dish.id, name: dish.name };
        });
        setDishOptions(dishOptions);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-3/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const drinkOptions = data.products.map(drink => {
          return { id: drink.id, name: drink.name };
        });
        setDrinkOptions(drinkOptions);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/category-4/products")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const dessertOptions = data.products.map(dessert => {
          return { id: dessert.id, name: dessert.name };
        });
        setDessertOptions(dessertOptions);
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
          <select className="form-select form-select-lg" id="starter" value={selectedStarterId} onChange={(e) => setSelectedStarterId(e.target.value)} >
            <option>Selecciona una opción</option>
            {starterOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="dish" className="form-label">Plato Principal</label>
          <select className="form-select form-select-lg" id="dish"
            value={selectedDishId} onChange={(e) => setSelectedDishId(e.target.value)}>
            <option>Selecciona una opción</option>
            {dishOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="drink" className="form-label">Bebida</label>
          <select className="form-select form-select-lg" id="drink"
            value={selectedDrinkId} onChange={(e) => setSelectedDrinkId(e.target.value)}>
            <option>Selecciona una opción</option>
            {drinkOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="dessert" className="form-label">Postre</label>
          <select className="form-select form-select-lg" id="dessert"
            value={selectedDessertId} onChange={(e) => setSelectedDessertId(e.target.value)}>
            <option>Selecciona una opción</option>
            {dessertOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-secondary mt-3 float-end"onClick={addMenuToCart} disabled={!areAllOptionsSelected()}> Agregar al Carrito </button>
        </div>
      </div>
    </div>
  );
};
