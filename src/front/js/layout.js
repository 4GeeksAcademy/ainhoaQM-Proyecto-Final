import React, { useContext } from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

//Pages
import { LandingPage } from "./pages/landingPage";
import { Shop } from "./pages/shop";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Drinks } from "./pages/drinks";
import { Cart } from "./pages/cart";
import { Ticket } from "./pages/ticket";
import { WIP } from "./pages/WIP";

import { Single } from "./pages/single";

//Components
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { store } = useContext(Context);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {window.location.pathname !== "/" && <Navbar />}
                    <Routes>
                        <Route element={<LandingPage/>} path="/" />
                        <Route element={<Shop />} path="/shop" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Drinks />} path="/drinks" />
                        <Route element={<Cart />} path="/cart" />
                        <Route element={<Ticket />} path="/ticket" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<WIP />} path="/wip" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {window.location.pathname !== "/" && <Footer />}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
