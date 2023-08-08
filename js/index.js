class orderedPizza {
    constructor(orderNumber, details, price) {
        this.orderNumber = orderNumber,
        this.details = details,
        this.price = price
    }
}

/*********** PIZZA TAMANIO ************/

const individual = document.querySelector(".individual");
const mediano = document.querySelector(".mediano");
const familiar = document.querySelector(".familiar");

function pizza (tamanioSeleccionado) {
    //If we select a size then the ingredient buttons should be clickable again.
    if(document.querySelector(".salsa").disabled == true) {
        enableIngredients();
    }
    const seleccionados = document.querySelector(".seleccionados");

    //If we change size then clear the order
    while (seleccionados.firstChild) {
        seleccionados.removeChild(seleccionados.lastChild);
    }

    let tamanioTitulo = document.querySelector(".tamanioTitulo")

    //If the size was not selected before this, add the size and price to the carrito. Otherwise just change the size and price.
    if (tamanioTitulo == null) {
        const tamanio = document.createElement("h3");
        tamanio.className = "tamanioTitulo"
        const tamanioSelect = document.createTextNode(tamanioSeleccionado);

        tamanio.appendChild(tamanioSelect);
        seleccionados.appendChild(tamanio);
    } else {
        tamanioTitulo.innerHTML = tamanioSeleccionado
    }
    if (tamanioSeleccionado === "Individual") {
        for(index in ingredienteObjectoArray) {
            ingredienteObjectoArray[index].individual()
        }
        document.querySelector(".total").innerHTML = 300
    } else if (tamanioSeleccionado === "Mediana") {
        for(index in ingredienteObjectoArray) {
            ingredienteObjectoArray[index].medianana()
        }
        document.querySelector(".total").innerHTML = 400
    } else {
        for(index in ingredienteObjectoArray) {
            ingredienteObjectoArray[index].grande()
        }
        document.querySelector(".total").innerHTML = 500
    }
}


individual.addEventListener("click", function() {pizza("Individual")});
mediano.addEventListener("click", function() {pizza("Mediana")});
familiar.addEventListener("click", function() {pizza("Familiar")});

/********** INGREDIENTES **********/

class topping {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.originalPrecio = precio;
        this.precio = precio;
        this.individual = function () {
            this.precio = parseInt(this.originalPrecio);
        }
        this.medianana = function () {
            this.precio = parseInt(this.originalPrecio * 1.2);
        };
        this.grande = function () {
            this.precio = parseInt(this.originalPrecio * 1.4);
        };
    }
};


const sTomate = new topping("Salsa de Tomate", 100)
const sPicante = new topping("Salsa Picante", 100)
const aTruffa = new topping ("Aceite de Truffa", 150)
const aOliva = new topping ("Aceite de Oliva", 120)
const qMuzza = new topping("Muzzarella", 200)
const qAzul = new topping ("Queso Azul", 250)
const qPecorino = new topping ("Pecorino", 275)
const qCheddar = new topping ("Cheddar", 220)
const oVerdes = new topping ("Olivas Verdes", 100)
const oNegras = new topping ("Olivas Negras", 100)
const champig = new topping("Champiñones", 200)
const pina = new topping("Anana", 180)
const cebo = new topping("Cebolla", 150)
const morronRosti = new topping ("Pimiento Rostizado", 150)
const tomateDis = new topping ("Tomates Disecados", 200)
const tomateChe = new topping("Tomate Cherry", 150)
const fPepperoni = new topping("Peperoni", 250)
const fJamon = new topping("Jamon", 200)
const fSalami = new topping ("Salami", 250)
const fPanceta = new topping ("Panceta", 250)

const ingredienteObjectoArray = [sTomate, sPicante, aTruffa, aOliva, qMuzza, qAzul, qPecorino, qCheddar, oVerdes, oNegras, champig, pina, cebo, morronRosti, tomateDis, tomateChe, fPepperoni, fJamon, fSalami, fPanceta] 

const salsa = document.querySelector(".salsa");
const picante = document.querySelector(".picante");
const truffa = document.querySelector(".truffa");
const oliva = document.querySelector(".oliva");
const muzza = document.querySelector(".muzza");
const azul = document.querySelector(".azul");
const pecorino = document.querySelector(".pecorino");
const cheddar = document.querySelector(".cheddar");
const olivasV = document.querySelector(".verde");
const olivasN = document.querySelector(".negra");
const champi = document.querySelector(".champi");
const anana = document.querySelector(".anana");
const cebolla = document.querySelector(".cebolla");
const morron = document.querySelector(".morron");
const tomateSeco = document.querySelector(".tomate-seco");
const cherry = document.querySelector(".cherry");
const pepperoni = document.querySelector(".pepperoni");
const salami = document.querySelector(".salami");
const jamon = document.querySelector(".jamon");
const panceta = document.querySelector(".panceta");

//Adds ingredients to the order
function ingredientesSeleccionados(ingredienteObjecto) {
    const div = document.createElement("div")
    const idName = ingredienteObjecto.nombre.replaceAll(" ", "")

    //If the ingrediente is not yet in the order then add the name, the price, update the total and add a remove button to that ingredient in the carrito
    if (document.getElementById(idName) == null) {
        div.id = idName
        const ingredienteNombre = document.createElement("p");
        ingredienteNombre.className = "nombre es"
        const ingredientePrecio = document.createElement("h5");
        ingredientePrecio.className = "precio"
        const removeButton = document.createElement("button")
        const ingSelectPrecio = document.createTextNode(`$ ${ingredienteObjecto.precio}`);
        const ingSelectNombre = document.createTextNode(ingredienteObjecto.nombre);
        const ingSeleccionados = document.querySelector(".seleccionados");
        
        //Gives the button the ability to remove the div with the ingredient
        removeButton.addEventListener("click", function () {
            let removeThis = document.getElementById(idName)
            removeItem(removeThis, ingredienteObjecto.precio)
        })
        ingredientePrecio.appendChild(ingSelectPrecio);
        ingredienteNombre.appendChild(ingSelectNombre);
        div.appendChild(ingredienteNombre);
        div.appendChild(ingredientePrecio);
        div.appendChild(removeButton);
        ingSeleccionados.appendChild(div);

        updateTotal(ingredienteObjecto.precio)
    }
}

//Removes the ingredient from the carrito and updates the total
function removeItem (item, precio) {
    updateTotal((-precio))
    item.remove()
}

//Adds the cost of a size or ingredient to the total price
function updateTotal (precio) {
    document.querySelector(".total").innerHTML = parseInt(document.querySelector(".total").innerHTML) + precio
}

salsa.addEventListener("click", function() {
    ingredientesSeleccionados(sTomate)
});
picante.addEventListener("click", function() {
    ingredientesSeleccionados(sPicante)
});
truffa.addEventListener("click", function() {
    ingredientesSeleccionados(aTruffa)
});
oliva.addEventListener("click", function() {
    ingredientesSeleccionados(aOliva)
});
muzza.addEventListener("click", function() {
    ingredientesSeleccionados(qMuzza)
});
azul.addEventListener("click", function() {
    ingredientesSeleccionados(qAzul)
});
pecorino.addEventListener("click", function() {
    ingredientesSeleccionados(qPecorino)
});
cheddar.addEventListener("click", function() {
    ingredientesSeleccionados(qCheddar)
});
olivasV.addEventListener("click", function() {
    ingredientesSeleccionados(oVerdes)
});
olivasN.addEventListener("click", function() {
    ingredientesSeleccionados(oNegras)
});
champi.addEventListener("click", function() {
    ingredientesSeleccionados(champig)
});
anana.addEventListener("click", function() {
    ingredientesSeleccionados(pina)
});
cebolla.addEventListener("click", function() {
    ingredientesSeleccionados(cebo)
});
morron.addEventListener("click", function() {
    ingredientesSeleccionados(morronRosti)
});
tomateSeco.addEventListener("click", function() {
    ingredientesSeleccionados(tomateDis)
});
cherry.addEventListener("click", function() {
    ingredientesSeleccionados(tomateChe)
});
pepperoni.addEventListener("click", function() {
    ingredientesSeleccionados(fPepperoni)
});
salami.addEventListener("click", function() {
    ingredientesSeleccionados(fSalami)
});
jamon.addEventListener("click", function() {
    ingredientesSeleccionados(fJamon)
});
panceta.addEventListener("click", function() {
    ingredientesSeleccionados(fPanceta)
});

function disableIngredients() {
    const array = []
    const base = document.getElementsByClassName("base")
    const queso = document.getElementsByClassName("queso-btn")
    const oliva = document.getElementsByClassName("oliva")
    const veg = document.getElementsByClassName("veg")
    const fiambre = document.getElementsByClassName("fiambre")
    //const aniadirPizza = document.querySelector("#addToCart")

    array.push(base, queso, oliva, veg, fiambre)

    //ve cada boton del array y  los inactiva
    for(index in array) {
        let temp = array[index]
        for(item in temp) {
            temp[item].disabled = true
        }
    }
}

function enableIngredients() {
    const array = []
    const base = document.getElementsByClassName("base")
    const queso = document.getElementsByClassName("queso-btn")
    const oliva = document.getElementsByClassName("oliva")
    const veg = document.getElementsByClassName("veg")
    const fiambre = document.getElementsByClassName("fiambre")
    //const aniadirPizza = document.querySelector("#addToCart")

    array.push(base, queso, oliva, veg, fiambre)

    //Goes through each ingredient button and enables them
    for(index in array) {
        let temp = array[index]
        for(item in temp) {
            temp[item].disabled = false
        }
    }
}

disableIngredients()

const aniadirPizza = document.querySelector("#addToCart")
aniadirPizza.addEventListener("click", function() {
    aniadirACarrito()
})

let counter = 1
const pizzasArray = []
function aniadirACarrito() {
    //Create an object of the order to save
    const detailsArray = []
    const ingredientesNombre = document.querySelectorAll(".nombre")
    detailsArray.push(document.querySelector(".tamanioTitulo").innerHTML)
    for(index in ingredientesNombre) {
        if(ingredientesNombre[index].innerHTML == null) {
            continue;
        }
        detailsArray.push(ingredientesNombre[index].innerHTML)
    }
    const precioPizza = parseInt(document.querySelector(".total").innerHTML)
    const order = new orderedPizza(counter, detailsArray, precioPizza)
    pizzasArray.push(order)

    //Save the object order to local storage
    window.localStorage.setItem("PizzaOrder", JSON.stringify(pizzasArray))
    counter++

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })

    Toast.fire({
        icon: 'success',
        title: 'Pizza sumada a tu orden'
    })

    //Clear the order from the cart
    const seleccionados = document.querySelector(".seleccionados");
    while (seleccionados.firstChild) {
        seleccionados.removeChild(seleccionados.lastChild);
    }
    document.querySelector(".total").innerHTML = 0

    disableIngredients();
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