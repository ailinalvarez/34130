const orderTicket = document.querySelector('.ticket')
const totalPrice = document.querySelector('.checktotal')
const confirmarOrdenBtn = document.querySelector(".confirmar-orden")
const mostNombre = document.querySelector(".tCheckout")
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
        let htmlPizza = `<div id="pizza ${prodArr[arr].orderNumber}"><h2>Pizza ${prodArr[arr].orderNumber}      <button class="removeBtn es">Eliminar</button></h2>
                <h3 class="es">Tamaño: ${prodArr[arr].details[0]}</h3>
                <h5 class="es">Tus seleccionados: ${toppingsString}</h5>
                <h3 class="pizzaPrice es"> Valor: $ ${prodArr[arr].price}</h3><br></div>`
        console.log(htmlPizza)
        orderTicket.innerHTML +=htmlPizza
        totalPizzaPrice += prodArr[arr].price
    }
    totalPrice.innerHTML = `<h3 class="total-orden es">Total: $ <h3 class="totalPriceAmt">${totalPizzaPrice}</h3></h3>`
}

listarProductosEnCarritoHTML(carritoProductos);

function confirmarOrden () {
    try {
        listarProductosEnCarritoHTML()
        window.localStorage.setItem("PizzaOrder", [])
        Swal.fire(
            {icon: 'success',
            title: 'Gracias por ordenar con nosotros!',
            text: 'Tu pizza estará lista en unos 15-20 min 😃'}
        )
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
    const price = pizza.querySelector(".pizzaPrice").innerHTML.split(" ");
    const pricePizza = price[price.length-1];
    totalPriceAmt.innerHTML = parseInt(totalPriceAmt.innerHTML) - parseInt(pricePizza);
    pizza.remove()
}



async function translate(string) {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '8bd30e9787msh145d139260e9733p1259c2jsn7f57315ba0ec',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'es',
            target_language: 'en',
            text: string
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.translatedText;
    } catch (error) {
        console.error(error);
    }

}

function translateElements() {
    const elements = document.querySelectorAll('.es'); 
    
    elements.forEach(async element => {
        const originalText = element.innerHTML;
        
        try {
            const translatedText = await translate(originalText);
            element.innerHTML = translatedText;
        } catch (error) {
            console.error(error);
        }
    });
}

const transladoBtn = document.querySelector(".translate")
const text = document.querySelectorAll(".es")
transladoBtn.addEventListener('click', translateElements);

