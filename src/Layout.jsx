import Home from "./pages/home";
import Autentication from "./pages/authentication";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from "./pages/allproducts";
import SingleProd from "./pages/singleProd";
import Search from "./pages/search";
import Moreprod from "./pages/moreprod";
import Singlepd from "./pages/singlepd";
import Cart from "./pages/cart";
import Payment from "./pages/payment";
import ForgotPass from "./pages/forgotPass";
const Layout = ()=>{
    return (
        <>
           <ToastContainer />
           <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="authentication" element={<Autentication />} />
                <Route path="moreproducts" element={<Allproducts />} />
                <Route path="/moreDetails/:id" element={<SingleProd />} />
                <Route path="/search" element={<Search />} />
                <Route path="/moreprod" element={<Moreprod />} />
                <Route path="/singlepd/:id" element={<Singlepd />} />
                <Route path="cart" element={<Cart />} />
                <Route path="moreprod/cart" element={<Cart />} />
                <Route path="search/cart" element={<Cart />} />
                <Route path="moreproducts/cart" element={<Cart />} />
                <Route path="/moreDetails/:id/cart" element={<Cart />} />
                <Route path="/singlepd/:id/cart" element={<Cart />} />
                <Route path="authentication" element={<Autentication />} />
                <Route path="moreproducts/authentication" element={<Autentication />} />
                <Route path="/moreprod/authentication" element={<Autentication />} />
                <Route path="/moreDetails/:id/authentication" element={<Autentication />} />
                <Route path="/singlepd/:id/authentication" element={<Autentication />} />
                <Route path="moreproducts/cart/authentication" element={<Autentication />} />
                <Route path="/search/cart/authentication" element={<Autentication />} />
                <Route path="/moreDetails/:id/cart/authentication" element={<Autentication />} />
                <Route path="/moreprod/cart/authentication" element={<Autentication />} />
                <Route path="cart/authentication" element={<Autentication />} />
                <Route path="/singlepd/:id/cart/authentication" element={<Autentication />} />
                <Route path="/forgotpassword" element={<ForgotPass />} />
                <Route path="payment" element={<Payment />} />
                <Route path="/cart/payment" element={<Payment />} />
                <Route path="/moreprod/cart/payment" element={<Payment />} />
                <Route path="moreproducts/cart/payment" element={<Payment />} />
                <Route path="/singlepd/:id/cart/payment" element={<Payment />} />
                <Route path="/moreDetails/:id/cart/payment" element={<Payment />} />
            </Routes>
           </Router>
        </>
    )
}

export default Layout;