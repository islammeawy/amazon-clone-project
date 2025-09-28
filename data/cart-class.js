class Cart{
cartItems;
#localStorageKey;

constructor(localStorageKey){
this.#localStorageKey = localStorageKey;
this.loadFromStorage();
}


loadFromStorage () {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

  if (!this.cartItems) {
   this.cartItems = [{
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
      saveToStorage() {
       localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
      }
       addToCart(productId, productQuantity) {
    // Validate inputs
    if (!productId || isNaN(productQuantity) || productQuantity <= 0) {
      console.error('Invalid parameters for addToCart:', { productId, productQuantity });
      return;
    }
  
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: productQuantity,
        deliveryOptionsId: 1
  
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  updateDeliveryOptionsId(productId, deliveryOptionsId) {
    if(deliveryOptionsId !== 1 && deliveryOptionsId !== 2 && deliveryOptionsId !== 3) {
      return;
    }
  let matchingItem;
  
  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionsId = deliveryOptionsId;
  
  this.saveToStorage();
  } 
  
  calculateCartQuantity() {
    
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
  
  
      return cartQuantity;
  }




}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');


console.log(cart);
console.log(businessCart);

export { Cart, cart, businessCart };
