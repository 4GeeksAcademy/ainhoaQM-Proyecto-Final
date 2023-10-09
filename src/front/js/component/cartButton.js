import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

//icons
import { TiShoppingCart } from "react-icons/ti";

export const CartButton = () => {
    const { store } = useContext(Context);
    const totalQuantity = store.cart.reduce((total, item) => total + item.quantity, 0);
    const [isFixed] = useState(false);

    return (
        <Link to={store.isAuthenticated ? "/cart" : "/login"} className={`btn btn-primary ${isFixed ? "fixed" : "initial"}`}>
            ({totalQuantity})<TiShoppingCart style={{ fontSize: "2rem" }}/>
        </Link>
    );
};
