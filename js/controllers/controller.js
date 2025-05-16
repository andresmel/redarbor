let idUser;
let modalElement;
let modal;
const initialModal = () => {
  modalElement = document.getElementById("modal");
  modal = bootstrap.Modal.getInstance(modalElement);
};

const selectedFiles = () => {
  let datosEliminados = [];
  $(".seleccionarFila:checked").each(function () {
    let fila = $(this).closest("tr");
    let datosFila = {
      id: fila.find("td:eq(0)").text(),
      name: fila.find("td:eq(1)").text(),
      surname: fila.find("td:eq(2)").text(),
    };
    datosEliminados.push(datosFila);
  });
  if (Object.keys(datosEliminados).length <= 0) {
    alert("debe seleccionar al menos una fila");
    return 0;
  }
  const res = deleteSelected(datosEliminados);
  datatable(res);
};

//inicializa datos al componete table. y posteriormente actualizarlo desde la capa de datos
const datatable = (usuaurios = {}) => {
  if (Object.keys(usuaurios).length <= 0) {
    usuaurios = getUsuarios();
    if ($.fn.DataTable.isDataTable("#table")) {
      $("#table").DataTable().clear().destroy();
    }
    $("#table").DataTable({
      data: usuaurios,
      columns: [
        { data: "id", title: "Id" },
        { data: "name", title: "Name" },
        { data: "surname", title: "Surname" },
        { data: "dateofbirth", title: "Date of birth" },
        { data: "email", title: "Email" },
        { data: "rol", title: "role" },
        {
          data: null,
          title: "Acciones",
          render: function (data, type, row) {
            const rowJson = JSON.stringify(row).replace(/"/g, "&quot;");
            return `
          <button class="btn btn-editar edit"  onclick="editar(${rowJson})">Edit</button>
          <button class="btn btn-eliminar remove" data-bs-toggle="modal" onclick="remove(${row.id},'${row.name}','${row.surname}')">Delete</button>
          <input type="checkbox" class="seleccionarFila">
          `;
          },
        },
      ],
      columnDefs: [
        {
          targets: 0,
          width: "20px",
        },
      ],
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
      },
    });
  } else {
    //actualiza el datatatble con el nuevo array
    const tabla = $("#table").DataTable();
    tabla.clear(); // limpia los datos actuales
    tabla.rows.add(usuaurios); // agrega los nuevos
    tabla.draw();
  }
};

//funcion que trae todos los usuaerios registrados y los retorna al datatable
const getUsuarios = () => {
  try {
    return getUsuariosService();
  } catch (error) {
    return error;
  }
};

const saveUser = () => {
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let dateofbirth = document.getElementById("date").value;
  let email = document.getElementById("email").value;
  let rol = document.getElementById("rol").value;
  rol = Math.trunc(rol);
  //validar los los datos Obligatorios
  if (name == "" || email == "" || dateofbirth == "" || rol == 0) {
    alert("Completar todos los datos obligatorios *");
    return 0;
  }

  const mayorDeEdad = esMayorDeEdad(dateofbirth);
  //validar que se mayor o igual de 18 años y menor a 65
  if (mayorDeEdad < 18 || mayorDeEdad > 64) {
    alert("Es menor de edad o excede el limite edad para trabajar de 64 años");
    return 0;
  }

  const vaalcorreo = esCorreoValido(email);

  if (!vaalcorreo) {
    alert("por favor ingrese formto de correo válido");
    return 0;
  }

  let objUser = {};
  objUser.id = 0;
  objUser.name = name;
  objUser.surname = surname;
  objUser.dateofbirth = dateofbirth;
  objUser.email = email;
  objUser.roleId = rol;
  //se envía el objeto  con los dartos del nuevo usuario y se guarda
  const res = postUserService(objUser);
  if (res == true) {
    alert("ya existe el usuario");
    return 0;
  }
  //actualizar datatable
  datatable(res);
  document.getElementById("msg").style.display = "block";
  setTimeout(() => {
    document.getElementById("msg").style.display = "none";
  }, 5000);
  //limpiaar inputs
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("date").value = "";
  document.getElementById("email").value = "";
  document.getElementById("rol").selectedIndex = 0;
};

const remove = (id, name, surname) => {
  showModal();
  document.getElementById("nombre").innerHTML = name + " " + surname;
  idUser = id;
};

//funcion que elimina usuario
const removeUser = () => {
  try {
    const res = deleteUserService(idUser);
    //actualizar datatable
    datatable(res);
    closeModal();
  } catch (error) {
    closeModal();
  }
};

const editar = (row) => {
  console.log(row);
  document.getElementById("modalEdit").style.display = "flex";
  document.getElementById("idEdit").value = row.id;
  document.getElementById("nameEdit").value = row.name;
  document.getElementById("surnameEdit").value = row.surname;
  document.getElementById("dateEdit").value = row.dateofbirth;
  document.getElementById("emailEdit").value = row.email;
  document.getElementById("rolEdit").value = row.roleId;
};

const saveEdit = () => {
  let id = document.getElementById("idEdit").value;
  let name = document.getElementById("nameEdit").value;
  let surname = document.getElementById("surnameEdit").value;
  let dateofbirth = document.getElementById("dateEdit").value;
  let email = document.getElementById("emailEdit").value;
  let rol = document.getElementById("rolEdit").value;
  if (name == "" || email == "" || dateofbirth == "" || rol == 0) {
    alert("Completar todos los datos obligatorios *");
    return 0;
  }

  const mayorDeEdad = esMayorDeEdad(dateofbirth);
  //validar que se mayor o igual de 18 años y menor de 65
  if (mayorDeEdad < 18 || mayorDeEdad > 64) {
    alert("Es menor de edad o excede el limite edad para trabajar de 64 años");
    return 0;
  }

  const vaalcorreo = esCorreoValido(email);

  if (!vaalcorreo) {
    alert("por favor ingrese formto de correo válido");
    return 0;
  }

  let objUser = {};
  objUser.id = id;
  objUser.name = name;
  objUser.surname = surname;
  objUser.dateofbirth = dateofbirth;
  objUser.email = email;
  objUser.roleId = rol;
  const res = putUserService(objUser);
  if (res == true) {
    alert("ya existe el usuario");
    return 0;
  }
  document.getElementById("modalEdit").style.display = "none";
  document.getElementById("msg").style.display = "block";
  setTimeout(() => {
    document.getElementById("msg").style.display = "none";
  }, 5000);
  datatable(res);
};

const cerrarEditModal = () => {
  document.getElementById("modalEdit").style.display = "none";
};

//muestraa modal de confirmacion eliminar
const showModal = () => {
  const modal = new bootstrap.Modal(document.getElementById("modal"));
  modal.show();
};
//cierra modal
const closeModal = () => {
  const modalElement = document.getElementById("modal");
  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  } else {
    console.log("error al cerraar el modal");
  }
};

// funcion logica para capturar la diferencia en años de fecha de nacimiento y fecha actual
const esMayorDeEdad = (fechaNacimientoStr) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimientoStr);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNacimiento = nacimiento.getMonth();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && hoy.getDate() - 1 < nacimiento.getDate())
  ) {
    edad--;
  }
  return edad;
};

const datataableVerificar = () => {
  let table = $("#table").DataTable(); // Asegúrate de inicializar el DataTable

  if (table.data().count() > 0) {
    console.log("La tabla tiene datos.");
  } else {
    console.log("La tabla está vacía.");
    location.reload();
  }
};

setTimeout(() => {
  datataableVerificar();
}, 1000);