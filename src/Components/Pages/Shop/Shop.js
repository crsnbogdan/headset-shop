import React from 'react';
import '../../../Styles/Shop.css';
import ShopProducts from './ShopProducts';

const Shop = (props) => {
  return (
    <div className="shop bg-blue-300">
      <div className="shop__header bg-red-300">Header</div>
      <div className="shop__maincontainer py-12 px-24 bg-pink-300 h-full">
        <h2 className="font- font-semibold text-xl">Products:</h2>
        <ShopProducts productsArr={props.productsArr} />
      </div>
    </div>
  );
};

export default Shop;
