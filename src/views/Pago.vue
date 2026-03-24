<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg mx-auto" style="max-width: 400px;">

      <h4 class="mb-3 text-center">💳 Pago con tarjeta</h4>

      <!-- Tipo de tarjeta -->
      <div class="text-center mb-3">
        <span v-if="tipo=='visa'" class="badge bg-primary">VISA</span>
        <span v-if="tipo=='mastercard'" class="badge bg-danger">MASTERCARD</span>
      </div>

      <form @submit.prevent="pagar">

        <input v-model="tarjeta.numero"
               @input="formatearNumero(); detectarTipo()"
               class="form-control mb-2"
               placeholder="1234 5678 9012 3456">

        <input v-model="tarjeta.nombre"
               class="form-control mb-2"
               placeholder="Nombre del titular">

        <div class="row">
          <div class="col">
            <input v-model="tarjeta.fecha"
                   @input="formatearFecha()"
                   class="form-control mb-2"
                   placeholder="MM/AA">
          </div>
          <div class="col">
            <input v-model="tarjeta.cvv"
                   maxlength="3"
                   class="form-control mb-2"
                   placeholder="CVV">
          </div>
        </div>

        <div class="text-danger mb-2">{{ error }}</div>

        <!-- Totales -->
        <div class="bg-light p-2 rounded mb-3">
          <p class="mb-1">Subtotal: ${{ subtotal }}</p>
          <p class="mb-1">IVA (16%): ${{ iva }}</p>
          <h5>Total: ${{ total }}</h5>
        </div>

        <button class="btn btn-success w-100 mb-2">
          Pagar
        </button>

        <button type="button"
                class="btn btn-outline-secondary w-100"
                @click="$router.push('/productos')">
          Seguir comprando
        </button>

      </form>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tarjeta: {
        numero: '',
        nombre: '',
        fecha: '',
        cvv: ''
      },
      tipo: '',
      error: ''
    }
  },

  computed: {
    carrito() {
      return JSON.parse(localStorage.getItem('carrito')) || []
    },

    subtotal() {
      return this.carrito.reduce((a, p) => a + (p.precio * p.cantidad), 0).toFixed(2)
    },

    iva() {
      return (this.subtotal * 0.16).toFixed(2)
    },

    total() {
      return (this.subtotal * 1.16).toFixed(2)
    }
  },

  methods: {

    detectarTipo() {
      const num = this.tarjeta.numero.replace(/\s/g, '')
      if (num.startsWith('4')) this.tipo = 'visa'
      else if (/^5[1-5]/.test(num)) this.tipo = 'mastercard'
      else this.tipo = ''
    },

    formatearNumero() {
      let v = this.tarjeta.numero.replace(/\D/g, '').slice(0, 16)
      this.tarjeta.numero = v.replace(/(.{4})/g, '$1 ').trim()
    },

    formatearFecha() {
      let v = this.tarjeta.fecha.replace(/\D/g, '').slice(0, 4)
      if (v.length >= 3) {
        this.tarjeta.fecha = v.slice(0, 2) + '/' + v.slice(2)
      } else {
        this.tarjeta.fecha = v
      }
    },

    validar() {
      const num = this.tarjeta.numero.replace(/\s/g, '')

      if (num.length !== 16) return "La tarjeta debe tener 16 dígitos"
      if (!this.tarjeta.nombre) return "Nombre requerido"
      if (!/^\d{2}\/\d{2}$/.test(this.tarjeta.fecha)) return "Fecha inválida"
      if (!/^\d{3}$/.test(this.tarjeta.cvv)) return "CVV inválido"

      return ""
    },

    pagar() {
  this.error = ""

  const num = this.tarjeta.numero.replace(/\s/g, '')

  if (num.length !== 16) {
    this.error = "La tarjeta debe tener 16 dígitos"
    return
  }

  if (!this.tarjeta.nombre) {
    this.error = "Nombre requerido"
    return
  }

  if (!/^\d{2}\/\d{2}$/.test(this.tarjeta.fecha)) {
    this.error = "Fecha inválida"
    return
  }

  if (!/^\d{3}$/.test(this.tarjeta.cvv)) {
    this.error = "CVV inválido"
    return
  }

  // ✅ OBTENER DATOS
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []
  let productos = JSON.parse(localStorage.getItem('productos')) || []

  // ✅ ACTUALIZAR STOCK
  carrito.forEach(item => {
    const prod = productos.find(p => p.id === item.id)

    if (prod) {
      prod.stock -= item.cantidad
      if (prod.stock < 0) prod.stock = 0
    }
  })

  localStorage.setItem('productos', JSON.stringify(productos))

  // ✅ CALCULAR TOTALES
  const subtotal = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)
  const iva = subtotal * 0.16
  const total = subtotal + iva

  // ✅ GUARDAR TICKET
  const ticket = {
    productos: carrito,
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total: total.toFixed(2),
    fecha: new Date().toLocaleString()
  }

  localStorage.setItem('ticket', JSON.stringify(ticket))

  // ✅ LIMPIAR CARRITO
  localStorage.removeItem('carrito')

  // ✅ REDIRIGIR
  this.$router.push('/ticket')
}
  }
}
</script>