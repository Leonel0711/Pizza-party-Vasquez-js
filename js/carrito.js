//Clase constructora de productos
class Productos {
    constructor(nombre, precio, categoria) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.categoria = categoria.toUpperCase();
        this.cantidad = 0;
        this.stock = true;
    }
    sinStock() {
        this.stock = false;
    }
}
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
//Calcula el precio final
function getPrecioFinal(miCarrito) {
    let precioFinal = 0;
    for (let i = 0; i < miCarrito.length; i++) {
        precioFinal = precioFinal + (miCarrito[i].cantidad * miCarrito[i].precio)
    }
    return precioFinal;
}
//Muestra la cuenta en un alert
function showCarrito(miCarrito) {
    let string = "Su pedido es:\n";
    for (let i = 0; i < miCarrito.length; i++) {
        string = string + miCarrito[i].cantidad + " " + miCarrito[i].nombre + ".......$" + (miCarrito[i].precio * miCarrito[i].cantidad) + "\n";
    }
    string = string + "El valor final es : $" + getPrecioFinal(miCarrito);
    return string;
}
//Agrega una cantidad al producto y si es 0 llama a la funcion para ponerlo en el carrito
function agregar(producto, miCarrito) {
    if (producto.cantidad == 0) {
        producto.cantidad++;
        carrito(miCarrito, producto);
    } else {
        producto.cantidad++;
    }
}
//Restar la cantidad de productos y si es igual a 0 sacar al producto
function sacar(producto, miCarrito) {
    if (producto.cantidad == 1) {
        producto.cantidad--;
        miCarrito.splice(miCarrito.indexOf(producto), 1);
    } else if (producto.cantidad > 1) {
        producto.cantidad--;
    } else { }
}
//Ingresar los distintos productos
function llenarCarrito(listaProductos, miCarrito) {
    let compra = true;
    while (compra) {
        let opcion = prompt("Opciones 1-3 y 4 para terminar pedido\nEl menu es:\n" + listaProductos[0].nombre + ":" + listaProductos[0].precio + "\n" + listaProductos[1].nombre + ":" + listaProductos[1].precio + "\n" + listaProductos[2].nombre + ":" + listaProductos[2].precio + "\n");
        switch (opcion) {
            case "1":
                agregar(listaProductos[0], miCarrito)
                break;
            case "2":
                agregar(listaProductos[1], miCarrito)
                break;
            case "3":
                agregar(listaProductos[2], miCarrito)
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
        let opcion = prompt("Opciones 1-3 y 4 para salir \n"+showCarrito(miCarrito));
        switch (opcion) {
            case "1":
                if (miCarrito[0] != undefined) {
                    sacar(miCarrito[0], miCarrito);
                }

                break;
            case "2":
                if (miCarrito[1] != undefined) {
                    sacar(miCarrito[1], miCarrito);
                }
                break;
            case "3":
                if (miCarrito[2] != undefined) {
                    sacar(miCarrito[2], miCarrito);
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
home();