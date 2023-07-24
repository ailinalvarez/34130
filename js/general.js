function getPizzaOrdersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('PizzaOrder')) || [];
}

  const carritoPrendas = getPizzaOrdersFromLocalStorage();