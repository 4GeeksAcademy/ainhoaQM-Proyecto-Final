import React, { useContext, useEffect  } from "react";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

//Pages
import { LandingPage } from "./pages/landingPage";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";
import { NewPassword } from "./pages/newPassword";
import { Menu } from "./pages/menu";
import { Starters } from "./pages/starters";
import { Dishes } from "./pages/dishes";
import { Drinks } from "./pages/drinks";
import { Desserts } from "./pages/desserts";
import { Cart } from "./pages/cart";
import { Ticket } from "./pages/ticket";
import { Contact } from "./pages/contact";
import { Reservation } from "./pages/reservation";
import { WIP } from "./pages/WIP";
import { NotFound } from "./pages/notFound";
import { Single } from "./pages/single";

//Components
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Heading } from "./component/heading";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);
    const { store } = useContext(Context);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        if  (token && userName) {
          actions.setIsAuthenticated(true);
        }
    }, []);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<> <LandingPage /> </>}/>
                        <Route path="/*" element={ <>
                            <Heading />
                            <Navbar />
                            <Routes>
                                <Route element={<Signup />} path="/signup" />
                                <Route element={<Login />} path="/login" />
                                <Route element={<ResetPassword />} path="/reset-password" />
                                <Route element={<NewPassword />} path="/new-password" />
                                <Route element={<Menu />} path="/shop" />
                                <Route element={<Starters />} path="/starters" />
                                <Route element={<Dishes />} path="/dishes" />
                                <Route element={<Drinks />} path="/drinks" />
                                <Route element={<Desserts />} path="/desserts" />
                                <Route element={<Cart />} path="/cart" />
                                <Route element={<Ticket />} path="/ticket" />
                                <Route element={<Contact />} path="/contact" />
                                <Route element={<Reservation />} path="/reserve" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<WIP />} path="/wip" />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <Footer />
                        </>}/>
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
