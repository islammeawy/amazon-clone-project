import {calculateCartQuantity, cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'

function getDeliveryDate(deliveryOptionsId) {
  const option = deliveryOptions.find(option => option.id === deliveryOptionsId);
  if (!option) return 'Delivery date: TBD';
  
  const today = dayjs();
  const deliveryDate = today.add(option.deliveryDateDays, 'day');
  const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');
  
  return `Delivery date: ${deliveryDateFormatted}`;
}
function updateCheckoutHeader() {
  const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity} items</a>)`;
}
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        ${getDeliveryDate(cartItem.deliveryOptionsId)}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" min="1" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
            <span class ="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
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
 

function deliveryOptionsHtml(productId  , cartItem) {

  let html = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDateDays, 'day')
    const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');

    const priceString = option.priceCents === 0
      ? 'FREE Shipping'
      : `$${formatCurrency(option.priceCents)}`;

      const isChecked = cartItem.deliveryOptionsId === option.id;
    html += `
     <div class="delivery-option">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                ${deliveryDateFormatted}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>

    `;


  });

  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      
      // Update the checkout header after deletion
      updateCheckoutHeader();
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
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update the quantity label
        document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent = newQuantity;
        
        // Hide the input and save link, show the update link
        quantityInput.style.display = 'none';
        link.style.display = 'none';
        document.querySelector(`.js-update-link[data-product-id="${productId}"]`).style.display = 'inline-block';
        
        // Update the checkout header
        updateCheckoutHeader();
      }
    });
  });

// Hide input fields and save links by default
document.querySelectorAll('.js-quantity-input, .js-save-link')
  .forEach((element) => {
    element.style.display = 'none';
  });



// Call the function when the page loads
updateCheckoutHeader();