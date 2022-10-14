import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Pages/Home';
import Shop from './Pages/Shop/Shop';

const RouteSwitch = () => {
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((search=keyboard&search=gaming&search=mechanical&search=60))?apiKey=qhqws47nyvgze2mq3qx4jadt&sort=regularPrice.asc&show=name,regularPrice,longDescription,image,salePrice&pageSize=20&format=json'
    )
      .then((res) => res.json())
      .then((res) => setProductsArr(res.products))
      .catch(() => console.error('invalid fetch'));
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop productsArr={productsArr} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default RouteSwitch;
