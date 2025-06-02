console.log("Hola, si ves esto está funcionando");

function guardarCompletof(event) {
  // Obtener valores
  var usuario_n = document.getElementById("nombre_completo").value.trim();
  var usuario_a = document.getElementById("apellido_completo").value.trim();
  var email = document.getElementById("correo").value.trim();
  var birthdate = document.getElementById("fecha_nacimiento").value;
  var descripcion = document.getElementById("descripcion_usuario").value.trim();
  var carrera = document.getElementById("carrera").value;
  var facebook = document.getElementById("facebook").value;
  var instagram = document.getElementById("instagram").value;
  var spotify = document.getElementById("spotify").value;

  // Validaciones básicas
  if (!usuario_n || !usuario_a || !email || !birthdate) {
    alert("Por favor completa el formulario");
    return;
  }

  // Calcular edad
  var birthDate = new Date(birthdate);
  var today = new Date();
  var edad = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  var dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    edad--;
  }

  // Validar edad dentro del rango de 10 a 60 años
  if (edad < 10 || edad > 60) {
    alert("La edad debe estar entre 10 y 60 años.");
    return;
  }

  var datos_usuario = {
    nombre: usuario_n,
    apellido: usuario_a,
    email: email,
    edad: edad,
    birthdate: birthdate,
    descripcion: descripcion,
    carrera: carrera,
    facebook: facebook,
    instagram: instagram,
    spotify: spotify
  };

  // Guardar en localStorage
  localStorage.setItem("datos_usuario", JSON.stringify(datos_usuario));

  alert("Usuario guardado correctamente");
}

function eliminarUser_C() {
  localStorage.removeItem("datos_usuario");
  localStorage.removeItem("datos_ubicacion");
  localStorage.removeItem("fotoPerfil");
  alert("Registro eliminado");
  location.reload();
}

