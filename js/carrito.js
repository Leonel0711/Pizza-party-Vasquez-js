//Clase constructora de productos
class Productos {
    constructor(id, nombre, precio, categoria, descripcion, linkImg) {
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseInt(precio);
        this.descripcion = descripcion.toUpperCase();
        this.categoria = categoria.toLowerCase();
        this.linkImg = linkImg;
        this.cantidad = 0;
        this.stock = true;
    }
}
//Array combos
const combos = [
    new Productos(100, "Combo 1 pizza", 1600, "combo", "Una Clásica pizza de muzzarella + una grandefugazzeta + 2 fainas de regalo", "../img/promoDeli/Promo1.png"),
    new Productos(101, "Combo 2 pizza", 1600, "combo", "Una Clásica pizza de muzzarella + una grande de jamon + 2 fainas de regalo", "../img/promoDeli/Promo2.png"),
    new Productos(102, "Combo 3 pizza", 1600, "combo", "Una Clásica pizza de muzzarella + una grande napolitana + 2 fainas de regalo", "../img/promoDeli/Promo3.png")
];
//array Pizza
const pizza = [
    new Productos(200, "Pizza Muzzarella", 900, "pizza", "Una Clásica pizza muzzarella con aceituna y orégano", "../img/Pizzas/pizza_muzzarela.jpg"),
    new Productos(201, "Pizza de Jamon y Queso", 960, "pizza", "Pizza de jamon y muzzarella con aceituna y orégano", "../img/Pizzas/pizza_jamon.jpg"),
    new Productos(202, "Pizza Napolitana", 1050, "pizza", "Pizza muzzarella con perejil , ajo , rodaja de tomate , aceituna y orégano", "../img/Pizzas/pizza_napo.jpg"),
    new Productos(203, "Pizza Fugazzeta", 1000, "pizza", "Pizza muzzarella con cebolla ,aceituna y orégano", "../img/Pizzas/pizza_fugazzeta.jpg"),
    new Productos(204,"Pizza de peperoni",1150,"pizza","Clásica pizza muzzarella con rodajas de peperoni","../img/Pizzas/pizza_peperoni.png"),
    new Productos(205,"Pizza de especial de la casa",1300,"pizza","Pizza muzza con morrón,jamón, huevo, queso rallado, aceituna y orégano","../img/Pizzas/pizza_especialidad_casa.jpg")
];
//Array Empanadas
const empanada = [
    new Productos(300, "Empanada de Carne", 180, "empanada", "Clásica empanada de carne molida, huevo, arvejas, morrón", "../img/Empanadas/empanadas_carne.jpg"),
    new Productos(301, "Empanada de Jamon y Queso", 180, "empanada", "Clásica empanada de jamón y muzzarella derretida al horno", "../img/Empanadas/empanadas_jyq.jpg"),
    new Productos(302, "Empanada de Choclo", 190, "empanada", "Empanadas de choclo molido con morrón y especias al horno", "../img/Empanadas/empanadas_humita.png"),
    new Productos(303,"Empanadas salteñas",190,"empanada","Clásicas empanadas de carne cortada a cuchillo al estilo de Salta","../img/Empanadas/empanadas_saltenias.jpg")
];
//Array Minutas
const minuta = [
    new Productos(400,"milanesa napolitana con fritas",1200,"minuta","milanesa con jamón y muzza con guarnición de papas fritas","../img/Minutas/milanesa_fritas.jpg"),
    new Productos(401,"milanesa napolitana con pure",1150,"minuta","milanesa al horno con guarnición de pure","../img/Minutas/milanes_pure.jpg"),
    new Productos(402,"Sándwich de milanesa completo",1250,"minuta","Sándwich de milanesa con tomate, lechuga, jamón y queso, con guarnición de fritas","../img/Minutas/sandwich_milanesaC.jpg"),
    new Productos(403,"hamburguesa completa",1250,"minuta","hamburguesa con tomate, lechuga, cebolla, morada, jamón y queso chédar,con guarnición de fritas","../img/Minutas/hamburguesa_fritas.jpg")
];
//Array Bebidas 
const bebida = [
    new Productos(500,"CocaCola 1.5L",300,"bebida"," ","../img/Bebidas/CocaCola.webp"),
    new Productos(501,"Pepsi 1.5L",280,"bebida"," ","../img/Bebidas/Pepsi.jpg"),
    new Productos(502,"Cerveza Salta Rubia 1L",350,"bebida"," ","../img/Bebidas/SaltaRubia.png" ),
    new Productos(503,"Cerveza brahama 1L",350,"bebida","","../img/Bebidas/Brahama.webp")

];
//inventario
const inventario = [...combos, ...pizza, ...empanada,...minuta,...bebida];
//carrito
let carrito = [];
//Crear las section 
function crearhtml() {
    crearSection("Combos", "promos", combos);
    crearSection("Pizzas", "pizza", pizza);
    crearSection("Empanadas", "empanada", empanada);
    crearSection("Minutas", "minuta", minuta);
    crearSection("Bebidas", "bebida", bebida);
}

window.onload = crearhtml();
//Crea una section
function crearSection(subTitle, id, listaProductos) {
    let main = document.getElementById("main");
    let section = document.createElement('section');
    let h2 = document.createElement('h2');
    let divRow = document.createElement('div');
    section.className = "container-xxl set_deli";
    h2.className = "text-center my-3";
    h2.innerText = subTitle;
    divRow.className = "row row_gap";
    section.id = id;
    main.append(section);
    section.append(h2);
    section.append(divRow);
    divRow.innerHTML = crearProductos(listaProductos);
}

//crea las cards de los productos
function crearProductos(listaProductos) {
    let string = "";
    for (let i = 0; i < listaProductos.length; i++) {
        let { id, nombre, precio, descripcion: descrip, categoria, linkImg: img } = listaProductos[i];
        string += `<div class="col-md-6 col-xxl-4">
        <div class="producto ${categoria}" data-bs-toggle="modal" data-bs-target="#modal" value="rosa" id="${id}">
            <div>
                <img src="${img}" alt="${nombre}">
            </div>
            <div>
                <h3>${nombre}</h3>
                <p class="descrip">${descrip}</p>
                <p class="precioCard">${precio}$</p>
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

//Escucha si hacen click sobre las cards de un elemento para modificar el modal
const cardsProductos = document.querySelectorAll(".producto");
cardsProductos.forEach(item => {
    item.addEventListener('click', () => {
        let idCardProducto = parseInt(item.id);
        let productoFind = inventario.find((element) => element.id === idCardProducto)
        editModal(productoFind);
    })
})

//Modifica al modal con los atributos del producto
function editModal(producto) {
    let canti = document.getElementById("cont_Numb");
    modiModal(producto, canti);
    btnsModCant(canti);
    let addCarr = document.getElementById("addCarrito");
    addCarr.onclick = () => {
        btnAddCarrito(producto, canti);
    }
}

//Modifica el modal en base al objeto producto
function modiModal(producto, canti) {
    let [titulo, img, descrip, precio] = document.getElementsByClassName("editModal");
    titulo.innerText = producto.nombre;
    img.src = producto.linkImg;
    img.alt = producto.nombre;
    descrip.innerText = producto.descripcion;
    precio.innerText = producto.precio + "$";
    canti.innerText = 1;
}

//evento botones de cantidad del modal y crea una advertencia
function btnsModCant(canti) {
    let rbutton = document.getElementById("r_button");
    let lbutton = document.getElementById("l_button");
    let adv = document.getElementById("advertencia");
    adv.innerHTML = ``
    //Evento del boton de sumar cantidad en el modal
    rbutton.onclick = () => {
        canti.innerHTML = `${parseInt(canti.textContent) + 1}`;
        adv.innerHTML = ``
    }
    //Evento del boton de restar cantidad en el modal
    lbutton.onclick = () => {
        parseInt(canti.textContent) > 1 ? canti.innerHTML = `${parseInt(canti.textContent) - 1}` : adv.innerHTML = `No se puede ingresar menos productos`;
    }
}
function changeCantCarrito(){
    let num = document.getElementById("cantProdCarrito");
    num.innerHTML= `${carrito.length}`
}

//Añade el producto al carrito y llama a la funcion showCarrito
function btnAddCarrito(producto, canti) {
    añadirCarrito(producto, parseInt(canti.textContent));
    if (carrito == 0) {
        const msg = document.querySelector(".msgSinP");
        msg.classList.replace("d-block", "d-none");
    }
    saveSessionStorage()
    showCarrito();
}

//añade al array carrito y verifica si existe o no en el array
function añadirCarrito(producto, canti) {
    let prodToAdd = carrito.find((element) => element.id == producto.id)
    if (prodToAdd == undefined) {
        carrito.push(producto);
        carrito[carrito.length - 1].cantidad = canti;
    } else {
        prodToAdd.cantidad += canti;
    }
}
//Guarda el array carrito en sessionStorage
function saveSessionStorage() {
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
}
//Recupera el array carrito de sessionStorage
function getSessionStorage() {
    let carritoStorage = JSON.parse(sessionStorage.getItem("carrito"));
    carritoStorage == null ? false : carrito.push(...carritoStorage);
}
//Les da un evento a cada boton de los elementos
function btnsCarrito() {
    const rBtnBuy = document.querySelectorAll(".rBtnBuy");
    const lBtnBuy = document.querySelectorAll(".lBtnBuy");
    let labelCant = document.getElementsByClassName("cant-prodBuy");
    const btnDel = document.querySelectorAll(".dBtnBuy");
    const precioLabel = document.querySelectorAll(".precioLabel");
    //Btn de Sumar cantidad a un producto
    rBtnBuy.forEach(item => {
        item.addEventListener('click', () => {
            let arrayClasname = item.className.split(" ");;
            let index = parseInt(arrayClasname[2]);
            let { cantidad, precio } = carrito[index];
            cantidad >= 1 && btnDel[index].classList.replace("d-block", "d-none");
            cantidad >= 1 && lBtnBuy[index].classList.replace("d-none", "d-block");
            carrito[index].cantidad++;
            labelCant[index].innerHTML = `${carrito[index].cantidad}`
            precioLabel[index].innerText = `$${precio * carrito[index].cantidad}`
            getPrecioFinal();
            saveSessionStorage();
        })
    })
    //Btn de restar cantidad a un producto
    lBtnBuy.forEach(item => {
        item.addEventListener('click', () => {
            let arrayClasname = item.className.split(" ");;
            let index = parseInt(arrayClasname[2]);
            let { cantidad, precio } = carrito[index];
            if (cantidad >= 1) {
                cantidad <= 2 && btnDel[index].classList.replace("d-none", "d-block");
                cantidad <= 2 && item.classList.replace("d-block", "d-none");
                carrito[index].cantidad--;
                labelCant[index].innerHTML = `${carrito[index].cantidad}`;
                precioLabel[index].innerText = `$${precio * carrito[index].cantidad}`;
            }
            getPrecioFinal();
            saveSessionStorage();
        })
    })

    //Boton de borrar para cada elemento.
    btnDel.forEach(item => {
        item.addEventListener('click', () => {
            let arrayClasname = item.className.split(" ");
            let index = parseInt(arrayClasname[2]);
            carrito.splice(index, 1);
            showCarrito()
            let canasta = document.getElementById("carrito");
            if (carrito.length == 0) {
                canasta.innerHTML = `<div class="d-block msgSinP"><h3>No hay productos</h3></div>`
            }
            saveSessionStorage();
        })
    })
}
//Evento para cargar el sessionStorage
window.onload = () => {
    getSessionStorage();
    if (carrito.length != 0) {
        showCarrito();
    }
}

//muestra los productos y actualiza cuando se borra uno
function showCarrito() {
    changeCantCarrito();
    let canasta = document.getElementById("carrito");
    let prodCarrito = "";
    for (let i = 0; i < carrito.length; i++) {
        //Verifica si la cantidad es uno para mostrar el btn de borrar
        let classBtndl = carrito[i].cantidad == 1 ? "d-block" : "d-none";
        let classLbtn = carrito[i].cantidad == 1 ? "d-none" : "d-block";
        //Genera el string con cada elemento
        prodCarrito += `<div class="prodCarrito" >
                            <div>
                                <img src="${carrito[i].linkImg}" alt="${carrito[i].nombre}" class="imgProdCar">
                            </div>
                            <div>
                                <h3>${carrito[i].nombre}</h3>
                                <p class="descripCar">${carrito[i].descripcion}</p>
                                <p class="precioLabel">$${(carrito[i].precio * carrito[i].cantidad)}</p>
                            </div>
                            <div class="w-100">
                                <div class="modalButton dBtnBuy ${i} ${classBtndl} "  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24" data-testid="delete">
                                        <path fill="#6A696E"
                                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="modalButton lBtnBuy ${i} ${classLbtn}" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24" data-testid="remove">
                                        <path fill="#6A696E"
                                            d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="number">
                                    <span class="cant-prodBuy" color="graya100" data-testid="typography" value="1">${carrito[i].cantidad}</span>
                                </div>
                                <div class="modalButton rBtnBuy ${i}" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24" data-testid="add">
                                        <path fill="#6a696e"
                                            d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>`
    }
    canasta.innerHTML = prodCarrito;
    getPrecioFinal();
    btnsCarrito();
}




//devuelve el precioFinal del carrito
function getPrecioFinal() {
    const precioFinal = carrito.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);
    document.getElementById("precioFinal").innerHTML = "$" + precioFinal;
}

//boton para finalizar el pedido
const btnFinal = document.getElementById("btnFinalizar");
btnFinal.onclick = () => {
    carrito.length != 0 && alert("Su pedido ha sido enviado");
    showCarrito();
    resetCarrito();
    saveSessionStorage();
}
//boton para borrar el pedido
const borra = document.getElementById("borrar");
borra.onclick = () => {
    carrito.length != 0 && alert("Su pedido ha sido borrado");
    resetCarrito();
    saveSessionStorage();
}
//funcion para limpiar el carrito
function resetCarrito() {
    carrito.splice(0);
    showCarrito();
    let canasta = document.getElementById("carrito");
    canasta.innerHTML = carrito.length == 0 && `<div class="d-block msgSinP"><h3>No hay productos</h3></div>`
}