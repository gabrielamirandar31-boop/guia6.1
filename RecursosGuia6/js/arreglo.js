//Accedemos a los contenedores
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector("#idContainerArregloOrdenado");

//Accedemos a cada boton por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

//Agregamos el evento click a los botones
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElemento() {
  const numero = parseInt(document.querySelector("#inputNumero").value);
  //verificando que sea un numero
  if (isNaN(numero)) {
    alert("Debe ingresar un numero válido");
  } else {
    //Agregamos un nuevo elemento al arreglo
    arreglo.push(numero);

    //Utilizaremos la API DOM para crear un elemento html
    let caja = document.createElement("div"); //Creamos un elemento <div></div>
    caja.className = "col-md-1 colum"; //Agregamos una clase al elemento
    let valor = document.createElement("h3"); //Creamos un elemento <h3></h3>
    valor.textContent = numero; //Agregamos texto al elemento <h3></h3>
    caja.appendChild(valor); //Le pasamos como hijo la etiqueta <h3> a nuestro <div>

    //Insertamos los nuevos elementos en el contenedor
    //beforeend inserta el nuevo elemento dentro del contenedor, despues de su ultimo hijo
    containerArreglo.insertAdjacentElement("beforeend", caja);
  }
}

function ordenarElementos() {
  //utilizaremos un for...of para recorrer el arreglo
  //a su vez se utiliza .sort() para ordenarlo
  for (let i of arreglo.sort()) {
    let caja = document.createElement("div");
    caja.className = "col-md-1 colum-green";
    let valor = document.createElement("h3");
    valor.textContent = i;
    caja.appendChild(valor);
    containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
  }
}