import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
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

    console.log('Payment Summary:', {
        productPriceCents,
        shippingPriceCents,
        totalBeforeTaxCents,
        taxCents,
        totalCents
    });

    // Update the payment summary in the DOM
    const itemsElement = document.querySelector('.payment-summary-row:nth-child(2) .payment-summary-money');
    const shippingElement = document.querySelector('.payment-summary-row:nth-child(3) .payment-summary-money');
    const subtotalElement = document.querySelector('.payment-summary-row:nth-child(4) .payment-summary-money');
    const taxElement = document.querySelector('.payment-summary-row:nth-child(5) .payment-summary-money');
    const totalElement = document.querySelector('.payment-summary-row:nth-child(6) .payment-summary-money');

    if (itemsElement) itemsElement.textContent = `$${formatCurrency(productPriceCents)}`;
    if (shippingElement) shippingElement.textContent = `$${formatCurrency(shippingPriceCents)}`;
    if (subtotalElement) subtotalElement.textContent = `$${formatCurrency(totalBeforeTaxCents)}`;
    if (taxElement) taxElement.textContent = `$${formatCurrency(taxCents)}`;
    if (totalElement) totalElement.textContent = `$${formatCurrency(totalCents)}`;
}