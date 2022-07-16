/*array con subarrays para contener la info de las sucursales */
const datosSucursales = [["Sucursal de Balvanera","../img/Sucursales/sucursal1.webp","Av.Callao 348","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6568.2500884346355!2d-58.39575584813441!3d-34.60099940667171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac18525ea95%3A0x472ebe89b6f58a03!2sLa%20Continental!5e0!3m2!1ses!2sar!4v1655426535660!5m2!1ses!2sar"],
["Sucursal de Almagro","../img/Sucursales/sucursal2.webp","Av.Corrientes 3408","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9289.025102210537!2d-58.424443362688955!3d-34.599955569488884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca8a0dcf8161%3A0xc5c939eeb8a80373!2sLa%20Continental!5e0!3m2!1ses!2sar!4v1657064256618!5m2!1ses!2sar"],
["Sucursal de Monserrat","../img/Sucursales/sucursal3.webp","Av.Belgrano 865","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7810.050316943122!2d-58.390243444515114!3d-34.611199297804156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaddb5409c6d%3A0x5e848a7bc7d0c0c!2sLa%20Continental!5e0!3m2!1ses!2sar!4v1657064371442!5m2!1ses!2sar"]];

/*Una funcion para meter el contenido al html */
function cargarSucursal(numSuc){
    var sucursal = document.getElementById("sucursalMaster");
    var alt= "Sucursal de "+datosSucursales[numSuc][0]
    sucursal.innerHTML = '<h2 class="text-center">'+datosSucursales[numSuc][0]+'</h2>'+
    '<div class="row ">'+
      '<div class="col-md-6 fs-4 p-4">'+
        '<img src="'+datosSucursales[numSuc][1]+'" width="100%" alt="'+alt+'" class="w-100">'+
        '<p class="main_textSucursal">Número de teléfono: xxxx-xxxx</p>'+
        '<p class="main_textSucursal">horarios: lunes a viernes 09:00 AM a 23:00 PM </p>'+
        '<p class="main_textSucursal">'+datosSucursales[numSuc][2]+'</p>'+
      '</div>'+
      '<div class="col-md-6 ">'+
      '<iframe class="maps"src="'+datosSucursales[numSuc][3]+'"style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'+
      '</div>'+
    '</div>'
}