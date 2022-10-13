import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className=" nav items-center text-white flex px-40 py-6 justify-between">
      <h3 className="text-2xl text-yellow-300 font-semibold">
        KB<span className="text-white font-light text-lg">.shop</span>
      </h3>
      <div className="nav__links w-3/12 text-lg flex items-center justify-between">
        <NavLink to="/" end className="nav__link cart">
          .home
        </NavLink>
        <NavLink to="shop" end className="nav__link">
          .shop
        </NavLink>
        <NavLink to="cart" className="nav__link">
          <ShoppingCartIcon sx={{ height: '20px' }} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
