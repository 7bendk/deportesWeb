<template>
  <div class="container mt-4">

    <!--  FILTRO -->
    <div class="mb-4">
      <select v-model="categoriaSeleccionada" class="form-select">
        <option value="">Todas las categorías</option>
        <option v-for="c in categorias" :key="c">
          {{ c }}
        </option>
      </select>
    </div>

    <div class="row">

      <div
        class="col-md-4 mb-4"
        v-for="p in productosFiltrados"
        :key="p.id"
      >
        <div class="card h-100 shadow">

          <img
            :src="p.imagen"
            class="card-img-top"
            style="height:200px; object-fit:cover;"
          />

          <div class="card-body">

            <h5>{{ p.nombre }}</h5>

            <p class="text-muted">{{ p.categoria }}</p>

            <p class="fw-bold">$ {{ p.precio }}</p>

            <p>
              Stock:
              <span :class="p.stock > 0 ? 'text-success' : 'text-danger'">
                {{ p.stock }}
              </span>
            </p>

            <button
              class="btn btn-primary w-100"
              :disabled="p.stock === 0"
              @click="comprar(p)"
            >
              {{ p.stock === 0 ? 'Sin stock' : 'Agregar al carrito' }}
            </button>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { productosBase } from '../services/productos'

export default {
  data() {
    return {
      productos: [],
      categoriaSeleccionada: ''
    }
  },

  computed: {
    categorias() {
      return [...new Set(this.productos.map(p => p.categoria))]
    },

    productosFiltrados() {
      if (!this.categoriaSeleccionada) return this.productos
      return this.productos.filter(
        p => p.categoria === this.categoriaSeleccionada
      )
    }
  },

  mounted() {
    this.inicializarProductos()
  },

  watch: {
    //  IMPORTANTE: recarga al volver del ticket
    $route() {
      this.cargarProductos()
    }
  },

  methods: {

    
    inicializarProductos() {
  const guardados = localStorage.getItem('productos')

  if (guardados) {
    let productosGuardados = JSON.parse(guardados)

    productosGuardados = productosGuardados.map(pg => {
      const base = productosBase.find(p => p.id === pg.id)

      if (base) {
        return {
          ...pg,
          nombre: base.nombre,
          precio: base.precio,
          imagen: base.imagen,
          categoria: base.categoria
        }
      }

      return pg
    })

    productosBase.forEach(p => {
      const existe = productosGuardados.find(pg => pg.id === p.id)
      if (!existe) {
        productosGuardados.push(p)
      }
    })

    this.productos = productosGuardados
    localStorage.setItem('productos', JSON.stringify(this.productos))

  } else {
    this.productos = productosBase
    localStorage.setItem('productos', JSON.stringify(this.productos))
  }
},

    //  RECARGAR
    cargarProductos() {
      const guardados = localStorage.getItem('productos')
      if (guardados) {
        this.productos = JSON.parse(guardados)
      }
    },

    // COMPRAR
    comprar(p) {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || []

      const index = carrito.findIndex(item => item.id === p.id)
      const cantidadEnCarrito = index !== -1 ? carrito[index].cantidad : 0

      // NO PASARSE DEL STOCK
      if (cantidadEnCarrito >= p.stock) {
        alert('No hay suficiente stock')
        return
      }

      if (index !== -1) {
        carrito[index].cantidad++
      } else {
        carrito.push({ ...p, cantidad: 1 })
      }

      localStorage.setItem('carrito', JSON.stringify(carrito))

      // ACTUALIZAR CARRITO
      window.dispatchEvent(new Event('carritoActualizado'))
    }
  },

  // ACTUALIZA EN TIEMPO REAL
  created() {
    window.addEventListener('storage', this.cargarProductos)
  },

  unmounted() {
    window.removeEventListener('storage', this.cargarProductos)
  }
}
</script>