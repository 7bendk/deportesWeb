<script setup>
import { ref, computed } from 'vue'

// 1. Definimos las categorías disponibles para nuestros botones de filtro
const categorias = ref(['Todos', 'Boxeo', 'Pesas', 'Fútbol', 'Baloncesto'])
const categoriaSeleccionada = ref('Todos') // Por defecto mostramos todo

// 2. Nuestra base de datos ampliada con imágenes reales y clasificada
const productos = ref([
  // BOXEO
  { id: 1, nombre: 'Guantes de Box 14oz', precio: 850, categoria: 'Boxeo', imagen: 'https://imgs.search.brave.com/5NzLYpOLZpA2eAvAsEhQkYoGvm43zHuEx2zMyotf470/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWNhZGVtaWFkZWJv/eC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMTIvR3Vh/bnRlcy1kZS1ib3gt/ZW4tcGllbC1kZS1y/ZXMtY29sb3ItYmxh/bmNvLTMwMHgzMDAu/anBn' },
  { id: 2, nombre: 'Costal de Entrenamiento', precio: 1500, categoria: 'Boxeo', imagen: 'https://imgs.search.brave.com/AP9nDTFit9Q1MGp7EZKDQcBmsZtDvmahlba4OsA-Tkg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFHTnBvV2E1Q0wu/anBn' },
  { id: 3, nombre: 'Vendas de compresión', precio: 150, categoria: 'Boxeo', imagen: 'https://imgs.search.brave.com/O_FjyWiWPySV7dGi2jdH4aPHesLeSCOpZaTD9k7H6Kw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg4ODM1NC1NTE03/NzAyOTk0OTE2NF8w/NjIwMjQtVi0xMC1w/YXJlcy1kZS12ZW5k/YXMtcGFyYS1ib3gt/bW1hLXNlbWktZWxh/c3RpY2EtNDUtbXQu/d2VicA' },
  
  // PESAS / FITNESS
  { id: 4, nombre: 'Mancuernas Hexagonales 10kg', precio: 600, categoria: 'Pesas', imagen: 'https://imgs.search.brave.com/QXMAvGweyhBjzvFz_HPErMBnqk5PehnruxFzToiYYkI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kbmtr/YWF3Z2d2MGJzLmNs/b3VkZnJvbnQubmV0/LzEwMjk2LW1lZGl1/bV9kZWZhdWx0L3Bh/ci1tYW5jdWVybmFz/LWhleGFnb25hbGVz/LWRlLWNhdWNoby0x/Ny01a2ctaHdtLmpw/Zw' },
  { id: 5, nombre: 'Barra Olímpica', precio: 2200, categoria: 'Pesas', imagen: 'https://imgs.search.brave.com/n8KYpB1VUA81Pm4o4TAxEF7p93N0uE1mG6KeqdvBMJs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzgzNDcwNy1NTFU3/NTYzODc1MDk4Ml8w/NDIwMjQtVi53ZWJwhttps://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
  { id: 6, nombre: 'Cinturón de Levantamiento', precio: 450, categoria: 'Pesas', imagen: 'https://imgs.search.brave.com/WCyoO0MX0iNbfCxlZpeCgh-824IL2N6cv59PrtIk6xk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzEwQkI5c1phUkwu/anBn' },

  // FÚTBOL
  { id: 7, nombre: 'Balón Profesional', precio: 450, categoria: 'Fútbol', imagen: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400&q=80' },
  { id: 8, nombre: 'Zapatos de Tacos', precio: 1200, categoria: 'Fútbol', imagen: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&q=80' },

  // BALONCESTO
  { id: 9, nombre: 'Balón de Baloncesto', precio: 550, categoria: 'Baloncesto', imagen: 'https://imgs.search.brave.com/fhrv7WM9RtW-F7ue-YD63cL5021WI-6iPfxW5ugw6YU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmlsbG93c2hvcC5j/b20vNTg2ZDZjYTEt/YWNlMC1lYjI3LTll/MGItMmQwZDNjM2M2/MDYyL2ltZy9Qcm9k/dWN0by9hYTg4YTI1/YS1jMTViLTY4NGIt/ZTQ5Yy0yNjNmZDBh/M2U3ODgvRGlzZW5v/LXNpbi10aXR1bG8t/MjAyNC0wOC0xNVQx/NzIyNDQtNTk1LTY2/YmU2M2U3ZTcyMTYt/Ty5wbmc' }
])

const carrito = ref([])

// 3. ¡NUEVO! Propiedad computada que filtra los productos según el botón que presiones
const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === 'Todos') {
    return productos.value
  }
  return productos.value.filter(producto => producto.categoria === categoriaSeleccionada.value)
})

const agregarAlCarrito = (producto) => {
  const item = carrito.value.find(i => i.id === producto.id)
  if (item) {
    item.cantidad++
  } else {
    carrito.value.push({ ...producto, cantidad: 1 })
  }
}

const limpiarTicket = () => {
  carrito.value = []
}

const total = computed(() => {
  return carrito.value.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
})

const emit = defineEmits(['salir'])
</script>

<template>
  <nav class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container-fluid px-4">
      <span class="navbar-brand mb-0 h1 fw-bold">Sports POS - Terminal</span>
      <button class="btn btn-outline-light btn-sm" @click="emit('salir')">Cerrar Sesión</button>
    </div>
  </nav>

  <div class="container-fluid bg-light py-4" style="height: calc(100vh - 56px);">
    <div class="row h-100">
      
      <div class="col-lg-8 h-100 d-flex flex-column pe-4">
        
        <div class="d-flex gap-2 mb-4 overflow-auto py-2 align-items-start">
          <button 
            v-for="cat in categorias" 
            :key="cat"
            @click="categoriaSeleccionada = cat"
            class="btn rounded-pill px-4 fw-bold"
            :class="categoriaSeleccionada === cat ? 'btn-primary' : 'btn-outline-secondary bg-white'"
          >
            {{ cat }}
          </button>
        </div>
        
        <div class="row row-cols-1 row-cols-md-3 g-4 overflow-auto flex-grow-1 pb-4">
          <div class="col" v-for="producto in productosFiltrados" :key="producto.id">
            <div class="card h-100 shadow-sm border-0" style="cursor: pointer;" @click="agregarAlCarrito(producto)">
              <img :src="producto.imagen" class="card-img-top" style="height: 180px; object-fit: cover;" :alt="producto.nombre">
              
              <div class="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h6 class="card-title fw-bold text-dark">{{ producto.nombre }}</h6>
                  <span class="badge bg-light text-secondary border mb-2">{{ producto.categoria }}</span>
                </div>
                <h5 class="text-success fw-bold mb-0">${{ producto.precio.toFixed(2) }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 h-100">
        <div class="card h-100 shadow border-0 d-flex flex-column rounded-4">
          <div class="card-header bg-primary text-white pt-3 pb-2 rounded-top-4">
            <h4 class="fw-bold mb-0">🛒 Ticket de Venta</h4>
          </div>
          
          <div class="card-body overflow-auto flex-grow-1 bg-white">
            <div v-if="carrito.length === 0" class="text-center text-muted mt-5">
              <p>Selecciona un producto para agregarlo al ticket.</p>
            </div>
            
            <ul class="list-group list-group-flush" v-else>
              <li class="list-group-item d-flex justify-content-between align-items-center py-3" v-for="item in carrito" :key="item.id">
                <div>
                  <h6 class="mb-1 fw-bold">{{ item.nombre }}</h6>
                  <small class="text-muted">{{ item.cantidad }} pza(s) x ${{ item.precio }}</small>
                </div>
                <span class="fw-bold text-dark">${{ (item.precio * item.cantidad).toFixed(2) }}</span>
              </li>
            </ul>
          </div>

          <div class="card-footer bg-light pt-4 pb-4 border-top">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="h4 mb-0 text-secondary">Total a Pagar:</span>
              <span class="h3 fw-bold text-success mb-0">${{ total.toFixed(2) }}</span>
            </div>
            
            <div class="d-grid gap-2">
              <button class="btn btn-success btn-lg fw-bold" :disabled="carrito.length === 0">
                Cobrar e Imprimir
              </button>
              <button class="btn btn-outline-danger fw-bold mt-2" v-if="carrito.length > 0" @click="limpiarTicket">
                Vaciar Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
  border-bottom: 3px solid #0d6efd !important;
}
/* Ocultar barra de desplazamiento para los botones de categoría */
.overflow-auto::-webkit-scrollbar {
  display: none;
}
</style>