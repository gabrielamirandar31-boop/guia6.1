//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModalPais = document.getElementById("idModalPais");

//Arreglo global de pacientes
const STORAGE_KEY = "pacientesGuia6";
let arrayPaciente = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let pacienteEditandoIndex = null;

const guardarPacientes = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayPaciente));
};

const mostrarNotificacion = (texto) => {
  mensaje.innerHTML = texto;
  toast.show();
};

const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";
  pacienteEditandoIndex = null;
  buttonAgregarPaciente.textContent = "Guardar Datos";
  buttonAgregarPaciente.classList.remove("btn-primary");
  buttonAgregarPaciente.classList.add("btn-success");

  inputNombre.focus();
};

const addPaciente = function () {
  let nombre = inputNombre.value.trim();
  let apellido = inputApellido.value.trim();
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value.trim();

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    const paciente = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];

    if (pacienteEditandoIndex !== null) {
      arrayPaciente[pacienteEditandoIndex] = paciente;
      mostrarNotificacion("Paciente actualizado correctamente");
    } else {
      arrayPaciente.push(paciente);
      mostrarNotificacion("Se ha registrado un nuevo paciente");
    }

    guardarPacientes();
    imprimirPacientes();
    limpiarForm();
  } else {
    mostrarNotificacion("Faltan campos por completar");
  }
};

const eliminarPaciente = (index) => {
  if (window.confirm("¿Desea eliminar este paciente?")) {
    arrayPaciente.splice(index, 1);
    guardarPacientes();
    imprimirPacientes();
    mostrarNotificacion("Paciente eliminado correctamente");
  }
};

const editarPaciente = (index) => {
  const paciente = arrayPaciente[index];
  if (!paciente) return;

  inputNombre.value = paciente[0];
  inputApellido.value = paciente[1];
  inputFechaNacimiento.value = paciente[2];
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  if (paciente[3] === "Hombre") {
    inputRdMasculino.checked = true;
  } else if (paciente[3] === "Mujer") {
    inputRdFemenino.checked = true;
  }

  const indicePais = Array.from(cmbPais.options).findIndex(
    (option) => option.text === paciente[4]
  );
  cmbPais.value = indicePais >= 0 ? indicePais : 0;
  inputDireccion.value = paciente[5];
  pacienteEditandoIndex = index;
  buttonAgregarPaciente.textContent = "Actualizar paciente";
  buttonAgregarPaciente.classList.remove("btn-success");
  buttonAgregarPaciente.classList.add("btn-primary");
  inputNombre.focus();
};

function imprimirFilas() {
  let $fila = "";

  arrayPaciente.forEach((element, index) => {
    $fila += `<tr>
      <td scope="row" class="text-center fw-bold">${index + 1}</td>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td>${element[2]}</td>
      <td>${element[3]}</td>
      <td>${element[4]}</td>
      <td>${element[5]}</td>
      <td>
        <button type="button" class="btn btn-primary btn-editar" data-index="${index}" alt="Editar">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button type="button" class="btn btn-danger btn-eliminar" data-index="${index}" alt="Eliminar">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </td>
    </tr>`;
  });
  return $fila;
}

const imprimirPacientes = () => {
  let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <tr>
        <th scope="col" class="text-center" style="width:5%">#</th>
        <th scope="col" class="text-center" style="width:15%">Nombre</th>
        <th scope="col" class="text-center" style="width:15%">Apellido</th>
        <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
        <th scope="col" class="text-center" style="width:10%">Sexo</th>
        <th scope="col" class="text-center" style="width:10%">Pais</th>
        <th scope="col" class="text-center" style="width:25%">Dirección</th>
        <th scope="col" class="text-center" style="width:10%">Opciones</th>
      </tr>
      ${imprimirFilas()}
    </table>
  </div>
  `;
  document.getElementById("idTablaPacientes").innerHTML = $table;

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => editarPaciente(Number(btn.dataset.index)));
  });

  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => eliminarPaciente(Number(btn.dataset.index)));
  });
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
  let paisNew = inputNombrePais.value.trim();

  if (paisNew != "") {
    let option = document.createElement("option");
    option.textContent = paisNew;
    option.value = contadorGlobalOption + 1;

    cmbPais.appendChild(option);
    contadorGlobalOption = cmbPais.children.length;
    mostrarNotificacion("Pais agregado correctamente");
  } else {
    mostrarNotificacion("Faltan campos por completar");
  }
};

buttonLimpiarPaciente.onclick = () => {
  limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
  addPaciente();
};

buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
  addPais();
};

idModalPais.addEventListener("shown.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

const validarRegistroEstudiante = (event) => {
  event.preventDefault();

  const carnet = document.getElementById("idCarnet").value.trim();
  const nombreCompleto = document.getElementById("idNombreCompleto").value.trim();
  const dui = document.getElementById("idDui").value.trim();
  const nit = document.getElementById("idNit").value.trim();
  const fechaNacimiento = document.getElementById("idFechaNacimiento").value.trim();
  const correo = document.getElementById("idCorreo").value.trim();
  const edad = document.getElementById("idEdad").value.trim();

  const reglas = [
    { valor: carnet, regex: /^[A-Z]{2}\d{3}$/i, mensaje: "El carnet debe tener formato AB001." },
    {
      valor: nombreCompleto,
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/,
      mensaje: "El nombre completo solo debe contener letras y espacios."
    },
    { valor: dui, regex: /^\d{8}-\d{1}$/, mensaje: "El DUI debe tener formato ########-#." },
    { valor: nit, regex: /^\d{4}-\d{6}-\d{3}-\d{1}$/, mensaje: "El NIT debe tener formato ####-######-###-#." },
    { valor: fechaNacimiento, regex: /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/, mensaje: "La fecha debe estar en formato dd/mm/yyyy." },
    { valor: correo, regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, mensaje: "Debe ingresar un correo electrónico válido." },
    { valor: edad, regex: /^\d+$/, mensaje: "La edad solo debe contener números." }
  ];

  const reglaFallida = reglas.find((regla) => !regla.regex.test(regla.valor));

  if (reglaFallida) {
    mostrarNotificacion(reglaFallida.mensaje);
    return;
  }

  mostrarNotificacion("Los datos del estudiante son válidos.");
  document.getElementById("idFormEstudiante").reset();
};

document.getElementById("idFormEstudiante").addEventListener("submit", validarRegistroEstudiante);

if (arrayPaciente.length > 0) {
  imprimirPacientes();
} else {
  document.getElementById("idTablaPacientes").innerHTML = "Ninguno";
}

limpiarForm();