<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg mx-auto" style="max-width: 500px;">

      <h3 class="text-center mb-3">🧾 Ticket de compra</h3>

      <p><strong>Fecha:</strong> {{ ticket.fecha }}</p>

      <hr>

      <div v-for="p in ticket.productos" :key="p.id" class="mb-2">
        {{ p.nombre }} x{{ p.cantidad }} - ${{ p.precio * p.cantidad }}
      </div>

      <hr>

      <p>Subtotal: ${{ ticket.subtotal }}</p>
      <p>IVA (16%): ${{ ticket.iva }}</p>

      <h4 class="text-success">Total pagado: ${{ ticket.total }}</h4>

      <button class="btn btn-primary w-100 mt-3"
              @click="$router.push('/productos')">
        Volver a comprar
      </button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticket: {}
    }
  },

  mounted() {
    this.ticket = JSON.parse(localStorage.getItem('ticket')) || {}
  }
}
</script>