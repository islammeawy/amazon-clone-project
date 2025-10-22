const orders =JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveTOStorage();
}
function saveTOStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}