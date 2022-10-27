import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Model from '../Model';

import '../../Styles/Home.css';

const Home = (props) => {
  useEffect(() => {
    props.setCart(JSON.parse(localStorage.getItem('cart')));
  }, []);

  return (
    <div className="frontpage relative">
      <div className="page__navoverlay" />

      <div className="hero relative flex px-40">
        <div className="hero__textcontainer w-5/12 flex flex-col justify-center items-start">
          <motion.h1
            initial={{ y: '-40px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-4xl text-white">It's</span>
            {
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 'natural',
                  strings: ['ergonomic,', 'bold,', 'your new keyboard.'],
                  wrapperClassName:
                    'hero__typewriter text-white text-5xl font-bold text-yellow-300',
                  cursorClassName:
                    'hero__cursor text-5xl font-light text-white',
                }}
              />
            }
          </motion.h1>
          <motion.p
            initial={{ y: '40px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-white mt-8"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus optio
            eligendi dolore harum, dicta possimus autem, fugit nam maiores
            nostrum iste reprehenderit asperiores, sit dolor!
          </motion.p>
          <motion.div
            className="shopbtn__container"
            initial={{ y: '40px', opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            // wrapper div required for hover animation
            // to work with initial animation
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero__shopbtn text-3xl mt-8 text-black bg-white py-2 px-4"
            >
              <Link to="/shop">SHOP</Link>
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
          className="hero__model w-7/12"
        >
          <Model />
        </motion.div>
      </div>
      <div className="hero__gradient"></div>
      <div className="hero__bg"></div>
    </div>
  );
};

export default Home;
