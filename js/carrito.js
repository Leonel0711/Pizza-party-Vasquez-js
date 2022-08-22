//Clase constructora de objetos consumidores
class Consumidor {
    constructor(id, nombre, apellido, correo, contraseña, telefono, direccion) {
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.correo = correo.toLowerCase();
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.direccion = direccion.toLowerCase();
    }
    //metodo para cambiar direccion
    asigNewDir(direccion) {
        this.direccion = direccion.toLowerCase();
    }
    //metodo para cambiar telefono
    asigNewTel(telefono) {
        this.telefono = telefono;
    }
}
//array contenedor de usuarios
const dataUsuarios = [
    new Consumidor(1, "Señor", "X", "señorx@gmail.com", "rosquilla", "764-84377", "Avenida Siempreviva 742")
]
let usuarioNow;
const inventario = [];
let carrito = [];
//modal de login
const modalUsu = document.getElementById("modalLogin");
const modal = new bootstrap.Modal(modalUsu);
//cargalos eventos de login y registrarse y verifica si hay un usuario guardado en el localStorage
window.onload = () => {
    eventoLogin();
    eventoRegistrarse()
    usuarioNow = getUsuario();
    if (usuarioNow) {
        mostarInventario();
    }
}
//Contiene el evento login para modificar el modal para logearse.
function eventoLogin() {
    const btnLogin = document.getElementById("btnLogin");
    btnLogin.onclick = () => {
        modalUsu.innerHTML = `
    <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalLoginLabel">Ingresá</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body py-2 px-4">
                        <input id="emailLogin" class="form-control my-4" type="email"
                            placeholder="Ingresa tu correo electrónico" required>
                        <input id="passwordLogin" class="form-control my-4" type="password"
                            placeholder="Ingresa tu contraseña" required>
                        <div class="modalInputMap form-control">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2b1a46"
                                viewBox="0 0 16 16">
                                <path
                                    d="M7.622.5c2.45.104 4.29 1.179 5.428 3.25.518.944.723 1.989.627 3.105-.09 1.045-.465 2.004-1.109 2.905l-.182.245L8.3 15.3c-.373.484-.926.512-1.324.092l-.082-.096-4.22-5.477a5.501 5.501 0 0 1-1.138-2.8c-.187-1.773.356-3.34 1.599-4.636C4.113 1.363 5.34.756 6.788.555L6.985.53l.251-.015L7.622.5zm-.036 1-.452.023-.129.012-.359.056c-1.105.205-2.033.696-2.79 1.484-1.04 1.085-1.481 2.36-1.326 3.839.078.74.336 1.429.768 2.061l.17.235 4.13 5.361 3.998-5.18c.642-.826 1.004-1.684 1.085-2.622.08-.924-.087-1.771-.507-2.537-.922-1.68-2.353-2.564-4.322-2.716l-.266-.017zM7.57 3.7l.17.004c1.402.087 2.504 1.223 2.504 2.621a2.636 2.636 0 0 1-2.667 2.681c-1.478 0-2.668-1.181-2.67-2.634a2.681 2.681 0 0 1 2.495-2.668L7.57 3.7zm-.002 1-.142.005a1.68 1.68 0 0 0-1.518 1.667c0 .898.742 1.634 1.67 1.634a1.64 1.64 0 0 0 1.666-1.672c0-.859-.665-1.557-1.53-1.629L7.568 4.7z">
                                </path>
                            </svg>
                            <input id="direc" class="form-control " type="text" placeholder="Ingrese su direccion"
                                required>
                        </div>
                    </div>
                    <p id="alert" ></p>
                    <div class="modal-footer d-block">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="recordarme">
                            <label class="form-check-label" for="recordarme">
                                Recordarme en este equipo
                            </label>
                        </div>
                        <button class="btn " id="btnIngDate" type="submit">Ingresar</button>
                    </div>
                </div>
            </div>
    `
        eventoLoginView()
    }
}

//Evento de Ingresar datos, revisa que los campos esten completos y realiza la busqueda de un usuario con esos datos.
function eventoLoginView() {
    const btnLoginView = document.getElementById("btnIngDate");
    btnLoginView.onclick = () => {
        let mail = document.getElementById("emailLogin").value;
        let password = document.getElementById("passwordLogin").value;
        let direccion = document.getElementById("direc").value;
        let recordar = document.getElementById("recordarme");
        if (validarDatos(mail) && validarDatos(password) && validarDatos(direccion)) {
            console.log("datos completos");
            let usuFind = dataUsuarios.find((usuario) => usuario.correo === mail);
            let msgError = "La contraseña o el mail son incorrectos";
            if (usuFind != undefined) {
                if (usuFind.contraseña === password) {
                    usuarioNow = usuFind;
                    usuarioNow.asigNewDir(direccion)
                    if (recordar.checked) {
                        console.log("datos guardados");
                        setUsuario(usuarioNow);
                    }
                    modal.hide();
                    loginChange(usuFind);
                    mostarInventario();
                } else {
                    alerta(msgError);
                }
            } else {
                alerta(msgError);
            }
        } else {
            console.log("datos incompletos");
            alerta("Rellene todos los campos")
        }

    }

}
//Funcion para validar datos String
function validarDatos(dato) {
    if (dato.trim() != "" && dato.trim != undefined) {
        return true;
    }
    return false;
}
//Funcion alerta Muestra un mensaje para los modals
function alerta(msg) {
    const pAlert = document.getElementById("alert");
    pAlert.innerHTML = `${msg}`
    setTimeout(() => {
        pAlert.innerHTML = ``;
    }, 2500);
}
//guarda el usuario en localStorage si se activo el check
function setUsuario(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario))
}
//Revisa si hay un usuario guardado en el localStorage y lo retorna
function getUsuario() {
    let usuarioSave = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioSave != null) {
        loginChange(usuarioSave)
        return usuarioSave;
    }
}
//Remueve el item con el nombre usuario
function removeUsuario() {
    localStorage.removeItem("usuario");
}
//Muestra la parte de busqueda , el nombre del usuario y el boton de logout
function loginChange(usuario) {
    const changbtn = document.getElementById("usuCount");
    changbtn.innerHTML = `
                <div id="usuarioCont">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#6A696E"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z">
                        </path>
                    </svg><span class="spanUsu">${usuario.nombre} ${usuario.apellido} </span>
                </div>
                <div><button type="button" class="btn btn-light btnCheck" id="btnLogout">Log out</button></div>`
    eventLogout();
    const searchSec = document.getElementById("sectionSearch");
    searchSec.innerHTML = `<button id="searchBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    class="sc-GVOUr ewLtmx">
                                    <path fill="#6A696E"
                                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                    </path>
                                </svg>
                            </button>
                            <input type="text" id="buscar" placeholder="Busca en PIZZA PARTY...">`
    eventoSearch();
}
//Contiene el evento registrarse para modificar el modal para registrarse.
function eventoRegistrarse() {
    const btnSign = document.getElementById("btnSign");
    btnSign.onclick = () => {
        modalUsu.innerHTML = `
        <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h3 class="modal-title" id="modalLoginLabel">Registrar</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                        <div class="modal-body">
                        <div class="mb-3">
                                <label for="name" class="form-label">nombre</label>
                                <input type="text" class="form-control" id="name" placeholder="nombre">
                            </div>
                            <div class="mb-3">
                                <label for="surname" class="form-label">apellido</label>
                                <input type="text" class="form-control" id="surname" placeholder="apellido">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="name@example.com">
                            </div>
                            <div class="mb-3">
                                <label for="remail" class="form-label">confirmacion de email</label>
                                <input type="email" class="form-control" id="remail" placeholder="name@example.com">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="password" placeholder="Contraseña">
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Telefono</label>
                                <input type="number" class="form-control" id="telefono" placeholder="115555555">
                            </div>
                            <div class="mb-3">
                                <label for="direc" class="form-label">Direccion</label>
                            <div class="modalInputMap form-control" for="direc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2b1a46"  
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M7.622.5c2.45.104 4.29 1.179 5.428 3.25.518.944.723 1.989.627 3.105-.09 1.045-.465 2.004-1.109 2.905l-.182.245L8.3 15.3c-.373.484-.926.512-1.324.092l-.082-.096-4.22-5.477a5.501 5.501 0 0 1-1.138-2.8c-.187-1.773.356-3.34 1.599-4.636C4.113 1.363 5.34.756 6.788.555L6.985.53l.251-.015L7.622.5zm-.036 1-.452.023-.129.012-.359.056c-1.105.205-2.033.696-2.79 1.484-1.04 1.085-1.481 2.36-1.326 3.839.078.74.336 1.429.768 2.061l.17.235 4.13 5.361 3.998-5.18c.642-.826 1.004-1.684 1.085-2.622.08-.924-.087-1.771-.507-2.537-.922-1.68-2.353-2.564-4.322-2.716l-.266-.017zM7.57 3.7l.17.004c1.402.087 2.504 1.223 2.504 2.621a2.636 2.636 0 0 1-2.667 2.681c-1.478 0-2.668-1.181-2.67-2.634a2.681 2.681 0 0 1 2.495-2.668L7.57 3.7zm-.002 1-.142.005a1.68 1.68 0 0 0-1.518 1.667c0 .898.742 1.634 1.67 1.634a1.64 1.64 0 0 0 1.666-1.672c0-.859-.665-1.557-1.53-1.629L7.568 4.7z">
                                    </path>
                                </svg>
                                <input id="direc" class="form-control " type="text" placeholder="Ingrese su direccion"
                                    required>
                            </div>
                        </div>
                        <p id="alert" ></p>
                        <div class="modal-footer d-block">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="recordarme">
                                <label class="form-check-label" for="recordarme">
                                    Recordarme en este equipo
                                </label>
                            </div>
                            <button class="btn " id="btnIngDate" type="submit">Ingresar</button>
                        </div>
                    </div>
                </div>
        `
        eventoRegistrar()
    }
}
//Evento registrarse, verifica que todos los campos contengan algo y verifica si no hay otro usuario con el mismo mail.
function eventoRegistrar() {
    const btnRegistrar = document.getElementById("btnIngDate");
    btnRegistrar.onclick = () => {
        let nombre = document.getElementById("name").value;
        let apellido = document.getElementById("surname").value;
        let email = document.getElementById("email").value;
        let remail = document.getElementById("remail").value;
        let password = document.getElementById("password").value;
        let telefono = document.getElementById("telefono").value;
        let direccion = document.getElementById("direc").value;
        let recordar = document.getElementById("recordarme");
        if (validarDatos(nombre) && validarDatos(apellido) && validarDatos(email) && validarDatos(remail) && validarDatos(password) && validarDatos(telefono) && validarDatos(direccion)) {
            let usuDif = dataUsuarios.find((usuario) => usuario.correo === email);
            if (email === remail && usuDif == undefined) {
                let newId = dataUsuarios[dataUsuarios.length - 1].id + 1;
                const newUsuario = new Consumidor(newId, nombre, apellido, email, password, telefono, direccion);
                dataUsuarios.push(newUsuario);
                if (recordar.checked) {
                    console.log("datos guardados");
                    setUsuario(newUsuario);
                }
                usuarioNow = newUsuario;
                modal.hide();
                loginChange(newUsuario)
                eventLogout();
                mostarInventario();
            } else {
                alerta("Ese mail ya tiene una cuenta o esta mal escrita la reconfirmacion del mail");
            }

        } else {
            console.log("datos incompletos");
            alerta("Rellene todos los campos")
        }
    }
}
//Evento logout , borra todo y vuelve a mostrar los botones de registrar o logearse con sus eventos.
function eventLogout() {
    const btnLogOut = document.getElementById("btnLogout");
    btnLogOut.onclick = () => {
        removeUsuario();
        const cuerpo = document.getElementById("contSection");
        cuerpo.innerHTML = `
    <div id="contBtn" class="container">
                <button type="button" class="btn btnCheck" data-bs-toggle="modal" data-bs-target="#modalLogin"
                    id="btnLogin">Ingrese su cuenta</button>
                <button type="button" class="btn btnCheck" data-bs-toggle="modal" data-bs-target="#modalLogin"
                    id="btnSign">Registrarse </button>
            </div>
    `
        eventoLogin();
        eventoRegistrarse();
        const changbtn = document.getElementById("usuCount");
        changbtn.innerHTML = ``;
        const searchSec = document.getElementById("sectionSearch");
        searchSec.innerHTML = ``
        usuarioNow = null;
    }

}
//Muestra el inventario
function mostarInventario() {
    getInventario();
    getSessionStorage();
    if (carrito.length != 0) {
        showCarrito();
    }
}
//Pide los datos a un json y se los pasa a un array.
function getInventario() {
    const url = "../json/inventario.json";
    fetch(url)
        .then(response => response.json().then(data => {
            inventario.push(...data);
            crearHtml(data)
        }))
        .catch(err => console.log(err))

}

//filtra los elementos en base ala categoria y retorna un array con elementos de la misma categoria
function filterCategoria(arrayProductos, categoria) {
    return arrayProductos.filter((producto) => producto.categoria == categoria);
}
//Eventos de busqueda al detectar un click o la escritura  en el input revisa su contenido 
function eventoSearch() {
    const btnSearch = document.getElementById("searchBtn");
    const inputSearch = document.getElementById("buscar");
    btnSearch.onclick = () => {
        filtrarInput()
    }
    const arraySearch = []
    inputSearch.addEventListener("keyup", filtrarInput)
    //filtra en base al contenido los elementos que contengan en su nombre algo de la palabra buscada y si no hay muestra un mensaje de producto no encontrado
    function filtrarInput() {
        arraySearch.splice(0);
        let main = document.getElementById("contSection");
        main.innerHTML = ``
        const texto = inputSearch.value.toUpperCase();
        for (let producto of inventario) {
            let nombre = producto.nombre.toUpperCase();
            if (nombre.indexOf(texto) !== -1) {
                arraySearch.push(producto)
            }
        }
        crearHtml(arraySearch);
        if (main.innerHTML === "") {
            main.innerHTML = `<h3 class="text-center"> producto no encontrado pd: El SEÑOR X ESTUVO AQUI</h3>`
        }
    }
}
//Crea los html en base a los datos pasados
function crearHtml(arrayProduc) {
    let main = document.getElementById("contSection");
    main.innerHTML = ``
    crearSection("Combos", "combo", filterCategoria(arrayProduc, "combo"));
    crearSection("Pizzas", "pizza", filterCategoria(arrayProduc, "pizza"));
    crearSection("Empanadas", "empanada", filterCategoria(arrayProduc, "empanada"));
    crearSection("Minutas", "minuta", filterCategoria(arrayProduc, "minuta"));
    crearSection("Bebidas", "bebida", filterCategoria(arrayProduc, "bebida"));
}
//Crea una section
function crearSection(subTitle, id, listaProductos) {
    if (listaProductos.length >= 1) {
        let main = document.getElementById("contSection");
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
        const cardsProductos = document.querySelectorAll(".producto");

        //Escucha si hacen click sobre las cards de un elemento para modificar el modal
        cardsProductos.forEach(item => {
            item.addEventListener('click', () => {
                let idCardProducto = parseInt(item.id);
                let productoFind = inventario.find((element) => element.id === idCardProducto)
                editModal(productoFind);
            })
        })
    }

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

//Guarda el array carrito en sessionStorage
function saveSessionStorage() {
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
}
//Recupera el array carrito de sessionStorage
function getSessionStorage() {
    let carritoStorage = JSON.parse(sessionStorage.getItem("carrito"));
    carritoStorage == null ? false : carrito.push(...carritoStorage);
}


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
//Cambia el numero del icono de un carrito indicando la cantidad de productos en el carrito
function changeCantCarrito() {
    let num = document.getElementById("cantProdCarrito");
    num.innerHTML = `${carrito.length}`
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
    //Toasty para notificar el agregado de un producto
    Toastify({
        text: "Producto añadido",
        className: "info",
        duration: 1000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
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
    rBtnBuy.forEach((item, index) => {
        item.addEventListener('click', () => {
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
    lBtnBuy.forEach((item, index) => {
        item.addEventListener('click', () => {
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
    btnDel.forEach((item, index) => {
        item.addEventListener('click', () => {
            carrito.splice(index, 1);
            showCarrito()
            let canasta = document.getElementById("carrito");
            if (carrito.length == 0) {
                canasta.innerHTML = `<div class="d-block msgSinP"><h3>No hay productos</h3></div>`
            }
            //Toasty para notificar el borrado de un producto
            Toastify({
                text: "Producto borrado",
                className: "info",
                duration: 1000,
                style: {
                    background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) 50%, rgba(135,19,11,1) 100%)",
                }
            }).showToast();
            saveSessionStorage();
        })
    })
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
                            <div class="modalButton dBtnBuy ${classBtndl} "  >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24" data-testid="delete">
                                    <path fill="#6A696E"
                                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z">
                                    </path>
                                </svg>
                            </div>
                            <div class="modalButton lBtnBuy ${classLbtn}" >
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
                            <div class="modalButton rBtnBuy " >
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
    if (usuarioNow != undefined && usuarioNow != "") {
        condition = carrito.length != 0 && true;
        if (condition) {
            showMetPago()
        }
    } else {
        Swal.fire("Registrar", "Para hacer un pedido tiene que logearse o registrarse", "warning")
    }


}
//boton para borrar el pedido
const borra = document.getElementById("borrar");
borra.onclick = () => {
    condicion = carrito.length != 0 && true;
    //Swal para la confirmacion de vaciado de Carrito
    if (condicion) {
        Swal.fire({
            title: 'Vaciar Carrito',
            text: '¿Está seguro de vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            customClass: {
                confirmButton: 'btnRed',
            },
            cancelButtonText: 'No, no quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Borrado', 'El carrito ha sido vaciado', 'success')
                resetCarrito();
                saveSessionStorage();
            }
        })
    }
}
//funcion para limpiar el carrito
function resetCarrito() {
    carrito.splice(0);
    showCarrito();
    let canasta = document.getElementById("carrito");
    canasta.innerHTML = carrito.length == 0 && `<div class="d-block msgSinP"><h3>No hay productos</h3></div>`
}

//codigo de la tarjeta 
function showMetPago() {
    let cuerpo = document.getElementById("contSection");
    cuerpo.innerHTML = `
    <div class="contenedor">
                <div class="card-container">
                    <div class="frente">
                        <div class="imagen">
                            <img src="../img/chip.png" alt="chip de tarjeta">
                            <img class="logoTarjeta" src="" alt="">
                        </div>
                        <div class="cajaNumTarjeta">#### #### #### ####</div>
                        <div class="flexbox">
                            <div class="caja">
                                <span>titular</span>
                                <div class="cajaNombre">nombre completo</div>
                            </div>
                            <div class="caja">
                                <span>vencimiento</span>
                                <div class="vencimiento">
                                    <span class="mesVencimiento">mm</span>
                                    <span class="anioVencimiento">aa</span>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="dorso">
                        <div class="banda"></div>
                        <div class="caja">
                            <span>cod seguridad</span>
                            <div class="cajaCodSeguridad"></div>
                            <img class="logoTarjeta" src="" alt="">
                        </div>
                    </div>
        
                </div>
        
                <form id="formulario">
                    <div class="inputBox">
                        <span>numero de tarjeta</span>
                        <input type="text" class="inputNumTarjeta">
                    </div>
                    <div class="inputBox">
                        <span>titular</span>
                        <input type="text" class="inputNombre">
                    </div>
                    <div class="flexbox">
                        <div class="inputBox">
                            <span>mes vencimiento</span>
                            <select id="mes" class="inputMes">
                                <option value="mes" selected disabled>mes</option>
                            </select>
                        </div>
                        <div class="inputBox">
                            <span>año vencimiento</span>
                            <select id="anio" class="inputAnio">
                                <option value="anio" selected disabled>año</option>
                            </select>
                        </div>
                        <div class="inputBox">
                            <span>Cod Seguridad</span>
                            <input type="text" maxlength="4" class="inputCodSeguridad">
                        </div>
                    </div>
                    <p id="alert" ></p>
                    <input type="submit" value="enviar" class="submit-btn" id="btnEnviar">
                </form>
        
            </div>`
    eventoTarjeta();
}
//Contiene las funcionalidades y eventos de la tarjeta
function eventoTarjeta() {
    const selectAnio = document.querySelector('#anio'),
        selectMes = document.querySelector('#mes'),
        form = document.querySelector('#formulario'),
        nombreTitular = document.querySelector('.inputNombre'),
        numeroTarjeta = document.querySelector('.inputNumTarjeta'),
        mesVencimiento = document.querySelector('.inputMes'),
        anioVencimiento = document.querySelector('.inputAnio'),
        codSeguridad = document.querySelector('.inputCodSeguridad'),
        btnEnviar = document.querySelector('#btnEnviar'),
        anios = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    cargarSelect(anios, selectAnio);
    cargarSelect(meses, selectMes);
    agregarContenido(numeroTarjeta, '.cajaNumTarjeta');
    agregarContenido(nombreTitular, '.cajaNombre');
    agregarContenido(mesVencimiento, '.mesVencimiento');
    agregarContenido(anioVencimiento, '.anioVencimiento');
    agregarContenido(codSeguridad, '.cajaCodSeguridad');
    //Si se pasa el mouse por el input codigo de seguridad cambia los estilos
    codSeguridad.onmouseover = () => {
        document.querySelector('.frente').style.transform = 'perspective(1000px) rotateY(-180deg)';
        document.querySelector('.dorso').style.transform = 'perspective(1000px) rotateY(0deg)';
    }
    //Si se saca el mouse del input codigo de seguridad cambia los estilos
    codSeguridad.onmouseout = () => {
        document.querySelector('.frente').style.transform = 'perspective(1000px) rotateY(0deg)';
        document.querySelector('.dorso').style.transform = 'perspective(1000px) rotateY(180deg)';
    }
    //Cambia el icono de la tarjeta en base a los numeros ingresados
    let cleave = new Cleave(numeroTarjeta, {
        creditCard: true,
        onCreditCardTypeChanged: (type) => {
            const logos = document.querySelectorAll('.logoTarjeta');
            logos.forEach(element => {
                element.src = `../img/${type}.png`
            })
        }
    })
    //Revisa que los campos esten completos para enviar
    btnEnviar.addEventListener('click', (e) => {
        e.preventDefault();
        if (validarDatos(nombreTitular.value) && validarDatos(numeroTarjeta.value) && validarDatos(mesVencimiento.value) && validarDatos(anioVencimiento.value) && validarDatos(codSeguridad.value)) {
            resetCarrito();
            showCarrito();
            saveSessionStorage();
            getInventario();
            Toastify({
                text: "Su pedido ha sido enviado",
                className: "info",
                duration: 2000,
                style: {
                    background: "linear-gradient(90deg, rgba(72,83,255,1) 0%, rgba(0,17,194,1) 50%, rgba(11,11,135,1) 100%)",
                }
            }).showToast();
        } else {
            alerta("Rellene todos los campos");
        }

    })
}
//carga las opciones a los select de la tarjeta
function cargarSelect(array, select) {
    array.forEach(element => {
        let option = `<option>${element}</option>`
        select.innerHTML += option;
    })
}
//muestra la informacion en la tarjeta
function agregarContenido(ingreso, caja) {
    ingreso.oninput = () => {
        document.querySelector(caja).innerText = ingreso.value;
    }
}
//El señor X estuvo aqui, mmmm rosquillas */