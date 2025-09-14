import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  if (!cart){
    document.querySelector('.js-cart-quantity')
      .innerHTML = '';
    return;
  }
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productContainer = button.closest('.product-container');
      const productQuantity = parseInt(productContainer.querySelector('select').value, 10);
      
      // Validate that quantity is a valid number
      if (isNaN(productQuantity) || productQuantity <= 0) {
        console.error('Invalid quantity:', productContainer.querySelector('select').value);
        return;
      }
      
      addToCart(productId, productQuantity);
      updateCartQuantity();
      
      // Show checkmark animation
    
      const addedToCartElement = productContainer.querySelector('.added-to-cart');
      
      // Clear any existing timeout to prevent multiple timeouts
      if (addedToCartElement.hideCheckmarkTimeout) {
        clearTimeout(addedToCartElement.hideCheckmarkTimeout);
      }
      
      // Show the checkmark
      addedToCartElement.classList.add('added-to-cart-visible');
      
      // Hide the checkmark after 2 seconds
      addedToCartElement.hideCheckmarkTimeout = setTimeout(() => {
        addedToCartElement.classList.remove('added-to-cart-visible');
        addedToCartElement.hideCheckmarkTimeout = null;
      }, 2000);
    });
  });

// Optional: If you want to update cart quantity on page load
updateCartQuantity();