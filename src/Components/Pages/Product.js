import React from 'react';

const Product = (props) => {
  return (
    <div className="productpage h-10 mt-24">{props.currentProduct.name}</div>
  );
};

export default Product;
