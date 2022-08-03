//Creador de objeto
class Sucursal {
  constructor(barrio, linkImg, calle, map) {
    this.barrio = barrio.toUpperCase();
    this.linkImg = linkImg;
    this.calle = calle.toUpperCase();
    this.map = map;
  }
}
//array de objetos sucursal
const listaSucursal = [
  new Sucursal("Sucursal de Balvanera", "../img/Sucursales/sucursal1.webp", "Av.Callao 348", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6568.2500884346355!2d-58.39575584813441!3d-34.60099940667171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac18525ea95%3A0x472ebe89b6f58a03!2sLa%20Continental!5e0!3m2!1ses!2sar!4v1655426535660!5m2!1ses!2sar"),
  new Sucursal("Sucursal de Almagro", "../img/Sucursales/sucursal2.webp", "Av.Corrientes 3408", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9289.025102210537!2d-58.424443362688955!3d-34.599955569488884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca8a0dcf8161%3A0xc5c939eeb8a80373!2sLa%20Continental!5e0!3m2!1ses!2sar!4v1657064256618!5m2!1ses!2sar"),
  new Sucursal("Sucursal de Monserrat", "../img/Sucursales/sucursal3.webp", "Av.Belgrano 865", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7810.050316943122!2d-58.390243444515114!3d-34.611199297804156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaddb5409c6d%3A0x5e848a7bc7d0c0c!2sLa%20Continental!5e0!3m2!1ses!2sar!4v1657064371442!5m2!1ses!2sar"),
];
//altera mediante los nodos contenido del html
function cargarSucursal(nSuc) {
  const datosSucursal = document.getElementsByClassName("sucursalEdit");
  datosSucursal[0].innerText = listaSucursal[nSuc].barrio;
  datosSucursal[1].src = listaSucursal[nSuc].linkImg;
  datosSucursal[1].alt = listaSucursal[nSuc].barrio;
  datosSucursal[2].innerText = listaSucursal[nSuc].calle;
  datosSucursal[3].src = listaSucursal[nSuc].map;
}
//recibe los llamados de los botones.
const btnAlmagro = document.getElementById('Almagro'),
  btnBalvanera = document.getElementById('Balvanera'),
  btnMonserrat = document.getElementById('Monserrat');
btnBalvanera.onclick = () => { cargarSucursal(0) }
btnAlmagro.onclick = () => { cargarSucursal(1) }
btnMonserrat.onclick = () => { cargarSucursal(2) }
