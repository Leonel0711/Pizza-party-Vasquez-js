//Clase constructora de productos
class Productos {
    constructor(id, nombre, shorName, precio, categoria, descripcion, linkImg) {
        this.id = parseInt(id);
        this.shorName = shorName.toUpperCase;
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
    new Productos(100, "Combo 1 pizza", "combo 1", 1600, "combo", "Una Clásica pizza de muzzarella + una grandefugazzeta + 2 fainas de regalo", "../img/promoDeli/Promo1.png"),
    new Productos(101, "Combo 2 pizza", "combo 2", 1600, "combo", "Una Clásica pizza de muzzarella + una grande de jamon + 2 fainas de regalo", "../img/promoDeli/Promo2.png"),
    new Productos(102, "Combo 3 pizza", "combo 3", 1600, "combo", "Una Clásica pizza de muzzarella + una grande napolitana + 2 fainas de regalo", "../img/promoDeli/Promo3.png")
];
//array Pizza
const pizza = [
    new Productos(200, "Pizza Muzzarella", "pizza muzza", 900, "pizza", "Una Clásica pizza muzzarella con aceituna y orégano", "../img/Pizzas/pizza_muzzarela.jpg"),
    new Productos(201, "Pizza de Jamon y Queso", "pizza JyQ", 960, "pizza", "Pizza de jamon y muzzarella con aceituna y orégano", "../img/Pizzas/pizza_jamon.jpg"),
    new Productos(202, "Pizza Napolitana", "pizza napo", 1050, "pizza", "Pizza muzzarella con perejil , ajo , rodaja de tomate , aceituna y orégano", "../img/Pizzas/pizza_napo.jpg"),
    new Productos(203, "Pizza Fugazzeta", "pizza fuga", 1000, "pizza", "Pizza muzzarella con cebolla ,aceituna y orégano", "../img/Pizzas/pizza_fugazzeta.jpg"),
];

//Array Empanadas
const empanada = [
    new Productos(300, "Empanada de Carne", "emp Carne", 180, "empanada", "Clásica empanada de carne molida, huevo, arvejas, morrón", "../img/Empanadas/empanadas_carne.jpg"),
    new Productos(301, "Empanada de Jamon y Queso", "emp JyQ", 180, "empanada", "Clásica empanada de jamón y muzzarella derretida al horno", "../img/Empanadas/empanadas_jyq.jpg"),
    new Productos(302, "Empanada de Choclo", "emp Choclo", 190, "empanada", "Empanadas de choclo molido con morrón y especias al horno", "../img/Empanadas/empanadas_humita.png")
];
//inventario
const inventario = [combos, pizza, empanada];
//carrito
const carrito = [];
//Crear las section 
function crearhtml() {
    crearSection("Combos", "promos", combos);
    crearSection("Pizzas", "pizza", pizza);
    crearSection("Empanadas", "empanada", empanada);
}


window.onload = crearhtml();
//Crea una section
function crearSection(subTitle, id, listaProductos) {
    let main = document.getElementById("main");
    let section = document.createElement('section');
    let h2 = document.createElement('h2');
    let divRow = document.createElement('div');
    section.className = "container-xl set_deli";
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
        string += `<div class="col-md-6 col-xxl-4">
        <div class="producto ${listaProductos[i].categoria}" data-bs-toggle="modal" data-bs-target="#modal" value="rosa" id="${listaProductos[i].id}">
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

//Escucha si hacen click sobre las cards de un elemento para modificar el modal
const cardsProductos = document.querySelectorAll(".producto");
cardsProductos.forEach(item => {
    item.addEventListener('click', () => {
        let productoFind;
        let idCardProducto = parseInt(item.id);
        for (let i = 0; i < inventario.length; i++) {
            productoFind = inventario[i].find((element) => element.id === idCardProducto)
            if (productoFind != undefined) {
                break;
            }
        }
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
    let editModal = document.getElementsByClassName("editModal");
    editModal[0].innerText = producto.nombre;
    editModal[1].src = producto.linkImg;
    editModal[1].alt = producto.nombre;
    editModal[2].innerText = producto.descripcion;
    editModal[3].innerText = producto.precio + "$";
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
        if (parseInt(canti.textContent) > 1) {
            canti.innerHTML = `${parseInt(canti.textContent) - 1}`
        } else {
            adv.innerHTML = `No se puede ingresar menos productos`
        }
    }
}


//Añade el producto al carrito y llama a la funcion showCarrito
function btnAddCarrito(producto, canti) {
    añadirCarrito(producto, parseInt(canti.textContent));
    if (carrito == 0) {
        const msg = document.querySelector(".msgSinP");
        msg.classList.replace("d-block", "d-none");
    }
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
            carrito[index].cantidad++;
            let valorCanti = carrito[index].cantidad;
            labelCant[index].innerHTML = `${valorCanti}`
            if (valorCanti >= 1) {
                btnDel[index].classList.replace("d-block", "d-none");
                lBtnBuy[index].classList.replace("d-none", "d-block");
            }
            precioLabel[index].innerText=`$${carrito[index].precio * carrito[index].cantidad}`
            getPrecioFinal();
        })
    })

    //Btn de restar cantidad a un producto
    lBtnBuy.forEach(item => {
        item.addEventListener('click', () => {
            let arrayClasname = item.className.split(" ");;
            let index = parseInt(arrayClasname[2]);
            let valorCanti = carrito[index].cantidad;
            if (carrito[index].cantidad >= 1) {
                if (valorCanti > 2) {
                    labelCant[index].innerHTML = `${valorCanti - 1}`
                } else {
                    labelCant[index].innerHTML = `${valorCanti - 1}`
                    btnDel[index].classList.replace("d-none", "d-block");
                    item.classList.replace("d-block", "d-none");
                }
                carrito[index].cantidad--;
            }
            precioLabel[index].innerText=`$${carrito[index].precio * carrito[index].cantidad}`
            getPrecioFinal();
        })
    })

    //Boton de borrar para cada elemento.
    btnDel.forEach(item => {
        item.addEventListener('click', () => {
            let arrayClasname = item.className.split(" ");
            let index = parseInt(arrayClasname[2]);
            carrito.splice(index, 1);
            showCarrito()
            if (carrito.length == 0) {
                let canasta = document.getElementById("carrito");
                canasta.innerHTML = `<div class="d-block msgSinP" >
                <h3>No hay productos</h3>
            </div>
            `
            }
        })
    })
}


//muestra los productos y actualiza cuando se borra uno
function showCarrito() {
    let canasta = document.getElementById("carrito");
    let prodCarrito = "";
    for (let i = 0; i < carrito.length; i++) {
        let classBtndl = "d-none";
        let classLbtn = "d-block";
        //Verifica si la cantidad es uno para mostrar el btn de borrar
        if (carrito[i].cantidad == 1) {
            classBtndl = "d-block";
            classLbtn = "d-none";
        }
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
    btnsCarrito()
}




//devuelve el precioFinal del carrito
function getPrecioFinal() {
    const precioFinal = carrito.reduce((acumulador, producto) => acumulador += (producto.precio * producto.cantidad), 0);
    document.getElementById("precioFinal").innerHTML = "$" + precioFinal;
}


