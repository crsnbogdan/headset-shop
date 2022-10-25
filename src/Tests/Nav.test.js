import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Nav from '../Components/Nav';
let cart = [
  {
    product: {
      name: 'Product 1',
      customerReviewAverage: 4.7,
      customerReviewCount: 2267,
      regularPrice: 99.99,
      salePrice: 89.99,
      longDescription: 'This is a test',
      image:
        'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/5053/5053501_sd.jpg',
      sku: 1,
    },
    sku: 1,
    qty: 1,
  },
  {
    product: {
      name: 'Product 2',
      customerReviewAverage: 4.7,
      customerReviewCount: 2267,
      regularPrice: 99.99,
      salePrice: 89.99,
      longDescription: 'This is a test',
      image:
        'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/5053/5053501_sd.jpg',
      sku: 2,
    },
    sku: 2,
    qty: 4,
  },
  {
    product: {
      name: 'Product 3',
      customerReviewAverage: 3.7,
      customerReviewCount: 100,
      regularPrice: 95.99,
      salePrice: 79.99,
      longDescription: 'This is a test',
      image:
        'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/6298/6298657_sd.jpg',
      sku: 3,
    },
    sku: 3,
    qty: 2,
  },
];

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  cart = [
    {
      product: {
        name: 'Product 1',
        customerReviewAverage: 4.7,
        customerReviewCount: 2267,
        regularPrice: 99.99,
        salePrice: 89.99,
        longDescription: 'This is a test',
        image:
          'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/5053/5053501_sd.jpg',
        sku: 1,
      },
      sku: 1,
      qty: 1,
    },
    {
      product: {
        name: 'Product 2',
        customerReviewAverage: 4.7,
        customerReviewCount: 2267,
        regularPrice: 99.99,
        salePrice: 89.99,
        longDescription: 'This is a test',
        image:
          'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/5053/5053501_sd.jpg',
        sku: 2,
      },
      sku: 2,
      qty: 4,
    },
    {
      product: {
        name: 'Product 3',
        customerReviewAverage: 3.7,
        customerReviewCount: 100,
        regularPrice: 95.99,
        salePrice: 79.99,
        longDescription: 'This is a test',
        image:
          'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/6298/6298657_sd.jpg',
        sku: 3,
      },
      sku: 3,
      qty: 2,
    },
  ];
});

it('renders correctly and matches snapshot', () => {
  const setCartQuantity = jest.fn();
  const setCart = jest.fn();
  const setCartVisible = jest.fn();

  const navTree = renderer
    .create(
      <BrowserRouter>
        <Nav
          cart={cart}
          cartQuantity={0}
          cartVisible={true}
          setCart={setCart}
          setCartQuantity={setCartQuantity}
          setCartVisible={setCartVisible}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(navTree).toMatchSnapshot();
});

it('shows products present in props.cart in the cart', () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Nav cart={cart} cartVisible={true} />
      </BrowserRouter>
    );
  });
  expect(container.querySelector('.nav__cartcontainer')).toBeInTheDocument();
  let cartItems = [...container.querySelectorAll('.nav__cartitem')];
  expect(cartItems.length).toEqual(cart.length);
});

it('removed a product from the props.cart when its delete button is clicked', () => {
  const setCartQuantity = jest.fn();
  const setCart = jest.fn();
  const setCartVisible = jest.fn();
  let cartInitLength = cart.length;
  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Nav
          cart={cart}
          cartQuantity={0}
          cartVisible={true}
          setCart={setCart}
          setCartQuantity={setCartQuantity}
          setCartVisible={setCartVisible}
        />
      </BrowserRouter>
    );
  });
  let delBtns = [...container.querySelectorAll('.cartitem__delete')];
  userEvent.click(delBtns[0]);
  expect(cart.length).toEqual(cartInitLength - 1);
  userEvent.click(delBtns[0]);
  expect(cart.length).toEqual(cartInitLength - 2);
});

it('increases the total price and quantity of a product when the button to increase its quantity is clicked', () => {
  const setCartQuantity = jest.fn();
  const setCart = jest.fn();
  const setCartVisible = jest.fn();

  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Nav
          cart={cart}
          cartQuantity={0}
          cartVisible={true}
          setCart={setCart}
          setCartQuantity={setCartQuantity}
          setCartVisible={setCartVisible}
        />
      </BrowserRouter>
    );
  });

  let productIncreaseQtyBtn = [
    ...container.querySelectorAll('.cartitem__qtymodifier.add'),
  ][1];
  let initialQtyValue = parseInt(
    [...container.querySelectorAll('.cartitem__qtyval')][1].textContent
      .split(': ')
      .pop()
  );
  let initialTotalValue = Number(
    [...container.querySelectorAll('.cartitem_itemtotal')][1].textContent
      .split(': ')
      .pop()
      .slice(0, -1)
  );
  let prodPrice = cart[1].product.salePrice;

  userEvent.click(productIncreaseQtyBtn);

  expect(initialQtyValue + 1).toEqual(cart[1].qty);
  expect((cart[1].qty * cart[1].product.salePrice).toFixed(2)).toEqual(
    (initialTotalValue + prodPrice).toString()
  );
});

it('decreases the total price and quantity of a product when the button to decrease its quantity is clicked', () => {
  const setCartQuantity = jest.fn();
  const setCart = jest.fn();
  const setCartVisible = jest.fn();

  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Nav
          cart={cart}
          cartQuantity={0}
          cartVisible={true}
          setCart={setCart}
          setCartQuantity={setCartQuantity}
          setCartVisible={setCartVisible}
        />
      </BrowserRouter>
    );
  });

  let productDecreaseQtyBtn = [
    ...container.querySelectorAll('.cartitem__qtymodifier.subtract'),
  ][1];
  let initialQtyValue = parseInt(
    [...container.querySelectorAll('.cartitem__qtyval')][1].textContent
      .split(': ')
      .pop()
  );
  let initialTotalValue = Number(
    [...container.querySelectorAll('.cartitem_itemtotal')][1].textContent
      .split(': ')
      .pop()
      .slice(0, -1)
  );
  let prodPrice = cart[1].product.salePrice;

  userEvent.click(productDecreaseQtyBtn);

  expect(initialQtyValue - 1).toEqual(cart[1].qty);
  expect((cart[1].qty * cart[1].product.salePrice).toFixed(2)).toEqual(
    (initialTotalValue - prodPrice).toFixed(2).toString()
  );

  userEvent.click(productDecreaseQtyBtn);
  userEvent.click(productDecreaseQtyBtn);

  expect(initialQtyValue - 3).toEqual(cart[1].qty);
  expect((cart[1].qty * cart[1].product.salePrice).toFixed(2)).toEqual(
    (initialTotalValue - prodPrice * 3).toFixed(2).toString()
  );
});

it('removes a product from props.products when its quantity is 1 and the decrease quantity button is clicked', () => {
  const setCartQuantity = jest.fn();
  const setCart = jest.fn();
  const setCartVisible = jest.fn();

  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Nav
          cart={cart}
          cartQuantity={0}
          cartVisible={true}
          setCart={setCart}
          setCartQuantity={setCartQuantity}
          setCartVisible={setCartVisible}
        />
      </BrowserRouter>
    );
  });

  let productDecreaseQtyBtn = [
    ...container.querySelectorAll('.cartitem__qtymodifier.subtract'),
  ][0];

  userEvent.click(productDecreaseQtyBtn);
  expect(cart[0].product.name).toEqual('Product 2');
  expect(cart[0].product.name).not.toEqual('Product 3');
  expect(cart[0].product.name).not.toEqual('Product 1');
});

it('decreases the total cart price when a product is removed props.products', () => {
  const setCartQuantity = jest.fn();
  const setCart = jest.fn();
  const setCartVisible = jest.fn();
  act(() => {
    ReactDOM.createRoot(container).render(
      <BrowserRouter>
        <Nav
          cart={cart}
          cartQuantity={0}
          cartVisible={true}
          setCart={setCart}
          setCartQuantity={setCartQuantity}
          setCartVisible={setCartVisible}
        />
      </BrowserRouter>
    );
  });
  let firstProdPrice = cart[0].qty * cart[0].product.salePrice;
  let productDecreaseQtyBtn = [
    ...container.querySelectorAll('.cartitem__qtymodifier.subtract'),
  ][0];
  let initialTotal = cart.reduce(
    (total, item) => total + item.qty * item.product.salePrice,
    0
  );

  userEvent.click(productDecreaseQtyBtn);

  let updatedTotal = cart
    .reduce((total, item) => total + item.qty * item.product.salePrice, 0)
    .toFixed(2);

  expect((initialTotal - firstProdPrice).toFixed(2).toString()).toEqual(
    updatedTotal
  );
});
/*
Tests:
    1. when a product is in props.cart it is visible in the cart - DONE
    2. when a product is deleted from the props.cart it is removed - DONE
    3. when a product's quantity is increased the total 
        // and quantity are increased - DONE
    4. when a product's quantity is decreased the total
        // and quantity are decreased - DONE
    5. when a product's quantity is 1 and it is decreased 
        // it is removed from the cart - DONE
    6. when there are 3 products in the cart and one is 
    removed the other 2 are still there and the total 
        // price is decreased
*/
