/* props of products
- nmae
- reg. price
- long description
- sale price
- image
*/
import React from 'react';
import '../../../Styles/Shop.css';

const ShopProducts = (props) => {
  let products = props.productsArr.map((product) => {
    return (
      <div className="shop__product">
        {/* <img src={product.image} alt="product" className="" /> */}
        <div
          style={{
            backgroundImage: `url(${product.image})`,
          }}
          className="shop__productimg"
        />
        <p className="font-semibold">
          {product.name.substring(0, 60).trim() + '(...)'}
        </p>
        <p
          className={
            product.salePrice < product.regularPrice
              ? 'product__price--sale'
              : 'product__price'
          }
        >
          {product.salePrice < product.regularPrice
            ? product.salePrice
            : product.regularPrice}
          {' $'}
        </p>
        <button className="product__addbtn text-white bg-red-500 py-1 rounded-md w-full ">
          Add to Cart
        </button>
      </div>
    );
  });

  return <div className="shop__productscontainer">{products}</div>;
};

export default ShopProducts;
