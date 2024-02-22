import './App.css';
import Home from './components/home/home';
import { Route,Routes } from 'react-router-dom';
import Body from '../src/components/body/Body';
import MyOrder from './components/header/MyOrder';
import Login from './components/login/Login';
import Register from './components/register/Register';
import React from 'react'
import Cart from './components/cart/Cart.js';
import BuyProducts from './components/BuyProducts/BuyProducts.js';

function App() {

  
  return (
    <div className="App" >
     
          <Routes>
            <Route path='/' element={<Home />}>
              <Route index element={<Body />} />
              <Route path='myorders' element={<MyOrder />} />
              <Route path='cart' element={<Cart />} />
              <Route path='buyproducts' element={<BuyProducts />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>

    </div>
  );
}

export default App;
