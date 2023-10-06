import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CartButton = ({ onClick }) => {
    const { store } = useContext(Context);
    const totalQuantity = store.cart.reduce((total, item) => total + item.quantity, 0);

    const handleClick = () => {
        if (store.isAuthenticated) {
            history.push("/cart");
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <Link to={store.isAuthenticated ? "/cart" : "/login"} className="btn btn-primary">
            Carrito ({totalQuantity})
        </Link>
    );
};
