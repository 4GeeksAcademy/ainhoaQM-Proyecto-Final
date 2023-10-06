const getState = ({ getStore, setStore }) => {
    return {
        store: {
            isAuthenticated: false,
            userName: '',
            cart: [
                {
                    id: 1,
                    name: "Producto Default",
                    price: 10.25,
                    quantity: 1
                }
            ],
        },
        actions: {
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error);
				}
			},

            setIsAuthenticated: value => {
                const store = getStore();
                setStore({ isAuthenticated: value });
            },

            logout: () => {
                const store = getStore();
                localStorage.removeItem('token');
                setStore({
                    isAuthenticated: false,
                    userName: '',
                });
            },
			
            addToCart: (product, quantity) => {
                const store = getStore();
                const updatedCart = [...store.cart, { ...product, quantity }];
                setStore({ cart: updatedCart });
            },
            
            incrementQuantity: (productId) => {
                const store = getStore();
                const updatedCart = store.cart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
                setStore({ cart: updatedCart });
            },

            decrementQuantity: (productId) => {
                const store = getStore();
                const updatedCart = store.cart.map(item =>
                    item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
                );
                setStore({ cart: updatedCart });
            },

            removeFromCart: (productId) => {
                const store = getStore();
                const updatedCart = store.cart.filter(product => product.id !== productId);
                setStore({ cart: updatedCart });
            },

            clearCart: () => {
                setStore({ cart: [] });
            }
        }
    };
};

export default getState;

