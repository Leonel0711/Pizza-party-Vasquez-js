
function inicio() {
    let compra = true;
    while (compra) {
        let opcion = prompt("Ingrese la opcion a realizar \n1-Ver Productos \n2-Realizar compras \n3-Salir sin comprar");
        switch (opcion) {
            case "1":
                mostrarProductos();
                break;
            case "2":
                realizarCompra();
                compra = false;
                break;
            case "3":
                compra = false;
                break;
            default:
                alert("La opcion ingresada fue invalida intentelo de nuevo.");
        }
    }
}
const suma = (n1, n2) => n1 + n2;
const mostrarProductos = function () { alert("Productos:\n 1-Pizza Napolitana: 1600$ \n2-Pizza de Jamon y Muzza:1800$ \n3-Empanadas:160$"); }
const finalizarCompra = function (vFinal, listaP) { alert("Su cuenta es:" + listaP + "\nSu total es de: " + vFinal+"$") }
const agregarProducto = (lista, productoAgregado) => lista + "\n" + productoAgregado;
function realizarCompra() {
    let valorFinal = 0;
    let listaProductos = "";
    const precioPizzaN = 1600;
    const precioPizzaJyM = 1800;
    const precioEmpanada = 160;
    let compra = true;
    while (compra) {
        let opcion = prompt("Que opcion desea agregar. Ingrese 4 para ver los productos y la opcion 5 para terminar");
        switch (opcion) {
            case "1":
                valorFinal = suma(valorFinal, precioPizzaN);
                listaProductos = agregarProducto(listaProductos, "-Pizza Napolitana: 1600$");
                console.log(valorFinal);
                alert(listaProductos)
                break;
            case "2":
                valorFinal = suma(valorFinal, precioPizzaJyM);
                listaProductos = agregarProducto(listaProductos, "-Pizza de Jamon y Muzza: 1800$");
                console.log(valorFinal);
                alert(listaProductos)
                break;
            case "3":
                valorFinal = suma(valorFinal, precioEmpanada);
                listaProductos = agregarProducto(listaProductos, "-Empanadas:160$");
                console.log(valorFinal);
                alert(listaProductos)
                break;
            case "4":
                mostrarProductos();
                break;
            case "5":
                finalizarCompra(valorFinal, listaProductos);
                compra = false;
                break;
            default:
                alert("La opcion ingresada fue invalida intentelo de nuevo.");
        }
    }

}

inicio()