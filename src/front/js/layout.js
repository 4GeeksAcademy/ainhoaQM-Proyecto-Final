import React, {useEffect, useContext} from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

//Pages
import { LandingPage } from "./pages/landingPage";
import { AuthPage } from "./pages/authPage";
import { ResetPassword } from "./pages/resetPassword";
import { NewPassword } from "./pages/newPassword";
import { Menu } from "./pages/menu";
import { Starters } from "./pages/starters";
import { Dishes } from "./pages/dishes";
import { Drinks } from "./pages/drinks";
import { Desserts } from "./pages/desserts";
import { Cart } from "./pages/cart";
import { Order } from "./pages/order";
import { OrdersHistory } from "./pages/ordersHistory";
import { Ticket } from "./pages/ticket";
import { Payment } from "./pages/payment";
import { Contact } from "./pages/contact";
import { Centers } from "./pages/centers";
import { Reservation } from "./pages/reservation";
import { WIP } from "./pages/WIP";
import { NotFound } from "./pages/notFound";


//Components
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Heading } from "./component/heading";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const storedCart = localStorage.getItem('cart');
        if  (token && userName && userEmail) {
            actions.setIsAuthenticated(true);
        }
        if (storedCart) {
            actions.setCart(JSON.parse(storedCart));
        }
    }, []);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<LandingPage />}  path="/" />
                        <Route element={<AuthPage />} path="/auth-page" />
                        <Route element={<ResetPassword />} path="/reset-password" />
                        <Route element={<NewPassword />} path="/new-password" />
                        
                        <Route path="/*" element={ <>
                            <Heading />
                            <Navbar />
                            <Routes>
                                <Route element={<Menu />} path="/shop" />
                                <Route element={<Starters />} path="/starters" />
                                <Route element={<Dishes />} path="/dishes" />
                                <Route element={<Drinks />} path="/drinks" />
                                <Route element={<Desserts />} path="/desserts" />
                                <Route element={<Cart />} path="/cart" />
                                <Route element={<Order />} path="/order" />
                                <Route element={<OrdersHistory />} path="/orders-history" />
                                <Route element={<Ticket/>} path="/ticket/:orderId" /> 
                                <Route element={<Payment />} path="/payment/:orderId" />
                                <Route element={<Contact />} path="/contact" />
                                <Route element={<Centers />} path="/our-centers" />
                                <Route element={<Reservation />} path="/reserve" />
                                <Route element={<NotFound />} path="*" />
                            </Routes>
                            <Footer />
                        </>}/>
                        <Route element={<WIP />} path="/wip" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);