import { Route, Routes } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Home from "./component/home/Home";
import Contact from "./component/contact/Contact";
import Checkout from "./component/checkout/Checkout";
import Cart from "./component/cart/Cart";
import Shop from "./component/shop/Shop";
// import Shopdetail from "./component/shop-detail/Shopdetail";
import Sign from "./component/sign/Sign";
import Login from "./component/login/Login";
import Testimonials from "./component/home/Testimonials";
import About from "./component/About/About";
import Wishlist from "./component/Whislist/Wishlist";
import OrderH from "./component/OrderH/OrderH";
import Io from "./component/Io/Io";
import ResetPassword from "./component/login/ResetPassword";
import ForgotPassword from "./component/login/ForgotPassword";
import VerifyOtp from "./component/login/VerifyOtp";

import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirmation from "./component/orderConfirmation/orderConfirmation";
import UserDashboard from "./component/user/UserDashboard";

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
          {/* <Route path="shopdetail" element={<Shopdetail />} /> */}
          <Route path="sign" element={<Sign />} />
          <Route path="login" element={<Login />} />
          <Route path="Testimonials" element={<Testimonials />} />
          <Route path="About" element={<About />} />
          <Route path="Wishlist" element={<Wishlist />} />
          <Route path="OrderH" element={<OrderH />} />
          <Route path="Io" element={<Io />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

   

        {/* 404 */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </CartProvider>
  );
}

export default App;
