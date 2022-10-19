import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Nav.css';

const Nav = (props) => {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  return (
    <div className="nav__container">
      <nav className="nav items-center relative text-white flex px-24 py-6 justify-between">
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
            <ShoppingCartIcon fontSize="large" />
          </NavLink>
        </motion.div>
      </nav>
    </div>
  );
};

export default Nav;
