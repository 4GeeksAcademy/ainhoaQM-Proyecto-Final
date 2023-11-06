const getState = ({ getStore, setStore }) => {
    return {
        store: {
            isAuthenticated: false,
            userName: '',
            cart: [
            ],
            discountPercentage: 0,
        },
        actions: {
			getMessage: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				}catch(error){
					console.log("Error loading message from backend", error);
				}
			},

            setIsAuthenticated: (value, userName) => {
                const store = getStore();
                setStore({ isAuthenticated: value, userName: userName });
            },

            logout: () => {
                getStore();
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                setStore({
                    isAuthenticated: false,
                    userName: '',
                });
            },
			
            addToCart: (product, quantity) => {
                const store = getStore();
                const updatedCart = [...store.cart, { ...product, quantity }];
                setStore({ cart: updatedCart });
                console.log(store.cart)
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            },

            addMenuToCart: (menuData) => {
                const { id, menu_description, price } = menuData.menu;
                const menuProduct = {id, name: 'menu', price, description: menu_description };
                setStore(prevState => ({
                    cart: [...prevState.cart, menuProduct]
                }));
                console.log('Menu añadido al carrito:', menuProduct);
                localStorage.setItem('cart', JSON.stringify([...getStore().cart, menuProduct]));
            },      
            
            setCart: cart => {
                setStore({ cart });
                localStorage.setItem('cart', JSON.stringify(cart));
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
            
            setDiscountPercentage: percentage => {
                setStore({ discountPercentage: percentage });
            },  
            
            validateDiscount: async (discountCode) => {
                try { 
                    const token = localStorage.getItem('token');
                    const response = await fetch(process.env.BACKEND_URL + "/api/validate-discount", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                        body: JSON.stringify({ code: discountCode })
                    });
                    const data = await response.json();
                    console.log("codigo de descuento", data)
                    return data;
                } catch (error) {
                    console.error('Error al validar el código de descuento:', error);
                    return null;
                }
            },

            removeFromCart: (productId) => {
                const store = getStore();
                const updatedCart = store.cart.filter(product => product.id !== productId);
                setStore({ cart: updatedCart });
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            },

            clearCart: () => {
                setStore({ cart: [] });
                localStorage.removeItem('cart'); 
            }
        }
    };
};

export default getState;