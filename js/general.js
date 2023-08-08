function getPizzaOrdersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('PizzaOrder')) || [];
}

const carritoProductos = getPizzaOrdersFromLocalStorage();
