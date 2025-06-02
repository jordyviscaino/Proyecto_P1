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

function mostrarImagen() {
  const fotoPerfil = localStorage.getItem("fotoPerfil");
  console.log("Foto obtenida", fotoPerfil);
  const img = document.getElementById("imagenPerfil");
  if (fotoPerfil && img) {
    img.src = fotoPerfil;
  } else if (img) {
    img.alt = "No se enceuntra la foto";
  }
}

function cargarDescripcionModal() {
  var usuario_completo = localStorage.getItem("datos_usuario");
  if (!usuario_completo) return;

  var ver_completo = JSON.parse(usuario_completo);
  document.getElementById("about").innerHTML =
    ver_completo.descripcion || "Sin descripción.";
}

function generarQRPerfil() {
  const perfilURL = window.location.href;

    const screenshotURL = `https://api.screenshotmachine.com?key=a317fe&url=https%3A%2F%2Fproyecto-p1-sage.vercel.app%2F%23&dimension=1024xfull`;


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
function cargarTextoRedesSociales() {
  const datos = JSON.parse(localStorage.getItem("datos_usuario"));
  if (!datos) return;

  document.getElementById("textoFacebook").textContent =
    datos.facebook || "No hay Facebook";
  document.getElementById("textoInstagram").textContent =
    datos.instagram || "No hay Instagram";
  document.getElementById("textoSpotify").textContent =
    datos.spotify || "No hay Spotify";
}

function mostrarLinksComoTexto() {
  const datos = JSON.parse(localStorage.getItem("datos_usuario"));
  if (!datos) return;

  const redesDiv = document.getElementById("redesSociales");
  redesDiv.innerHTML = ""; // Limpiar contenido anterior

  // Crear lista de redes
  const redes = [
    { nombre: "Facebook", url: datos.facebook, icono: "media/fb.png" },
    { nombre: "Instagram", url: datos.instagram, icono: "media/ig.png" },
    { nombre: "Spotify", url: datos.spotify, icono: "media/spotify.png" },
  ];

  redes.forEach((red) => {
    if (red.url && red.url.trim() !== "") {
      const item = document.createElement("div");
      item.classList.add("mb-2");

      item.innerHTML = `
        <img src="${red.icono}" alt="${red.nombre}" width="20" height="20" style="vertical-align: middle; margin-right: 8px;">
        <a href="${red.url}" target="_blank">${red.url}</a>
      `;

      redesDiv.appendChild(item);
    }
  });
}

function agregarComentarios() {
  document.getElementById("EnviarComentario").addEventListener("click", () => {
    const comentarioInput = document.getElementById("Comentario");
    const lista = document.getElementById("listaComentarios");
    const texto = comentarioInput.value.trim();

    if (texto !== "") {
      const nuevoComentario = document.createElement("div");
      nuevoComentario.classList.add(
        "card",
        "mb-2",
        "shadow-sm",
        "transparente2"
      );
      nuevoComentario.innerHTML = `
      <div class="card-body p-2">
        <p class="mb-1">${texto}</p>
        <small class=" text-info">Publicado justo ahora</small>
      </div>
    `;

      // Agregar arriba
      lista.prepend(nuevoComentario);

      // Limitar a 4 comentarios (si hay más, eliminar el último)
      if (lista.children.length > 4) {
        lista.removeChild(lista.lastElementChild);
      }

      comentarioInput.value = ""; // Limpia el campo
    }
  });
}
// Función que aplica el color guardado en localStorage (si existe)
function aplicarColorPersonalizacion() {
  var color = localStorage.getItem("colorPersonalizacion");
  if (color) {
    // Actualizamos la propiedad de borde y el color del texto desde el estilo inline
    document.getElementById("imagenPerfil").style.border = "5px solid" + color;
    document.getElementById("bienvenidoText").style.color = color;
    // Actualiza también el valor del selector
    document.getElementById("colorSelector").value = color;
  }
}
function cambiarColor() {
  // Event listener para el botón "Aceptar" que guarda y aplica el color seleccionado
  document
    .getElementById("btnAceptarColor")
    .addEventListener("click", function () {
      // Se obtiene el valor del selector de color
      var selectedColor = document.getElementById("colorSelector").value;
      // Se guarda el color seleccionado en localStorage
      localStorage.setItem("colorPersonalizacion", selectedColor);
      // Se actualizan los estilos: se define el borde completo y se cambia el color del texto "Bienvenido a tu perfil:"
      document.getElementById("imagenPerfil").style.border =
        "5px solid " + selectedColor;
      document.getElementById("bienvenidoText").style.color = selectedColor;
    });

  // Al cargar la página, se aplica la personalización si existe.
  aplicarColorPersonalizacion();
}

function cargarPaginas(url_paginas) {
  fetch(`paginas/${url_paginas}.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;
      inicializarTranscripcion();

      mostrarLinksComoTexto();
      iniciarCaptura();
      agregarComentarios();
      generarQRPerfil();
      mostrarImagen();
      mostrarDatosUsuario();
      mostrarUbicacion();
      cargarDescripcionModal();

      // Ahora, según la página cargada, llamamos a las funciones adecuadas.
      if (url_paginas === "crear") {
        // Inicia la cámara en la página de captura.
      } else if (url_paginas === "principal") {
        aplicarColorPersonalizacion();
        cambiarColor();
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
