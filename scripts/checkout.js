import { renderCheckoutPage } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummery.js";
import  '../data/cart-class.js';
import '../data/car.js'
import '../data/products.js'
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js';

async function  loadPage(){

  try {
    await loadProducts();
  }
  catch (error){
    console.error('Error loading products:', error);
    return;
  }
  renderCheckoutPage();
  renderPaymentSummary();
}
loadPage();