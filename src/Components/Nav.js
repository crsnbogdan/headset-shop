import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Nav.css';

const Nav = (props) => {
  return (
    <nav className=" nav items-center text-white flex px-40 py-6 justify-between">
      <h3 className="text-2xl text-yellow-300 font-semibold">
        KB<span className="text-white font-light text-lg">.shop</span>
      </h3>
      <div className="nav__links w-3/12 text-lg flex items-center justify-between">
        <NavLink to="/" end className="nav__link cart">
          home
        </NavLink>
        <NavLink to="shop" end className="nav__link">
          shop
        </NavLink>
        <NavLink to="cart" className="nav__link relative">
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
          <ShoppingCartIcon sx={{ height: '32px', width: '32px' }} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
