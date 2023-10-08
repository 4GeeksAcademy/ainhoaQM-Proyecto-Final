import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

//icons
import { TiShoppingCart } from "react-icons/ti";

export const CartButton = ({ onClick }) => {
    const { store } = useContext(Context);
    const totalQuantity = store.cart.reduce((total, item) => total + item.quantity, 0);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsFixed(scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        if (store.isAuthenticated) {
            history.push("/cart");
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <Link to={store.isAuthenticated ? "/cart" : "/login"} className={`btn btn-primary ${isFixed ? "fixed" : "initial"}`}>
            <TiShoppingCart/> ({totalQuantity})
        </Link>
    );
};
