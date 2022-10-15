import { motion } from 'framer-motion';
import React from 'react';
import '../../../Styles/Shop.css';
import ShopProducts from './ShopProducts';

const Shop = (props) => {
  return (
    <div className="shop bg-blue-300">
      <div className="shop__hero relative flex items-center justify-center bg-slate-200">
        <motion.h1
          initial={{ y: '-20px', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-6xl font-bold"
        >
          <span className="text-yellow-300">/</span>shop
        </motion.h1>
      </div>
      <div className="shop__maincontainer py-12 px-24 bg-slate-100 h-full">
        <motion.h2
          initial={{ y: '-10px', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className=" font-semibold text-2xl mb-3"
        >
          Products:
        </motion.h2>
        <ShopProducts productsArr={props.productsArr} />
      </div>
    </div>
  );
};

export default Shop;
