import { renderCheckoutPage } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import  '../data/cart-class.js';
import '../data/car.js'
import '../data/products.js'
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js';

Promise.all([
 loadProducts()
]).then(() => {
  renderCheckoutPage();
  renderPaymentSummary();
});