import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Shop from './Pages/Shop/Shop';

const RouteSwitch = () => {
  const showStars = true; // required for testing - to disable the
  // stars as they break snapshot tests
  const [cartVisible, setCartVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();

  const [productsArr, setProductsArr] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.bestbuy.com/v1/products((search=keyboard&search=mechanical&search=wired&search=gaming))?apiKey=qhqws47nyvgze2mq3qx4jadt&sort=regularPrice.asc&&show=name,customerReviewAverage,customerReviewCount,regularPrice,longDescription,image,salePrice,sku&pageSize=60&format=json'
    )
      .then((res) => res.json())
      .then((res) => setProductsArr(res.products))
      .catch(() => console.error('invalid fetch'));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="app">
      <BrowserRouter>
        <Nav
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
          cart={cart}
          setCart={setCart}
          cartVisible={cartVisible}
          setCartVisible={setCartVisible}
        />
        <Routes>
          <Route path="/" element={<Home setCart={setCart} />} />
          <Route
            path="shop"
            element={
              <Shop
                showStars={showStars}
                productsArr={productsArr}
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
                cart={cart}
                setCart={setCart}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
              />
            }
          ></Route>
          <Route
            path={currentProduct ? `shop/product-${currentProduct.sku}` : null}
            element={<Product currentProduct={currentProduct} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default RouteSwitch;
