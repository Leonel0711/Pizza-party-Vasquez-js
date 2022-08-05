//Clase constructora de productos
class Productos {
    constructor(nombre, precio, categoria, descripcion, linkImg) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseInt(precio);
        this.descripcion = descripcion.toUpperCase();
        this.categoria = categoria.toLowerCase();
        this.linkImg = linkImg;
        this.cantidad = 0;
        this.stock = true;
    }
    sinStock() {
        this.stock = false;
    }
}
//Array combos
const combos = [
    new Productos("Combo 1 pizza", 1600, "combo", "Una Clásica pizza de muzzarella + una grandefugazzeta + 2 fainas de regalo", "../img/promoDeli/Promo1.png"),
    new Productos("Combo 2 pizza", 1600, "combo", "Una Clásica pizza de muzzarella + una grande de jamon + 2 fainas de regalo", "../img/promoDeli/Promo2.png"),
    new Productos("Combo 3 pizza", 1600, "combo", "Una Clásica pizza de muzzarella + una grande napolitana + 2 fainas de regalo", "../img/promoDeli/Promo3.png"),
];
//array Pizza
const pizza = [
    new Productos("Pizza Muzzarella", 900, "pizza", "Una Clásica pizza muzzarella con aceituna y orégano", "../img/Pizzas/pizza_muzzarela.jpg"),
    new Productos("Pizza de Jamon y Queso", 960, "pizza", "Pizza de jamon y muzzarella con aceituna y orégano", "../img/Pizzas/pizza_jamon.jpg"),
    new Productos("Pizza Napolitana", 1050, "pizza", "Pizza muzzarella con perejil , ajo , rodaja de tomate , aceituna y orégano", "../img/Pizzas/pizza_napo.jpg"),
    new Productos("Pizza Fugazzeta", 1000, "pizza", "Pizza muzzarella con cebolla ,aceituna y orégano", "../img/Pizzas/pizza_fugazzeta.jpg"),
];
//Array Empanadas
const empanada = [
    new Productos("Empanada de Carne", 180, "empanada", "Clásica empanada de carne molida, huevo, arvejas, morrón", "../img/Empanadas/empanadas_carne.jpg"),
    new Productos("Empanada de Jamon y Queso", 180, "empanada", "Clásica empanada de jamón y muzzarella derretida al horno", "../img/Empanadas/empanadas_jyq.jpg"),
    new Productos("Empanada de Choclo", 190, "empanada", "Empanadas de choclo molido con morrón y especias al horno", "../img/Empanadas/empanadas_humita.png")
]
//Crear las section 
function crearhtml() {
    crearSection("Combos", "promos", combos);
    crearSection("Pizzas", "pizza", pizza);
    crearSection("Empanadas", "empanada", empanada);
    recibirLlamadoModal();
}
//Escucha si hacen click sobre las cards para modificar el modal
function recibirLlamadoModal(){
    let cardsProductos = document.querySelectorAll(".producto");
    cardsProductos.forEach(item => {
        item.addEventListener('click', () => {
            let clasesCardProducto = item.className.split(" ");
            switch (clasesCardProducto[1]) {
                case "combo":
                    editModal(combos[parseInt(clasesCardProducto[2])]);
                    break;
                case "pizza":
                    editModal(pizza[parseInt(clasesCardProducto[2])]);
                    break;
                case "empanada":
                    editModal(empanada[parseInt(clasesCardProducto[2])]);
                    break;
                default:
            }
        })
    })
}
//Modifica al modal con los atributos del producto
function editModal(producto) {
    let editModal = document.getElementsByClassName("editModal");
    let canti = document.getElementById("cont_Numb");
    editModal[0].innerText=producto.nombre;
    editModal[1].src = producto.linkImg;
    editModal[1].alt=producto.nombre;
    editModal[2].innerText=producto.descripcion;
    editModal[3].innerText=producto.precio+"$";
    canti.innerText=1;
    let rbutton = document.getElementById("r_button");
    let lbutton = document.getElementById("l_button");
    let adv = document.getElementById("advertencia");
    rbutton.onclick = () => {
        canti.innerHTML = `${parseInt(canti.textContent) + 1}`;
        adv.innerHTML= ``
    }
    lbutton.onclick = () => {
        if (parseInt(canti.textContent) > 1) {
            canti.innerHTML = `${parseInt(canti.textContent) - 1}`
        }else{
            adv.innerHTML= `No se puede ingresar menos productos`
        }

    }
}
//Crea una section
function crearSection(subTitle, id, listaProductos) {
    let main = document.getElementById("main");
    let section = document.createElement('section');
    section.className = "container-xl set_deli";
    let h2 = document.createElement('h2');
    h2.className = "text-center my-3"
    h2.innerText = subTitle;
    let divRow = document.createElement('div');
    divRow.className = "row row_gap";
    main.append(section);
    section.id = id;
    section.append(h2);
    section.append(divRow);
    divRow.innerHTML = crearProductos(listaProductos);
}
//crea las cards de los productos
function crearProductos(listaProductos) {
    let string = "";
    for (let i = 0; i < listaProductos.length; i++) {
        string += `<div class="col-md-6 col-xxl-4">
        <div class="producto ${listaProductos[i].categoria} ${i}" data-bs-toggle="modal" data-bs-target="#modal" value="rosa">
            <div>
                <img src="${listaProductos[i].linkImg}" alt="${listaProductos[i].nombre}">
            </div>
            <div>
                <h3>${listaProductos[i].nombre}</h3>
                <p class="descrip">${listaProductos[i].descripcion}</p>
                <p>${listaProductos[i].precio}$</p>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24">
                    <path fill="#FFFFFF"
                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z">
                    </path>
                </svg>
            </div>
        </div>
    </div>`;
    }
    return string;
}
crearhtml();

/* let etiquetas = "";
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
} */

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
