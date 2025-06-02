function inicializarTranscripcion() {
  const grabador = document.getElementById("Grabador");
  const comentario = document.getElementById("Comentario");

  if (!grabador || !comentario) {
    console.error("Error: Elementos de transcripción no encontrados.");
    return;
  }

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!window.SpeechRecognition) {
    alert("Tu navegador no soporta la transcripcion de voz");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-ES";
  recognition.continuous = false;
  recognition.interimResults = false;

  grabador.addEventListener("click", () => {
    recognition.start();
    grabador.textContent = "🎙️ Escuchando...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    comentario.value = transcript;
    grabador.textContent = "🎤 Iniciar Transcripcion";
  };

  recognition.onerror = (event) => {
    console.error("Error en reconocimiento de voz:", event.error);
    grabador.textContent = "🎤 Iniciar Transcripcion";
  };
}

/* function inicializarCamera() {
let camera = null;

navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((s) => {
  camera = s;

  document.getElementById("camara").srcObject = camera;
});

}

function tomarFoto() {
  let fotografia = document.getElementById("camara");
  let canvas = document.getElementById("foto_camara");
  
  // Obtener el contexto y dibujar la imagen de la cámara en el canvas
  let ctx = canvas.getContext("2d");
  ctx.drawImage(fotografia, 0, 0, canvas.width, canvas.height);
  
  // Convertir el canvas a imagen en base64
  const imagenBase64 = canvas.toDataURL("image/jpeg"); // También podría ser "image/png"
  localStorage.setItem("fotoPerfil", imagenBase64);
}
 */
function iniciarCaptura() {
  const video = document.getElementById("camara");
  if (video) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Error al acceder a la camara", err);
      });
  } else {
    console.error("No se encuentra la camara");
  }
}

function tomarFoto() {
  const video = document.getElementById("camara");
  const canvas = document.getElementById("foto_camara");

  if (video && canvas) {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg");
    console.log("Foto tomada", dataURL);
    localStorage.setItem("fotoPerfil", dataURL);
  }
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

function mostrarDatosUsuario() {
  var usuario_completo = localStorage.getItem("datos_usuario");
  var ver_completo = JSON.parse(usuario_completo);
  document.getElementById("nombre_C").innerHTML = ver_completo.nombre;
  document.getElementById("apellido_C").innerHTML = ver_completo.apellido;
  document.getElementById("correo_C").innerHTML = ver_completo.email;
  document.getElementById("edad_C").innerHTML = ver_completo.edad;
  console.log(usuario_completo);
}

function obtenerUbicacion() {
  let my_geolocation = navigator.geolocation; //obtenemos la geolocalizacion
  //let, var para las variables
  if (my_geolocation) {
    alert("Ubicacion generada");
    //Funciones para obtener la ubicacion
    my_geolocation.getCurrentPosition(function (posiciones) {
      console.log(posiciones.coords.latitude);
      console.log(posiciones.coords.longitude);

      var latitud = posiciones.coords.latitude;
      var longitud = posiciones.coords.longitude;

      var datos_ubicacion = {
        latitud_d: latitud,
        longitud_d: longitud,
      };

      localStorage.setItem("datos_ubicacion", JSON.stringify(datos_ubicacion));
      alert("Ubicacion guardada correctamente");
    });
  } else {
    alert("No se pudo obtener la ubicacion");
  }
}

function mostrarUbicacion() {
  var ubicacion_completa = localStorage.getItem("datos_ubicacion");
  if (!ubicacion_completa) {
    console.error("No hay datos de ubicacion");
    return;
  }
  var ubicar = JSON.parse(ubicacion_completa);
  var latitud_m = ubicar.latitud_d;
  var longitud_m = ubicar.longitud_d;
  var map = L.map("map").setView([latitud_m, longitud_m], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

