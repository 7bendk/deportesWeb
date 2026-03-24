export function obtenerProductos() {
  return JSON.parse(localStorage.getItem('productos')) || []
}

export function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos))
}