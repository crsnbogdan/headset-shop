import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Nav from '../Components/Nav';
import Shop from '../Components/Pages/Shop/Shop';

let productsArr = [
  {
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
  {
    name: 'Product 2',
    customerReviewAverage: 4.6,
    customerReviewCount: 1437,
    regularPrice: 149.99,
    salePrice: 99.99,
    longDescription: 'This is a test',
    image:
      'https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/6298/6298657_sd.jpg',
    sku: 2,
  },
  {
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
];

it('renders corrently and matches snapshot', () => {
  const shopTree = renderer
    .create(
      <Shop productsArr={productsArr} sortType="reviews" showStars={false} />
    )
    .toJSON();
  expect(shopTree).toMatchSnapshot();
});

it('renders no products when props.productsArr is empty', () => {
  let { container } = render(<Shop productsArr={[]} sortType="reviews" />);

  expect(
    [...container.querySelectorAll('.shop__productcontainer')].length
  ).toBe(0);
});

it('renders multiple shop products', () => {
  let { container } = render(
    <Shop productsArr={productsArr} sortType="reviews" />
  );

  expect(
    [...container.querySelectorAll('.shop__productcontainer')].length
  ).toBe(3);
});

it('renders all HTML elements required for product cards', () => {
  let { container } = render(
    <Shop productsArr={productsArr} sortType="reviews" showStars={true} />
  );

  expect(container.querySelector('.shop__productimg')).toBeInTheDocument();
  expect(container.querySelector('.product__price')).toBeInTheDocument();
  expect(container.querySelector('.product__ratingcount')).toBeInTheDocument();
  expect(container.querySelector('.star-ratings')).toBeInTheDocument();
  expect(container.querySelector('.product__addbtn')).toBeInTheDocument();
});

it('calls props.setCart and props.setCartQuantity when the "Add to Cart" button of a product card is clicked', () => {
  const setCartQuantityMock = jest.fn();
  const setCartMock = jest.fn();
  let { container } = render(
    <>
      <BrowserRouter>
        <Nav
          cart={[]}
          setCart={setCartMock}
          setCartQuantity={setCartQuantityMock}
          cartQuantity={0}
        />
      </BrowserRouter>
      <Shop
        setCartQuantity={setCartQuantityMock}
        productsArr={productsArr}
        setCart={setCartMock}
        sortType="reviews"
        cart={[]}
      />
    </>
  );

  let btns = [...container.querySelectorAll('.product__addbtn')];
  btns.forEach((btn) => userEvent.click(btn));
  expect(setCartQuantityMock).toHaveBeenCalledTimes(3);
  expect(setCartMock).toHaveBeenCalledTimes(3);
});

it('increases props.cartQuantity and ".nav__qty" when the "Add to Cart" button of a product card is clicked', () => {
  let cartQty = 0;

  const setCartQuantityMock = () => (cartQty += 1);
  const setCartMock = jest.fn();
  let { container } = render(
    <>
      <BrowserRouter>
        <Nav
          cart={[]}
          setCart={setCartMock}
          setCartQuantity={setCartQuantityMock}
          cartQuantity={cartQty}
        />
      </BrowserRouter>
      <Shop
        setCartQuantity={setCartQuantityMock}
        productsArr={productsArr}
        setCart={setCartMock}
        sortType="reviews"
        cart={[]}
      />
    </>
  );

  expect(container.querySelector('.nav__qty > p')).not.toBeInTheDocument();
  let btns = [...container.querySelectorAll('.product__addbtn')];
  btns.forEach((btn) => userEvent.click(btn));
  expect(cartQty).toBe(3);
  setTimeout(() => {
    expect(container.querySelector('.nav__qty > p').textContent).toBe(4);
  }, 0);
});

it('sorts products based on review count', () => {
  let { container } = render(
    <Shop productsArr={productsArr} sortType="reviews" />
  );

  let productReviewCounts = [
    ...container.querySelectorAll('.product__ratingcount'),
  ];
  productReviewCounts = productReviewCounts.map(
    (product) => product.textContent
  );
  let filteredProductReviewCounts = productReviewCounts.filter((a, b) =>
    a > b ? 1 : -1
  );

  expect(productReviewCounts).toEqual(filteredProductReviewCounts);
});

it('sorts products from highest to lowest price', () => {
  let { container } = render(
    <Shop productsArr={productsArr} sortType="priceDesc" />
  );

  let productPrices = [...container.querySelectorAll('.priceDesc')];
  productPrices = productPrices.map((product) => product.textContent);
  let filteredProductPrices = productPrices.filter((a, b) => (a > b ? 1 : -1));

  expect(productPrices).toEqual(filteredProductPrices);
});

it('sorts products from lowest to highest price', () => {
  let { container } = render(
    <Shop productsArr={productsArr} sortType="priceAsc" />
  );

  let productPrices = [...container.querySelectorAll('.priceDesc')];
  productPrices = productPrices.map((product) => product.textContent);
  let filteredProductPrices = productPrices.filter((a, b) => (a < b ? 1 : -1));

  expect(productPrices).toEqual(filteredProductPrices);
});

it('sorts products from highest to lowest review score', () => {
  let { container } = render(
    <Shop productsArr={productsArr} sortType="rating" />
  );

  let productRatings = [...container.querySelectorAll('[reviewavg]')];
  productRatings = productRatings.map((product) =>
    product.getAttribute('reviewavg')
  );
  let filteredProductRatings = productRatings.filter((a, b) =>
    a > b ? 1 : -1
  );

  expect(productRatings).toEqual(filteredProductRatings);
});
