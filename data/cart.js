export let cart;

loadFromStorage();


export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
 cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionsId: 1
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionsId: 2
  }];
}

}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function calculateCartQuantity() {
  
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });



    return cartQuantity;
}

export function addToCart(productId, productQuantity) {
  // Validate inputs
  if (!productId || isNaN(productQuantity) || productQuantity <= 0) {
    console.error('Invalid parameters for addToCart:', { productId, productQuantity });
    return;
  }

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity,
      deliveryOptionsId: 1

    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOptionsId(productId, deliveryOptionsId) {
let matchingItem;

cart.forEach((cartItem) => {
  if (productId === cartItem.productId) {
    matchingItem = cartItem;
  }
});

matchingItem.deliveryOptionsId = deliveryOptionsId;

saveToStorage();
}