import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import '../../../Styles/Product.css';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Product = (props) => {
  const [productQty, setProductQTy] = useState(1);
  const navigate = useNavigate();
  let productToBeAddedToCart = {
    sku: props.currentProduct.sku,
    qty: productQty,
    product: props.currentProduct,
  };

  return (
    <div className="productpage bg-slate-100 flex justify-center items-center">
      <div className="product p-8 flex relative w-full bg-white rounded-md">
        <motion.button
          whileHover={{
            backgroundImage:
              'linear-gradient(to left, rgb(231, 229, 228), rgb(148, 163, 184))',
          }}
          transition={{
            duration: 0.5,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="absolute bg-blue-700 p-2 rounded-full productpage__backbtn"
          onClick={() => {
            props.setCurrentProduct({});
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </motion.button>
        <div
          style={{
            backgroundImage: `url(${props.currentProduct.image})`,
          }}
          className="product__imgcontainer mr-8"
        />
        <div className="product__infocontainer w-7/12 flex flex-col">
          <h1 className="product__name text-lg font-semibold">
            {props.currentProduct.name}
          </h1>
          <p className="product__description text-normal text-slate-500 font-normal w-10/12 mt-4">
            {props.currentProduct.longDescription}
          </p>
          <div className="product__ratingcontainer flex items-center">
            <StarRatings
              rating={
                props.currentProduct.customerReviewAverage
                  ? props.currentProduct.customerReviewAverage
                  : 0
              }
              starRatedColor="#fde047"
              starDimension="24px"
              starSpacing="0px"
              numberOfStars={5}
              name="rating"
            />
            <span className="product__ratingcount ml-1 text-lg text-slate-300">
              {props.currentProduct.customerReviewCount &&
                `(${props.currentProduct.customerReviewCount})`}
            </span>
          </div>
          <p
            className={
              props.currentProduct.salePrice < props.currentProduct.regularPrice
                ? 'product__price product__saleprice font-semibold'
                : 'product__price font-semibold'
            }
          >
            <span className="text-black">Price: </span>
            {props.currentProduct.salePrice < props.currentProduct.regularPrice
              ? props.currentProduct.salePrice
              : props.currentProduct.regularPrice}
            {' $'}
          </p>

          <div className="product__actions">
            <FormControl>
              <InputLabel sx={{ color: 'black' }}>Quantity</InputLabel>
              <Select
                labelId="Quantity"
                id="demo-simple-select"
                value={productQty}
                label="productQty"
                sx={{
                  width: '75px',
                  color: 'black',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(165, 156, 170, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(165, 156, 170, 0.5)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(165, 156, 170, 0.5)',
                  },
                }}
                onChange={(e) => {
                  setProductQTy(e.target.value);
                }}
              >
                <MenuItem sx={{}} value={1}>
                  1
                </MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>

            <motion.button
              whileHover={{
                backgroundImage:
                  'linear-gradient(to right, rgb(126, 34, 206), rgb(29, 78, 216))',
              }}
              transition={{
                duration: 0.5,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="product__addbtn overflow relative text-xl ml-4 rounded-md w-32 h-full"
              onClick={() => {
                props.setCartQuantity(props.cartQuantity + productQty);
                props.setCartPopup(true);
                setTimeout(() => props.setCartPopup(false), 700);
                let productInCartIndex = props.cart.findIndex(
                  (item) => props.currentProduct.sku === item.sku
                );
                if (productInCartIndex === -1) {
                  props.setCart([...props.cart, productToBeAddedToCart]);
                } else {
                  let cachedCart = props.cart;
                  cachedCart[productInCartIndex].qty =
                    props.cart[productInCartIndex].qty + productQty;
                  props.setCart([...cachedCart]);
                }
              }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
