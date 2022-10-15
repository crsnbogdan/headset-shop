import { motion } from 'framer-motion';
import React from 'react';
import '../../../Styles/Shop.css';
import ShopProducts from './ShopProducts';

const Shop = (props) => {
  return (
    <div className="shop bg-blue-300">
      <div className="shop__header bg-slate-200">Header</div>
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
