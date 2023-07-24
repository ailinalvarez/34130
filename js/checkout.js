const orderTicket = document.querySelector('.ticket')
const totalPrice = document.querySelector('.checktotal')
const confirmarOrdenBtn = document.querySelector(".confirmar-orden")
console.log(carritoPrendas)

function listarProductosEnCarritoHTML(prendaArr) {
    orderTicket.innerHTML = ''
    let totalPizzaPrice = 0;
    for (const arr in prendaArr) {
        let toppingsString = ''
        for (const index in prendaArr[arr].details) {
            if (index == 0) {
                continue
            }
            toppingsString += prendaArr[arr].details[index] + ", "
        }
        let htmlPizza = `<div id="pizza${prendaArr[arr].orderNumber}"><h2>Pizza ${prendaArr[arr].orderNumber}      <button class="removeBtn">Remove</button></h2>
                <h3>Size: ${prendaArr[arr].details[0]}</h3>
                <h3>Toppings: ${toppingsString}</h3>
                <h3>Price: $<h3 class="pizzaPrice">${prendaArr[arr].price}</h3></h3><br></div>`
        console.log(htmlPizza)
        orderTicket.innerHTML +=htmlPizza
        totalPizzaPrice += prendaArr[arr].price
    }
    totalPrice.innerHTML = `<h3>Total: $<h3 class="totalPriceAmt">${totalPizzaPrice}</h3></h3>`
}

listarProductosEnCarritoHTML(carritoPrendas);

function confirmarOrden () {
    try {
        listarProductosEnCarritoHTML()
        window.localStorage.setItem("PizzaOrder", [])
    } catch(e) {
        return
    }
}

confirmarOrdenBtn.addEventListener("click", confirmarOrden)

const removeButtons = document.querySelectorAll(".removeBtn")
removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removePizza("pizza" + (index + 1));
    });
  });

const totalPriceAmt = document.querySelector(".totalPriceAmt")
function removePizza(pizzaID) {
    const pizza = document.getElementById(pizzaID)
    const price = pizza.querySelector(".pizzaPrice").innerHTML
    totalPriceAmt.innerHTML = parseInt(totalPriceAmt.innerHTML) - parseInt(price)
    pizza.remove()
}