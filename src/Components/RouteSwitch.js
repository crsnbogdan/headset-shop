import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Pages/Home';
import Shop from './Pages/Shop/Shop';

const RouteSwitch = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const updateCartQuantity = (toIncrease) => {
    if (toIncrease) {
      return setCartQuantity(cartQuantity + 1);
    } else {
      return setCartQuantity(cartQuantity - 1);
    }
  };

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((search=keyboard&search=mechanical&search=wired&search=gaming))?apiKey=qhqws47nyvgze2mq3qx4jadt&sort=regularPrice.asc&&show=name,customerReviewAverage,customerReviewCount,regularPrice,longDescription,image,salePrice,sku&pageSize=30&format=json'
    )
      .then((res) => res.json())
      .then((res) => setProductsArr(res.products))
      .catch(() => console.error('invalid fetch'));
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Nav
          updateCartQuantity={updateCartQuantity}
          cartQuantity={cartQuantity}
          cart={cart}
          setCart={setCart}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="shop"
            element={
              <Shop
                productsArr={productsArr}
                updateCartQuantity={updateCartQuantity}
                cart={cart}
                setCart={setCart}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default RouteSwitch;
