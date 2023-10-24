import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/index.css";

//images
import cucharas from "../../img/cucharas.jpg";

export const FormMenu = ({ setShowLoginMessage }) => {
  const { store, actions } = useContext(Context);

  const areAllOptionsSelected = () => {
    return (
      selectedStarter.id !== null &&
      selectedDish.id !== null &&
      selectedDrink.id !== null &&
      selectedDessert.id !== null
    );
  };
  
  const resetSelects = () => {
    setSelectedStarter({ id: '', name: '' });
    setSelectedDish({ id: '', name: '' });
    setSelectedDrink({ id: '', name: '' });
    setSelectedDessert({ id: '', name: '' });
  };  

  const [starterOptions, setStarterOptions] = useState([]);
  const [dishOptions, setDishOptions] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState([]);
  const [dessertOptions, setDessertOptions] = useState([]);

  const [selectedStarter, setSelectedStarter] = useState({ id: '', name: '' });
  const [selectedDish, setSelectedDish] = useState({ id: '', name: '' });
  const [selectedDrink, setSelectedDrink] = useState({ id: '', name: '' });
  const [selectedDessert, setSelectedDessert] = useState({ id: '', name: '' });

  const addMenuToCart = () => {
    if (store.isAuthenticated) {

      const starterId = selectedStarter.id;
      const starterName = selectedStarter.name;
    
      const dishId = selectedDish.id;
      const dishName = selectedDish.name;
    
      const drinkId = selectedDrink.id;
      const drinkName = selectedDrink.name;
    
      const dessertId = selectedDessert.id;
      const dessertName = selectedDessert.name;

      const menuDescription = `Entrante: ${selectedStarter.name}, 1er Plato: ${selectedDish.name}, Bebida: ${selectedDrink.name}, Postre: ${selectedDessert.name}`;
      const menuProduct = { name: 'Menú', price: 12.00, description: menuDescription };

      const data = {
        starter_id: starterId, 
        dish_id: dishId, 
        drink_id: drinkId, 
        dessert_id: dessertId,
        starter_name: starterName,
        dish_name: dishName,
        drink_name: drinkName,
        dessert_name: dessertName
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
        
        const menuProductWithId = { ...menuProduct, id: data.menu.id }; 
        console.log(data.menu.id);

        actions.addToCart(menuProductWithId, 1);
        console.log(`Se agregó 1 menú al carrito.`);
        
        resetSelects();
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
          <select className="form-select form-select-lg" id="starter" 
            value={selectedStarter.id} 
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedName = e.target.options[e.target.selectedIndex].text;
              setSelectedStarter({ id: selectedId, name: selectedName });
            }}>
            <option value="">Selecciona una opción</option>
            {starterOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="dish" className="form-label">Plato Principal</label>
          <select className="form-select form-select-lg" id="dish"
            value={selectedDish.id} 
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedName = e.target.options[e.target.selectedIndex].text;
              setSelectedDish({ id: selectedId, name: selectedName });
            }}>
            <option value="">Selecciona una opción</option>
            {dishOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="drink" className="form-label">Bebida</label>
          <select className="form-select form-select-lg" id="drink"
            value={selectedDrink.id} 
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedName = e.target.options[e.target.selectedIndex].text;
              setSelectedDrink({ id: selectedId, name: selectedName });
            }}>
            <option value="">Selecciona una opción</option>
            {drinkOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="dessert" className="form-label">Postre</label>
          <select className="form-select form-select-lg" id="dessert"
            value={selectedDessert.id} 
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedName = e.target.options[e.target.selectedIndex].text;
              setSelectedDessert({ id: selectedId, name: selectedName });
            }}>
            <option value="">Selecciona una opción</option>
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
