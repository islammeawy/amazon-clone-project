import {cart} from '../../data/cart-oop.js';
import {products} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        
        // Find the product
        let product;
        products.forEach((p) => {
            if (p.id === productId) {
                product = p;
            }
        });
        
        productPriceCents += cartItem.quantity * product.priceCents;
        
        // Find the delivery option
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === cartItem.deliveryOptionsId) {
                deliveryOption = option;
            }
        });
        
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

  
    const paymentSummaryHTML = ` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.cartItems.length}):</div>
            <div class="payment-summary-money">${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money
            js-payment-summary-shipping
            
            ">${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money
            js-payment-summary-total
            
            ">${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    paymentSummaryElement.innerHTML = paymentSummaryHTML;
}