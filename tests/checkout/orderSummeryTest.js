import { renderCheckoutPage } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage  , cart} from "../../data/cart.js";

const productID1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
const productID2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
describe('test suite: render order summary', () => {
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productID1,
        quantity: 2,
        deliveryOptionsId: 1
      }, {
        productId: productID2,
        quantity: 1,
        deliveryOptionsId: 2
      }]);
    });
    spyOn(localStorage, 'setItem');
  });
  it ('displays the cart ' , () => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header-middle-section"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`
    
    loadFromStorage();
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
  
  
    })
  it('removes the product from the cart' , () => {
    // Reset cart state for this test
    cart.length = 0;
    
    document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header-middle-section"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`
    
    loadFromStorage();
    renderCheckoutPage();

    document.querySelector(`.js-delete-link[data-product-id="${productID1}"]`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productID1}`)
    ).toBeNull();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productID2);
    expect(
      document.querySelector(`.js-product-name-${productID2}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-price-${productID2}`).innerText
    ).toEqual('$12.99');
    expect(
      document.querySelector(`.js-product-quantity-${productID2}`).innerText
    ).toEqual('Quantity: 1');

    
    });
  
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  it('updates the delivery options' , () => {
   
    document.querySelector('. js-delivery-option-input-3').click
    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);
 
  
   expect(
    document.querySelector(`.js-cart-item-container-${productID1} .quantity-label`).innerText
  ).toEqual('2')
  expect(
    document.querySelector(`.js-cart-item-container-${productID2} .quantity-label`).innerText
  ).toEqual('1')
  expect(
    cart[0].deliveryOptionsId
  ).toEqual(3)
  expect(
    cart[1].deliveryOptionsId
  ).toEqual(2)

  expect(
    document.querySelector('.js-payment-summary-shipping').innerText
  ).toEqual('$14.98');
  expect(
    document.querySelector('.js-payment-summary-total').innerText
  ).toEqual('$63.50');
  
   })

  });