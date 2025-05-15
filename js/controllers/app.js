//agrega componente header a layout
const header = () => {
  fetch("/components/header.html")
    .then((response) => {
      if (!response.ok) {
        alert("error en el fetch no se puede acceder al recurso");
        return 0;
      }
      return response.text();
    })
    .then((header) => {
      document.getElementById("header").innerHTML = header;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

//agreg componente modal a layout
const modalDialog = () => {
  fetch("/components/modal.html")
    .then((response) => {
      if (!response.ok) {
        alert("error en el fetch no se puede acceder al recurso");
        return 0;
      }
      return response.text();
    })
    .then((modal) => {
      document.getElementById("modal").innerHTML = modal;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
//agrega componente modalEdit a layout
const modalEdit = () => {
  fetch("/components/modalEdit.html")
    .then((response) => {
      if (!response.ok) {
        alert("error en el fetch no se puede acceder al recurso");
        return 0;
      }
      return response.text();
    })
    .then((modalEdit) => {
      document.getElementById("modalEdit").innerHTML = modalEdit;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

//agrega componente loading a layout
const loading = () => {
  fetch("/components/loading.html")
    .then((response) => {
      if (!response.ok) {
        alert("error en el fetch no se puede acceder aal recurso");
        return 0;
      }
      return response.text();
    })
    .then((loading) => {
      document.getElementById("loading").innerHTML = loading;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const footer = () => {
    fetch("/components/footer.html")
      .then((response) => {
        if (!response.ok) {
          alert("error en el fetch no se puede acceder aal recurso");
          return 0;
        }
        return response.text();
      })
      .then((footer) => {
        document.getElementById("footer").innerHTML = footer;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

//agrega componente tabla a layout
const table = () => {
  fetch("/components/table.html")
    .then((response) => {
      if (!response.ok) {
        alert("error en el fetch no se puede acceder aal recurso");
        return 0;
      }
      return response.text();
    })
    .then((table) => {
      document.getElementById("tableContainer").innerHTML = table;
      datatable();
    })
    .catch((error) => {
      console(error.message);
    });
};

//carg el componente form a layout
const form = () => {
    fetch("/components/form.html")
      .then((response) => {
        if (!response.ok) {
          alert("error en el fetch no se puede acceder aal recurso");
          return 0;
        }
        return response.text();
      })
      .then((form) => {
        document.getElementById("form").innerHTML = form;
        datatable();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


//carga todos los componentes de la vista
setTimeout(() => {
  header();
  form();
  table(); 
  loading();
  footer();
  modalEdit();
  modalDialog();
}, 300);


