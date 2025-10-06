import {cart} from '../../data/cart-oop.js';
import {products, getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption , calculateDeliveryDate} from '../../data/deliveryOptions.js'
import {renderPaymentSummary} from './paymentSummery.js';




function getDeliveryDate(deliveryOptionsId) {
  const option = getDeliveryOption(deliveryOptionsId);
  if (!option) return 'Delivery date: TBD';
  const deliveryDate = calculateDeliveryDate(deliveryOptionsId);
  return deliveryDate;
  
}
function updateCheckoutHeader() {
  const cartQuantity = cart.calculateCartQuantity();
  
  document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity} items</a>)`;
}

function deliveryOptionsHtml(productId  , cartItem) {

  let html = '';
  deliveryOptions.forEach((option) => {
    const deliveryDateFormatted = calculateDeliveryDate(option.id);

    const priceString = option.priceCents === 0
      ? 'FREE Shipping'
      : `$${formatCurrency(option.priceCents)}`;

      const isChecked = cartItem.deliveryOptionsId === option.id;
    html += `
     <div class="delivery-option
     js-delivery-option-${productId}
     js-delivery-option-${option.id}
    js-delivery-option

     
     ">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input
              js-delivery-option-input-${productId}
              js-delivery-option-input-${option.id}
              js-delivery-option-input-${productId}-${option.id}
              "
              name="delivery-option-${productId}"
              data-product-id="${productId}"
              data-delivery-options-id="${option.id}">
            <div>
              <div class="delivery-option-date
              js-delivery-option-input-${productId}
              js-delivery-option-input-${option.id}
              ">
                ${deliveryDateFormatted}
              </div>
              <div class="delivery-option-price
              js-delivery-option-input-${productId}
              js-delivery-option-input-${option.id}
              ">
                ${priceString} - Shipping
              </div>
            </div>
          </div>

    `;


  });

  return html;
}

export function renderCheckoutPage() {
  // Ensure we render using the latest cart from storage (tests rely on this)
  if (typeof cart.loadFromStorage === 'function') {
    cart.loadFromStorage();
  }
  console.log('renderCheckoutPage called');
  console.log('Cart:', cart);
  console.log('Products:', products);
  
  updateCheckoutHeader();
  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);


    cartSummaryHTML += `
      <div class="cart-item-container
      js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          ${getDeliveryDate(cartItem.deliveryOptionsId)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name
           js-product-name-${matchingProduct.id}
            ">
              ${matchingProduct.name}
            </div>
            <div class="product-price
            js-product-price-${matchingProduct.id}
            ">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span class="js-product-quantity-${matchingProduct.id}">
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" min="1" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
              <span class ="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary 
              js-delete-link-${matchingProduct.id}
              js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
           
              ${deliveryOptionsHtml(matchingProduct.id , cartItem)}
            
          </div>
        </div>
      </div>
    `;
  });

  console.log('Cart Summary HTML:', cartSummaryHTML);
  
  const orderSummaryElement = document.querySelector('.js-order-summary');
  console.log('Order Summary Element:', orderSummaryElement);
  
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = cartSummaryHTML;
    console.log('HTML set successfully');
  } else {
    console.error('Order summary element not found!');
  }

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);
        
        // Regenerate the entire order summary instead of manipulating the DOM directly
        renderCheckoutPage();
        renderPaymentSummary();
      });
    });
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        // Hide the update link and show the input field and save link
        link.style.display = 'none';
        document.querySelector(`.js-quantity-input-${productId}`).style.display = 'inline-block';
        document.querySelector(`.js-save-link[data-product-id="${productId}"]`).style.display = 'inline-block';
        renderPaymentSummary();
      });
    });

  // Add save functionality
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = parseInt(quantityInput.value, 10);
        
        // Validate the new quantity
        if (isNaN(newQuantity) || newQuantity <= 0 || newQuantity > 99) {
          alert('Please enter a valid quantity');
          return;
        }
        
        // Update the cart
        const cartItem = cart.cartItems.find(item => item.productId === productId);
        if (cartItem) {
          cartItem.quantity = newQuantity;
          // Save to localStorage
          cart.saveToStorage();
          
          // Update the quantity label
          document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent = newQuantity;
          
          // Hide the input and save link, show the update link
          quantityInput.style.display = 'none';
          link.style.display = 'none';
          document.querySelector(`.js-update-link[data-product-id="${productId}"]`).style.display = 'inline-block';
          
          // Update the checkout header
          updateCheckoutHeader();
          renderPaymentSummary();
        }
      });
    });

  // Hide input fields and save links by default
  document.querySelectorAll('.js-quantity-input, .js-save-link')
    .forEach((element) => {
      element.style.display = 'none';
    });

  // Add delivery option selection functionality
  document.querySelectorAll('.delivery-option-input')
    .forEach((radioButton) => {
      radioButton.addEventListener('change', () => {
        const productId = radioButton.dataset.productId;
        const deliveryOptionsId = parseInt(radioButton.dataset.deliveryOptionsId, 10);
        
        cart.updateDeliveryOptionsId(productId, deliveryOptionsId);
        
        // Update the delivery date display
        const deliveryDateElement = document.querySelector(`.js-cart-item-container-${productId} .delivery-date`);
        if (deliveryDateElement) {
          deliveryDateElement.textContent = getDeliveryDate(deliveryOptionsId);


        }
        renderPaymentSummary();
      });
    });
}
