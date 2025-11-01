import { renderCheckoutPage } from "../../scripts/checkout/orderSummery.js";
import { cart } from "../../data/cart-oop.js";
import { loadProducts } from "../../data/products.js";  

const productID1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
const productID2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
describe('test suite: render order summary', () => {

  beforeAll(async () => {
    await loadProducts();
  });
  let fakeCartJSON;

  beforeAll(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => fakeCartJSON);
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      if (key === 'cart-oop') fakeCartJSON = value;
    });
  });
  
  beforeEach(() => {
    fakeCartJSON = JSON.stringify([
      {
        productId: productID1,
        quantity: 2,
        deliveryOptionsId: 1
      }, {
        productId: productID2,
        quantity: 1,
        deliveryOptionsId: 2
      }
    ]);
    cart.loadFromStorage();
  });
  it ('displays the cart ' , () => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header-middle-section"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`
    
    renderCheckoutPage();
    
   
    expect(
    document.querySelectorAll('.js-cart-item-container').length
  ).toEqual(2);
  expect(
  document.querySelector(`.js-cart-item-container-${productID1} .quantity-label`).innerText
  ).toEqual('2')

  expect(
    document.querySelectorAll('.js-cart-item-container').length
  ).toEqual(2);
  expect(
  document.querySelector(`.js-cart-item-container-${productID2} .quantity-label`).innerText
  ).toEqual('1')

   expect(
      document.querySelector(`.js-product-name-${productID1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
  
    fakeCartJSON = JSON.stringify([{
      productId: productID1,
      quantity: 2,
      deliveryOptionsId: 1
    }, {
      productId: productID2,
      quantity: 1,
      deliveryOptionsId: 2
    }]);
 
    cart.loadFromStorage();
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productID1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionsId).toEqual(1);
    expect(cart.cartItems[1].productId).toEqual(productID2);
    expect(cart.cartItems[1].quantity).toEqual(1);
    expect(cart.cartItems[1].deliveryOptionsId).toEqual(2);
    })
      

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  it('updates the delivery options' , () => {
    // Prepare DOM and render with fixture data
    document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header-middle-section"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`
    
    renderCheckoutPage();

    document.querySelector('.js-delivery-option-input-3').click();
    expect(
      document.querySelector(`.js-delivery-option-input-${productID1}-3`).checked
    ).toEqual(true);
 
  
   expect(
    document.querySelector(`.js-cart-item-container-${productID1} .quantity-label`).innerText
  ).toEqual('2')
  expect(
    document.querySelector(`.js-cart-item-container-${productID2} .quantity-label`).innerText
  ).toEqual('1')
  expect(
    cart.cartItems[0].deliveryOptionsId
  ).toEqual(3)
  expect(
    cart.cartItems[1].deliveryOptionsId
  ).toEqual(2)

  expect(
    document.querySelector('.js-payment-summary-shipping').innerText
  ).toEqual('$14.98');
  expect(
    document.querySelector('.js-payment-summary-total').innerText
  ).toEqual('$63.50');
  
   })

  });