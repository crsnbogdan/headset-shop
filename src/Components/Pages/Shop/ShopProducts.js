/* props of products
- nmae
- reg. price
- long description
- sale price
- image
- id
*/
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { red } from '@mui/material/colors';
import { motion } from 'framer-motion';
import React from 'react';
import '../../../Styles/Shop.css';

const ShopProducts = (props) => {
  let delayAnimVal = 0.0;
  let products = props.productsArr.map((product) => {
    delayAnimVal += 0.1;
    return (
      <motion.div
        className="shop__product--container"
        whileHover={{
          boxShadow: '0px 0px 15px -2px rgba(0, 0, 0, 0.15)',
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          initial={{ y: '-20px', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: delayAnimVal }}
          className="shop__product flex flex-col justify-between"
          key={product.sku}
        >
          {/* <img src={product.image} alt="product" className="" /> */}
          <div
            style={{
              backgroundImage: `url(${product.image})`,
            }}
            className="shop__productimg"
          />
          <p className="font-semibold my-4">
            {product.name.substring(0, 60).trim() + '(...)'}
          </p>
          <p
            className={
              product.salePrice < product.regularPrice
                ? 'product__price--sale font-semibold mb-4'
                : 'product__price font-semibold mb-4'
            }
          >
            {product.salePrice < product.regularPrice
              ? product.salePrice
              : product.regularPrice}
            {' $'}
          </p>
          <motion.button
            whileHover={{
              backgroundImage:
                'linear-gradient(to right, rgb(139, 92, 246), rgb(29, 78, 216))',
              transition: { duration: 0.2 },
            }}
            className="product__addbtn overflow relative h-8 rounded-md w-full "
          >
            <ShoppingCartIcon className="addbtn__icon" /> Add to Cart
          </motion.button>
        </motion.div>
      </motion.div>
    );
  });

  return <div className="shop__productscontainer">{products}</div>;
};

export default ShopProducts;
