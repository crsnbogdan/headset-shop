import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import uniqid from 'uniqid';
import '../Styles/Nav.css';

const Nav = (props) => {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  let cartProducts = props.cart.map((cartItem) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        exit={{ opacity: 0, display: 'none' }}
        className="nav__cartitem grid p-2 bg-white"
        key={uniqid()}
      >
        <img className="cartitem__img" src={cartItem.product.image} alt="" />
        <div className="cartitem__info flex flex-col justify-between text-sm text-black">
          <p className="text-black font-semibold cartitem_itemtotal">
            <span className="font-normal">Total: </span>
            {(
              cartItem.qty *
              (cartItem.product.salePrice || cartItem.product.regularPrice)
            ).toFixed(2)}
            $
          </p>
          <p className="text-sm">
            {cartItem.product.name.substring(0, 40).trim() + '(...)'}
          </p>
          <p className="cartitem__qtyval">Quantity: {cartItem.qty}</p>
        </div>
        <div className="cartitem__actions justify-between items-center flex flex-col">
          <DeleteIcon
            className="cartitem__delete"
            onClick={() => {
              props.setCartQuantity(props.cartQuantity - cartItem.qty);

              let productInCartIndex = props.cart.findIndex(
                (item) => cartItem.sku === item.sku
              );
              let cachedCart = props.cart;
              cachedCart.splice(productInCartIndex, 1);
              props.setCart([...cachedCart]);
            }}
          />
          <div className="cartitem__qtymodifiers flex items-center ">
            <AddIcon
              className="cartitem__qtymodifier add"
              onClick={() => {
                props.setCartQuantity(props.cartQuantity + 1);
                let productInCartIndex = props.cart.findIndex(
                  (item) => cartItem.sku === item.sku
                );
                let cachedCart = props.cart;
                cachedCart[productInCartIndex].qty += 1;
                props.setCart([...cachedCart]);
              }}
            />
            <p className="text-lg text-black font-semibold py-1 px-3 bg-slate-100">
              {cartItem.qty}
            </p>
            <RemoveIcon
              className="cartitem__qtymodifier subtract"
              onClick={() => {
                props.setCartQuantity(props.cartQuantity - 1);
                let productInCartIndex = props.cart.findIndex(
                  (item) => cartItem.sku === item.sku
                );
                let cachedCart = props.cart;
                cachedCart[productInCartIndex].qty -= 1;
                if (cachedCart[productInCartIndex].qty === 0) {
                  cachedCart.splice(productInCartIndex, 1);
                  if (cachedCart.length === 0) {
                    props.setCartVisible(false);
                  }
                  return props.setCart([...cachedCart]);
                }
                props.setCart([...cachedCart]);
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  });

  return (
    <div className="nav__container">
      <nav className="nav items-center relative text-white flex px-28 py-6 justify-between">
        <h3 className="text-2xl text-yellow-300 font-semibold">
          KB<span className="text-white font-light text-lg">.shop</span>
        </h3>
        <MenuIcon
          className="nav__sidebartoggle"
          fontSize="large"
          onClick={() => {
            setMobileNavVisible(true);
            document
              .querySelector('.page__navoverlay')
              .classList.toggle('visible');
          }}
        />
        <motion.div
          initial={{ right: -300 }}
          animate={{
            right: mobileNavVisible ? 0 : -300,
          }}
          transition={{ duration: 0.5 }}
          className="nav__links w-3/12 text-lg flex items-center justify-between"
        >
          <CloseIcon
            className="nav__close"
            fontSize="large"
            onClick={() => {
              setMobileNavVisible(false);
              document
                .querySelector('.page__navoverlay')
                .classList.toggle('visible');
            }}
          />
          <NavLink
            to="/"
            end
            className="nav__link cart"
            onClick={() => {
              setMobileNavVisible(false);
              document
                .querySelector('.page__navoverlay')
                .classList.toggle('visible');
            }}
          >
            home
          </NavLink>
          <NavLink
            to="shop"
            end
            className="nav__link"
            onClick={() => {
              setMobileNavVisible(false);
              document
                .querySelector('.page__navoverlay')
                .classList.toggle('visible');
            }}
          >
            shop
          </NavLink>
          <NavLink
            to="cart"
            className="nav__link relative"
            onClick={() => {
              setMobileNavVisible(false);
              document
                .querySelector('.page__navoverlay')
                .classList.toggle('visible');
            }}
          >
            {props.cartQuantity > 0 ? (
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25 }}
                className="nav__qty flex justify-center items-center color-white absolute text-xs font-medium rounded-full"
              >
                <p className="text-white">{props.cartQuantity}</p>
              </motion.div>
            ) : null}
            <ShoppingCartIcon
              fontSize="medium"
              sx={{ padding: '10px', boxSizing: 'content-box' }}
              onMouseEnter={() => props.setCartVisible(true)}
              onMouseLeave={() => props.setCartVisible(false)}
            />
          </NavLink>
        </motion.div>
        <AnimatePresence>
          {props.cartVisible && (
            <motion.div
              initial={{ minHeight: '0px' }}
              animate={{ minHeight: '100px' }}
              exit={{ minHeight: '0px' }}
              transition={{ duration: 0.5, delayChildren: 1 }}
              onMouseEnter={() => props.setCartVisible(true)}
              onMouseLeave={() => props.setCartVisible(false)}
              className="nav__cartcontainer p-2 bg-slate-100 absolute"
            >
              {props.cart.length === 0 && props.cartVisible && (
                <motion.p
                  initial={{ display: 'none' }}
                  animate={{ display: 'block' }}
                  exit={{ display: 'none' }}
                  transition={{ delay: 0.2 }}
                  className="nav__cartemptytext text-slate-400"
                >
                  The cart is empty
                </motion.p>
              )}
              {props.cart && props.cartVisible && cartProducts}
              {props.cart.length > 0 && props.cartVisible && (
                <motion.p
                  exit={{ display: 'none' }}
                  className="text-black nav__carttotal"
                >
                  Total:{' '}
                  <span className="font-semibold">
                    {props.cart
                      .reduce(
                        (total, product) =>
                          total +
                          product.qty *
                            (product.product.salePrice ||
                              product.product.salePrice),
                        0
                      )
                      .toFixed(2)}
                    $
                  </span>
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Nav;
