import './App.css';
import Home from './components/home/home';
import { Route,Routes } from 'react-router-dom';
import Body from '../src/components/body/Body';
import MyOrder from './components/header/MyOrder';
import contextProvider from './contextProvide';
import Login from './components/login/Login';
import Register from './components/register/Register';
import React, { useState } from 'react'
import Cart from './components/cart/Cart.js';
import BuyProducts from './components/BuyProducts/BuyProducts.js';

function App() {

  const [headerData,setHeaderData] = useState({});

  const headerHandler = (queryData,CategoryData) => {
      setHeaderData({
        query : queryData,
        category : CategoryData
      });
  }
  
  return (
    <div className="App" >
      <contextProvider.Provider value={[headerData,headerHandler]}>
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
      </contextProvider.Provider>
    </div>
  );
}

export default App;
