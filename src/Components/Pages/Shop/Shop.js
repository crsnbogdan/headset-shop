import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import '../../../Styles/Shop.css';
import ShopProducts from './ShopProducts';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Shop = (props) => {
  const [cartPopup, setCartPopup] = useState(false);
  const [sortType, setSortType] = useState('reviews');

  return (
    <div className="shop bg-blue-300">
      <div className="page__navoverlay" />
      <div className="shop__hero relative flex items-center justify-center bg-slate-200">
        <motion.h1
          initial={{ y: '-20px', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="text-white text-6xl font-bold"
        >
          <Typewriter
            options={{
              autoStart: true,
              delay: 'natural',
              deleteSpeed: Infinity, // Infinity set to disable
              // the deletion of the string
              pauseFor: 1000,
              strings: ['shop'],
              wrapperClassName:
                'shop__typewriter text-white text-5xl font-bold text-white',
              cursorClassName:
                'shop__cursor text-5xl font-light text-yellow-300',
            }}
          />
        </motion.h1>
      </div>
      <div className="shop__maincontainer py-12 px-24  bg-slate-100 h-full">
        <AnimatePresence>
          {cartPopup && (
            <motion.div
              initial={{ y: 100, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ y: 100, opacity: 0.5 }}
              className="shop_addedpopup flex justify-center items-center absolute bg-white"
            >
              <p className="text-slate-400 py-3">Added to cart.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex justify-between items-center mb-4"
          initial={{ y: '-10px', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl">Products:</h2>
          <FormControl sx={{ width: '160px' }}>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              value={sortType}
              label="sortType"
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="reviews">Review count</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="priceAsc">Price ( asc. )</MenuItem>
              <MenuItem value="priceDesc">Price ( des. )</MenuItem>
            </Select>
          </FormControl>
        </motion.div>
        <ShopProducts
          productsArr={props.productsArr}
          updateCartQuantity={props.updateCartQuantity}
          cart={props.cart}
          sortType={sortType}
          setCartPopup={setCartPopup}
          cartPopup={cartPopup}
          setCart={props.setCart}
        />
      </div>
    </div>
  );
};

export default Shop;
