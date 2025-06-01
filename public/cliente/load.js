// Cargar el header y menú
fetch("header.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

fetch("menu.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("menu").innerHTML = data));

function inicializarTooltips() {
  var tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  var tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function generarQRPerfil() {
  const perfilURL = window.location.href;

  const screenshotURL = `https://api.screenshotmachine.com?key=a317fe&url=https%3A%2F%2Fproyecto-p1-sage.vercel.app%2F%23&dimension=1024x768`;

  const qrURL = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    screenshotURL
  )}&size=200x200`;

  const qrImage = document.getElementById("qrImage");
  if (qrImage) {
    qrImage.src = qrURL;
  } else {
    console.error("Error: No se encontró el elemento del QR en el DOM.");
  }
}
/* 
function mostrarDatos() {
  // Leer datos desde localStorage
  const datosGuardados = localStorage.getItem("datos_usuario");
  const divUserInfo = document.getElementById("user-info");

  if (datosGuardados) {
    try {
      const usuario = JSON.parse(datosGuardados);
      divUserInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${usuario.nombre || ""}</p>
        <p><strong>Apellido:</strong> ${usuario.apellido || ""}</p>
        <p><strong>Email:</strong> ${usuario.email || ""}</p>
        <p><strong>Edad:</strong> ${usuario.edad || ""}</p>
      `;
    } catch (e) {
      console.error("Error al parsear datos_usuario:", e);
      divUserInfo.innerHTML = "<p>Error al cargar los datos del usuario.</p>";
    }
  } else {
    divUserInfo.innerHTML =
      "<p>No se encontró información del usuario guardada.</p>";
  }

  // Mostrar foto de perfil, si existe
  const fotoGuardada = localStorage.getItem("fotoPerfil");
  const imgPerfil = document.getElementById("foto-perfil");
  if (fotoGuardada && imgPerfil) {
    imgPerfil.src = fotoGuardada;
  } else if (imgPerfil) {
    imgPerfil.alt = "No hay foto de perfil guardada.";
  }
}
 */
// Función para eliminar los datos y refrescar la vista
function eliminarUser() {
  localStorage.removeItem("datos_usuario");
  localStorage.removeItem("fotoPerfil");
  alert("Datos eliminados.");
  // Luego se refresca la sección de ver para actualizar la vista
  mostrarDatos();
}

/* function cargarPaginas(url_paginas) {
  fetch(`paginas/${url_paginas}.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("contenido").innerHTML = data;
      inicializarTooltips();
      inicializarTranscripcion();
      inicializarCamera();
      tomarFoto();
      generarQRPerfil();
      if (url_paginas === "ver") {
        mostrarDatos();
      }
    })
    .catch((error) => console.error("Error al cargar la página:", error));
} */

function cargarPaginas(url_paginas) {
  fetch(`paginas/${url_paginas}.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;
      inicializarTranscripcion();
      generarQRPerfil();
      // Ahora, según la página cargada, llamamos a las funciones adecuadas.
      if (url_paginas === "crear") {
        // Inicia la cámara en la página de captura.
        iniciarCaptura();
      } else if (url_paginas === "ver") {
        // Muestra la imagen guardada.
        mostrarDatosUsuario();
        mostrarImagen();
        mostrarUbicacion();
      }
    })
    .catch((err) => console.error("Error al cargar la página:", err));
}

// Al iniciar, carga la página de captura
window.onload = function () {
  cargarPaginas("principal");
};

document.getElementById("contenido").addEventListener("click", (event) => {
  if (event.target.id === "btnMeGusta") {
    showAlert("¡Graaaciass!", "success");
  } else if (event.target.id === "btnNoMeGusta") {
    showAlert("¡Trataré de mejorar!", "danger");
  }
});

function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");

  if (!alertContainer) {
    console.error(
      "Error: No se encontró el elemento 'alertContainer' en el DOM."
    );
    return;
  }

  alertContainer.innerHTML = "";

  const alertDiv = document.createElement("div");
  alertDiv.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  alertContainer.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.classList.remove("show");
    alertDiv.classList.add("fade");
    setTimeout(() => {
      alertDiv.remove();
    }, 500);
  }, 3000);
}
