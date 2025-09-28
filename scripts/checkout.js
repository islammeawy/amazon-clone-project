import { renderCheckoutPage } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import  '../data/cart-class.js';
console.log('checkout.js loaded');
console.log('About to call renderCheckoutPage');
  
renderCheckoutPage();
renderPaymentSummary(); 