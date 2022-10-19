import React from 'react';

const Footer = () => {
  return (
    <footer className="footer flex items-center justify-center p-6">
      <p className="text-lg text-white">
        © {new Date().getFullYear()}- Crisan Bogdan
      </p>
    </footer>
  );
};

export default Footer;
