import {cart} from '../data/cart.js';

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<div class="product-container">
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
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class ="js-quantity-selector-${product.id}">
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

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;


const addedToCartTimeouts = {};


document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const {productId} = button.dataset;
    const {productName} = button.dataset;
    let matchingItem;

    cart.forEach((item) => {
      if (item.id === productId) {
        matchingItem = item;
      }
    });

    const quantity = Number(
      button.parentElement.querySelector('.product-quantity-container select').value
    );

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId ,
        quantity ,
        name: productName
      });
    }

    // Update cart quantity in header
    document.querySelector('.cart-quantity').textContent = cart.reduce((total, item) => total + item.quantity, 0);

 
    // Show "Added" message and reset timer if needed
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');

    // Clear previous timeout if exists
    if (addedToCartTimeouts[productId]) {
      clearTimeout(addedToCartTimeouts[productId]);
    }

    // Set new timeout
    addedToCartTimeouts[productId] = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
      addedToCartTimeouts[productId] = null;
    }, 2000);
  });
});