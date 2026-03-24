<template>
  <div>
    <!-- Botón flotante -->
    <button class="btn btn-dark carrito-btn" data-bs-toggle="offcanvas" data-bs-target="#carritoCanvas">
      🛒 ({{ totalItems }})
    </button>

    <!-- Slider -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="carritoCanvas">
      <div class="offcanvas-header">
        <h5>Carrito</h5>
        <button class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      <div class="offcanvas-body">

        <div v-if="carrito.length === 0">
          Carrito vacío
        </div>

        <div v-for="(p, i) in carrito" :key="p.id" class="mb-3 border-bottom pb-2">

          <strong>{{ p.nombre }}</strong><br>
          ${{ p.precio }} x {{ p.cantidad }}

          <div class="mt-1">
            <button class="btn btn-sm btn-danger" @click="restar(i)">-</button>
            <button class="btn btn-sm btn-success ms-1" @click="sumar(i)">+</button>
          </div>

        </div>

        <hr>

        <p>Subtotal: ${{ subtotal }}</p>
        <p>IVA (16%): ${{ iva }}</p>
        <h5>Total: ${{ total }}</h5>

        <button class="btn btn-success w-100 mb-2" @click="pagar">
          Pagar
        </button>

        <button class="btn btn-outline-secondary w-100" data-bs-dismiss="offcanvas">
          Seguir comprando
        </button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { carrito: [] }
  },

  computed: {
    subtotal() {
      return this.carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)
    },
    iva() {
      return (this.subtotal * 0.16).toFixed(2)
    },
    total() {
      return (this.subtotal * 1.16).toFixed(2)
    },
    totalItems() {
      return this.carrito.reduce((a, p) => a + p.cantidad, 0)
    }
  },

  mounted() {
    this.cargar()
    window.addEventListener('carritoActualizado', this.cargar)
  },

  methods: {
    cargar() {
      this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
    },

    sumar(i) {
      this.carrito[i].cantidad++
      this.actualizar()
    },

    restar(i) {
      if (this.carrito[i].cantidad > 1) {
        this.carrito[i].cantidad--
      } else {
        this.carrito.splice(i, 1)
      }
      this.actualizar()
    },

    actualizar() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito))
      window.dispatchEvent(new Event('carritoActualizado'))
    },

    pagar() {
      this.$router.push('/pago')
    }
  }
}
</script>

<style>
.carrito-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 20px;
}
</style>