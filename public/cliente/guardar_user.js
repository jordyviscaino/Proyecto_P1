console.log("Hola si ves esto esta funcionando");

function guardarCompletof(event) {
  // Obtener valores
  var usuario_n = document.getElementById("nombre_completo").value.trim();
  var usuario_a = document.getElementById("apellido_completo").value.trim();
  var email = document.getElementById("correo").value.trim();
  var edad = parseInt(document.getElementById("edad").value);

  // Validaciones 
  if (
    !usuario_n ||
    !usuario_a ||
    !email ||
    isNaN(edad) ||
    edad < 10 ||
    edad > 99
  ) {
    alert("Por favor completa el formulario");
    return;
  }

  var datos_usuario = {
    nombre: usuario_n,
    apellido: usuario_a,
    email: email,
    edad: edad,
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
