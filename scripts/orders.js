import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import {getProduct, loadProducts} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from '../data/cart-class.js';

async function renderOrdersPage() {
  await loadProducts();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = order.orderTime ? dayjs(order.orderTime).format('MMMM D') : 'Unknown date';
    const totalCostCents = order.totalCostCents || order.total || 0;
    const orderId = order.id || order.orderId || '';

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  function productsListHTML(order) {
    let productsListHTML = '';

    if (!order.products) {
      return '';
    }

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      if (!product) {
        console.error('Product not found:', productDetails.productId);
        return;
      }

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              productDetails.estimatedDeliveryTime 
                ? dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                : 'TBD'
            }
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary" data-product-id="${product.id}" data-order-id="${order.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-container').innerHTML = ordersHTML;

  // Add event listeners for "Buy it again" buttons
  document.querySelectorAll('.buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const product = getProduct(productId);
      if (!product) {
        console.error('Product not found:', productId);
        return;
      }
      cart.addToCart(productId, 1);
      alert('Added to cart!');
    });
  });
}

renderOrdersPage();