/* props of products
- nmae
- reg. price
- long description
- sale price
- image
- id
*/
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import React from 'react';
import StarRatings from 'react-star-ratings';
import '../../../Styles/Shop.css';

const ShopProducts = (props) => {
  let delayAnimVal = 0.0;
  let products = props.productsArr.map((product) => {
    delayAnimVal += 0.15;
    return (
      <motion.div
        className="shop__productcontainer"
        key={product.sku}
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
        >
          <div
            style={{
              backgroundImage: `url(${product.image})`,
            }}
            className="shop__productimg"
          />
          <p className="font-semibold my-4">
            {product.name.substring(0, 50).trim() + '(...)'}
          </p>
          <div className="flex mb-4">
            <StarRatings
              rating={
                product.customerReviewAverage
                  ? product.customerReviewAverage
                  : 0
              }
              starRatedColor="#fde047"
              starDimension="18px"
              starSpacing="0px"
              numberOfStars={5}
              name="rating"
            />
            <span className="text-sm mt-1 text-slate-400">
              {product.customerReviewCount &&
                `(${product.customerReviewCount})`}
            </span>
          </div>
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
            }}
            transition={{
              duration: 0.5,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="product__addbtn overflow relative h-8 rounded-md w-full"
            onClick={() => {
              props.updateCartQuantity(true);
              let productInCartIndex = props.cart.findIndex(
                (item) => product.sku === item.sku
              );
              if (productInCartIndex === -1) {
                return props.setCart([
                  ...props.cart,
                  {
                    sku: product.sku,
                    qty: 1,
                    product: product,
                  },
                ]);
              } else {
                let cachedCart = props.cart;
                cachedCart[productInCartIndex].qty =
                  props.cart[productInCartIndex].qty + 1;
                props.setCart([...cachedCart]);
              }
            }}
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
