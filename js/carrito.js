//Clase constructora de productos
class Productos {
    constructor(nombre, precio, categoria) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseInt(precio);
        this.categoria = categoria.toUpperCase();
        this.cantidad = 0;
        this.stock = true;
    }
    sinStock() {
        this.stock = false;
    }
}
const combos = [
    new Productos("Combo 1", 1600, "combo"),
    new Productos("Combo 2", 1600, "combo"),
    new Productos("Combo 3", 1600, "combo"),
];
const pizza = [
    new Productos("Pizza Muzzarella", 900, "pizza"),
    new Productos("Pizza de Jamon y Queso", 900, "pizza"),
    new Productos("Pizza Napolitana", 900, "pizza"),
    new Productos("Pizza Fugazzeta", 900, "pizza"),
];

let etiquetas = "";
const miCarrito = [];
//
const addCarrito = (producto) => { miCarrito.push(producto) };
function carrito(producto, numSelec) {
    changeCanti(producto, numSelec)
    console.log(miCarrito);
    showCarrito();
}
//Modifica la cantidad del objeto
function changeCanti(producto, numSelec) {
    if (producto.cantidad == 0) {
        addCarrito(producto);
        console.log(producto.cantidad);
        producto.cantidad = select(numSelec);
    } else {
        producto.cantidad += select(numSelec);
    }
}

function showCarrito() {
    let string = "";
    const precioFinal = miCarrito.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);
    for (let i = 0; i < miCarrito.length; i++) {
        string += `<div><p>${miCarrito[i].cantidad} ${miCarrito[i].nombre}......$${miCarrito[i].cantidad*miCarrito[i].precio}</p></div>`;
    }
    let showMiCarrito = document.getElementById("carrito");
    
    string += "Su Precio Final es: $"+precioFinal;
    showMiCarrito.innerHTML=string;
}

function select(numSelec) {
    let selection = document.getElementsByTagName("select");
    return parseInt(selection[numSelec].options[selection[numSelec].selectedIndex].value);
}

/* 
//Crea los productos
function getProductos(listaProductos) {
    let pizzaNapo = new Productos("Pizza Napolitana", 1080, "Pizza");
    let milaNapo = new Productos("milanesa napolitana", 1200, "minutas");
    let empanadaCar = new Productos("Empanada de Carne", 180, "Empanadas");
    listaProductos[0] = pizzaNapo;
    listaProductos[1] = milaNapo;
    listaProductos[2] = empanadaCar;
}
//pushea el producto al carrito
const carrito = function (miCarrito, producto) { miCarrito.push(producto); }
//Suma el precio 
const suma = (n1, n2) => n1 + n2;

//Muestra la cuenta en un alert
function showCarrito(miCarrito) {
    let string = "Su pedido es:\n";
    const precioFinal = miCarrito.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);
    for (let i = 0; i < miCarrito.length; i++) {
        string = string + miCarrito[i].cantidad + " " + miCarrito[i].nombre + ".......$" + (miCarrito[i].precio * miCarrito[i].cantidad) + "\n";
    }
    string = string + "El valor final es : $" + precioFinal;
    return string;
}
//Agrega una cantidad al producto y si es 0 llama a la funcion para ponerlo en el carrito
function agregar(producto, miCarrito, cantidad) {
    if (producto.cantidad == 0) {
        carrito(miCarrito, producto);
    }
    producto.cantidad += cantidad;
}
//Restar la cantidad de productos y si es igual a 0 sacar al producto
function sacar(producto, miCarrito, cantidad) {
    if (producto.cantidad >= cantidad) {
        producto.cantidad -= cantidad;
        if (producto.cantidad == 0) {
            miCarrito.splice(miCarrito.indexOf(producto), 1);
        }
    }
}
//Ingresar los distintos productos
function valiCanti() {
    let canti;
    while (true) {
        canti = parseInt(prompt("Ingrese La cantidad del producto a agregar"));
        if (isNaN(canti) || canti<=0) {
            alert('ingrese un número válido.');
        } else { 
            return canti;
        }
    }
}
//Ingresar la opcion de los productos a agregar
function llenarCarrito(listaProductos, miCarrito) {
    let compra = true;
    while (compra) {
        let opcion = prompt("Opciones 1-3 y 4 para terminar pedido\nEl menu es:\n" + listaProductos[0].nombre + ":" + listaProductos[0].precio + "\n" + listaProductos[1].nombre + ":" + listaProductos[1].precio + "\n" + listaProductos[2].nombre + ":" + listaProductos[2].precio + "\n" + showCarrito(miCarrito));
        switch (opcion) {
            case "1":
                agregar(listaProductos[0], miCarrito, valiCanti());
                break;
            case "2":
                agregar(listaProductos[1], miCarrito, valiCanti());
                break;
            case "3":
                agregar(listaProductos[2], miCarrito, valiCanti());
                break;
            case "4":
                compra = false;
                break;
            default:
                alert("La opcion ingresada fue invalida intentelo de nuevo.");
        }
    }
}
//Ingresar la opcion de los productos a borrar
function vaciarCarrito(miCarrito) {
    let compra = true;
    while (compra) {
        let opcion = prompt("Opciones 1-3 y 4 para salir \n" + showCarrito(miCarrito));
        switch (opcion) {
            case "1":
                if (miCarrito[0] != undefined) {
                    sacar(miCarrito[0], miCarrito, valiCanti());
                }
                break;
            case "2":
                if (miCarrito[1] != undefined) {
                    sacar(miCarrito[1], miCarrito, valiCanti());
                }
                break;
            case "3":
                if (miCarrito[2] != undefined) {
                    sacar(miCarrito[2], miCarrito, valiCanti());
                }
                break;
            case "4":
                compra = false;
                break;
            default:
                alert("La opcion ingresada fue invalida intentelo de nuevo.");
        }
    }
}
//Menu principal con opciones
function home() {
    const miCarrito = [];
    const listaProductos = [];
    getProductos(listaProductos);
    alert("Bienvenido a PizzaParty\nLugar de la mejor pizza de Argentina!");
    let comprando = true;
    while (comprando == true) {
        let op = prompt("Opciones\n1-Llenar el carrito\n2-Borrar productos del carrito\n3-Terminar compra");
        switch (op) {
            case "1":
                llenarCarrito(listaProductos, miCarrito);
                break;
            case "2":
                vaciarCarrito(miCarrito)
                break;
            case "3":
                alert(showCarrito(miCarrito));
                comprando = false;
                break;
            default:
                alert("La opcion ingresada fue invalida intentelo de nuevo.");
        }
    }
}
home(); */
