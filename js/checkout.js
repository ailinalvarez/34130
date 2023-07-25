const orderTicket = document.querySelector('.ticket')
const totalPrice = document.querySelector('.checktotal')
const confirmarOrdenBtn = document.querySelector(".confirmar-orden")
console.log(carritoProductos)

function listarProductosEnCarritoHTML(prodArr) {
    orderTicket.innerHTML = ''
    let totalPizzaPrice = 0;
    for (const arr in prodArr) {
        let toppingsString = ''
        for (const index in prodArr[arr].details) {
            if (index == 0) {
                continue
            }
            toppingsString += prodArr[arr].details[index] + ", "
        }
        let htmlPizza = `<div id="pizza ${prodArr[arr].orderNumber}"><h2>Pizza ${prodArr[arr].orderNumber}      <button class="removeBtn">Eliminar</button></h2>
                <h3>Size: ${prodArr[arr].details[0]}</h3>
                <h5>Tus seleccionados: ${toppingsString}</h5>
                <h3 class="pizzaPrice"> Valor: $ ${prodArr[arr].price}</h3><br></div>`
        console.log(htmlPizza)
        orderTicket.innerHTML +=htmlPizza
        totalPizzaPrice += prodArr[arr].price
    }
    totalPrice.innerHTML = `<h3 class="total-orden">Total: $ <h3 class="totalPriceAmt">${totalPizzaPrice}</h3></h3>`
}

listarProductosEnCarritoHTML(carritoProductos);

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
        removePizza("pizza " + (index + 1));
        });
    });

const totalPriceAmt = document.querySelector(".totalPriceAmt")
function removePizza(pizzaID) {
    const pizza = document.getElementById(pizzaID);
    const price = pizza.querySelector(".pizzaPrice").innerHTML;
    totalPriceAmt.innerHTML = parseInt(totalPriceAmt.innerHTML) - parseInt(price)
    pizza.remove()
}