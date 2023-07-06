const orderButton = document.querySelector(".order");

function orderPizza () {
    alert("Bienvenido a crea tu propia pizza")
    let nombre = "";
    let email;
    while (nombre == "") {
        nombre = prompt("Nos gustaria saber tu nombre") 
    }
    alert("Bienvenido " + nombre)
    let desear = confirm("Deseas ordenar una pizza " + nombre + "?")
    if (desear) {
        let emailDomain = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        while (true) {
            email = prompt("Para poder comunicarnos contigo más tarde necesitamos saber tu casilla de correo")
            if (emailDomain.test(email)) {
                break;
            } else {
                alert("Debes ingresar un correo electrónico válido")
            }
        }
    } else {
        return alert("Será la próxima!")
    }
    let pTamanio = tamanio()
    let toppingSeleccionado = crearPizza(pTamanio.tamanioP, nombre)
    let precioTotal = total(pTamanio.precio, toppingSeleccionado)
    let ordenTotal = "Esto es tu orden:\n" + pTamanio.tamanioP + "\n"
    for (const index in toppingSeleccionado) {
        ordenTotal += toppingSeleccionado[index].nombre + "\n"
    }
    ordenTotal += "\n Tu precio total es: $" + precioTotal + ". Quieres confirmar?"
    let orden = confirm(ordenTotal)
    if (orden) {
        alert( nombre + " tu orden ha sido recibida! Nos comunicaremos contigo a tu email " + email +" para proseguir con el pedido. Muchas gracias por tu pedido, esperamos que lo disfrutes !!")
    } else {
        alert("Te esperamos la próxima!")
    }
}

function tamanio () {
    let ordenartamanio
    let pizzaTamanio

    alert("Empecemos, primero debes el tamaño de la pizza: individual (4 porciones, $200), mediana (8 porciones, $350) o grande (12 porciones, $500)")
    do {
        pizzaTamanio = prompt("Dinos cuál deseas ordernar: individual, mediana o grande?")
        pizzaTamanio.toLowerCase()
        if (pizzaTamanio != "individual" && pizzaTamanio != "mediana" && pizzaTamanio != "grande") {
            alert("Necesitas escribir individual, mediana o grande")
            continue
        }
        ordenartamanio = confirm("Has ordenado " + pizzaTamanio + ". Es correcto?")
    } while (!ordenartamanio)

    if (pizzaTamanio == "individual") {
        return {tamanioP: pizzaTamanio , precio: 200 }
    } else if (pizzaTamanio == "mediana" ){
        return {tamanioP: pizzaTamanio , precio: 350 }
    } else {
        return {tamanioP: pizzaTamanio , precio: 500 }
    }
}

function topping (nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.medianana = function() {
        this.precio = parseInt(this.precio*1.2)
    }
    this.grande = function() {
        this.precio = parseInt(this.precio*1.4)
}
}

const muzza = new topping("muzzarella", 200)
const jamon = new topping("jamon", 320)
const champi = new topping("champiñones", 250)
const anana = new topping("anana", 280)
const cebolla = new topping("cebolla", 150)
const tomate = new topping("tomate", 200)
const peperoni = new topping("peperoni", 420)

function crearPizza (tamanio, nombre) {
    let listaToppings = [muzza, jamon, champi, anana, cebolla, tomate, peperoni];
    
    if (tamanio == "mediana") {
        for (const index in listaToppings) {
            listaToppings[index].medianana();
        }
    } else if (tamanio == "grande") {
        for (const index in listaToppings) {
            listaToppings[index].grande();
        }
    } 
    alert("Ahora veras la lista de toppings que puedes agregar a tu pizza");
    let loop  = true
    while (loop) {
        let lista = ""
        let seleccionados = []
        for (const index in listaToppings ) {
            lista += (listaToppings[index].nombre + " $" + listaToppings[index].precio + "\n")
        }
        let mostrarlista = prompt(lista + "\nDinos cuales son los ingredientes que deseas agregar a tu pizza. Es importante que separes cada ingrediente con una  ' , '. Por ejemplo: anana, cebolla, tomate")
        let mostrarToppings= mostrarlista.split(",")
        for (const index in mostrarToppings) {
            const nombreTopping = mostrarToppings[index].trim()
            const encontrarTopping = listaToppings.find(producto => producto.nombre === nombreTopping);
    
            if (encontrarTopping) {
                seleccionados.push(eval(nombreTopping))
            }
        }
    
        let mostrarSeleccion = ""
        for (const index in seleccionados) {
            mostrarSeleccion += (seleccionados[index].nombre + ", ")
        }
        let confirmar = confirm("Los toppings que seleccionaste son: \n\n" + mostrarSeleccion + " deseas confirmar?")
        if (confirmar) {
            loop = false
            return seleccionados
        } else {
            let continuarOrden = confirm( nombre +" deseas volver a seleccionar sus toppings?")
            if (continuarOrden) {
                continue;
            } else {
                alert("Será la próxima !")
                loop = false
                break;
            }
        }
    }
}   

function total (pizza, toppings) {
    let precio = pizza 
    for (const index in toppings){
        precio += toppings[index].precio
    }
    return precio 
}


orderButton.addEventListener("click", orderPizza)
