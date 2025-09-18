import { renderCheckoutPage } from "../../scripts/checkout/orderSummery.js";
import { loadFromStorage  , cart} from "../../data/cart.js";

const productID1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
const productID2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
describe('test suit : render order summery', () => {
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

  document.querySelector('.js-test-container').innerHTML='';
  
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
    
    });
  });