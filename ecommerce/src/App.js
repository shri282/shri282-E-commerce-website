import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import Body from "./components/body/Body.js";
import MyOrder from "./pages/myOrders/MyOrder.js";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import React from "react";
import Cart from "./pages/cart/Cart.js";
import BuyProducts from "./pages/BuyProducts/BuyProducts.js";
import ProductsPage from "./pages/productsPage/ProductsPage.js";
import PageNotFound from "./pages/pageNotFound/PageNotFound.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Body />} />
          <Route path="myorders" element={<MyOrder />} />
          <Route path="cart" element={<Cart />} />
          <Route path="buyproducts" element={<BuyProducts />} />
          <Route path="productspage/:category" element={<ProductsPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
