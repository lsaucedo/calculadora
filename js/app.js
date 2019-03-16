var calculadora = (function(document, undefined){
  var error_op = "No ha realizado ninguna operación";
  var nuevoVal = false, maxLen = 8, n1 = 0, n2 = 0, resultado = 0,hasPoint = false;
      mostrarValor = "0", operacion = "";
  var btnsId  = {
    btn_onc  : "on", btn_sign : "sign",btn_div  : "dividido",
    btn_por  : "por", btn_menos: "menos",btn_punto: "punto",btn_igual: "igual", btn_mas  : "mas"};
  var domBtns;
//Crea un método que al presionar el botón ON/C se borren los números que estén en pantalla y se muestre sólo el número cero.
//Realiza una validación para la pantalla, en la que sólo se puedan mostrar 8 dígitos
  function resetear(){
      nuevoVal = false; maxLen = 8; n1 = 0; n2 = 0; resultado = 0;
      hasPoint = false; mostrarValor = "0", operacion = "";
  }
  var getBtns = function(){
      domBtns = document.getElementsByClassName("tecla");
  }
  var ejecutarEvents = function(){
    for(var i = 0, len = domBtns.length; i < len; i++) {
        domBtns[i].onclick = events.eBtnClick;
}
}
 var events = {
    eBtnClick: function(e){
      switch (this.id) {
        case btnsId.btn_onc  :
          resetear();
          mostrarDisplay(mostrarValor);
          break;
        case btnsId.btn_sign :
          agregarSigno();
          mostrarDisplay(mostrarValor);
          break;
        case btnsId.btn_punto:
          agregarPunto();
          break;
        case btnsId.btn_igual:
          resolver(this.id);
          break;
        case btnsId.btn_mas  :
        case btnsId.btn_menos:
        case btnsId.btn_por  :
        case btnsId.btn_div  :
        resolver(this.id);
          break;
        default:
          agregarNumero(this.id);
      }
    }
  }
    function mostrarDisplay(value){
        if (value.length > maxLen) value = "ERROR";
        document.getElementById("display").innerHTML = value;
  }
//Debes crear un método que añada el signo negativo al presionar la tecla +/- a un número en pantalla.
    function agregarSigno(){
    resultado = Number(mostrarValor);
    resultado = -1 * resultado;
    mostrarValor = String(resultado);
  }
//Crea un método que al presionar la tecla del punto, lo añada a la derecha del número actual que se muestra en pantalla.
  function agregarPunto(){
    if (hasPoint == true) return;
    if (mostrarValor.length > maxLen) return;
    if (nuevoVal == false && mostrarValor.length == maxLen) return;
    if (nuevoVal == true || mostrarValor == "0") mostrarValor = "0";
    mostrarValor = mostrarValor + ".";
    mostrarDisplay(mostrarValor);
    maxLen = 8;
    hasPoint = true;
    nuevoVal = false;
  }
//Crea los métodos que sean necesarios para que al presionar una tecla numérica, se muestre el número correspondiente en la pantalla.
//Realiza una validación para la pantalla, en la que sólo se puedan mostrar 8 dígitos
  function agregarNumero(id){
    if (mostrarValor.length > maxLen) return;
    if (nuevoVal == false && mostrarValor.length == maxLen) return;
    if (nuevoVal == true || mostrarValor == "0") mostrarValor = "";
    mostrarValor = mostrarValor + id;
    mostrarDisplay(mostrarValor);
    nuevoVal = false;
  }
//El objeto Calculadora debe implementar las cuatro operaciones matemáticas básicas, de tal manera que al presionar un número y el signo aritmético, la pantalla quede vacía para indicar que la calculadora está en medio de una operación
  function resolver(id){
    if (mostrarValor.endsWith(".")) mostrarValor = mostrarValor.substr(0,mostrarValor.length-1);
    if (mostrarValor.length > maxLen) return;
    if (operacion == ""){
      n1 = Number(mostrarValor);
      mostrarValor = "";
    } else {
      n2 = Number(mostrarValor);
      switch (operacion) {
        case btnsId.btn_mas:
        resultado = parseFloat(n1) + parseFloat(n2);
        break;
        case btnsId.btn_menos:
        resultado = parseFloat(n1) - parseFloat(n2);
        break;
        case btnsId.btn_por:
        resultado = parseFloat(n1) * parseFloat(n2);
        break;
        case btnsId.btn_div:
        resultado = parseFloat(n1) / parseFloat(n2);
        break;
        default:
        alert(error_op);
        return;
      }
      if (id != operacion) {
            operacion = id;
      }
      n2 = 0;
      mostrarValor = String(resultado);
      n1 = resultado;
    }
    if (mostrarValor.search(".") == - 1) maxLen = 8;
    else maxLen = 8;
    nuevoVal = true;
    mostrarDisplay(mostrarValor);
    hasPoint = false;
    operacion = id;
  }
  var initialize = function(){
    resetear()
    getBtns();
    ejecutarEvents();
  }
  return{
      init: initialize
  }
})(document);
calculadora.init();
