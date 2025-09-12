export const cart = [];

export function addToCart(productId, quantity, productName) {
  let matchingItem = null;
  cart.forEach((item) => {
    if (item.id === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
      name: productName
    });
  }
}