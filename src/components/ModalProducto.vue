<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <h5>Agregar producto</h5>

        <input v-model="nombre" class="form-control mb-2" placeholder="Nombre">

        <button class="btn btn-success me-2" @click="guardar">
          Guardar
        </button>

        <button class="btn btn-secondary" @click="$emit('cerrar')">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: ''
    }
  },

  methods: {
    guardar() {
      if (!this.nombre) return

      this.$emit('guardar', this.nombre)
      this.nombre = ''
    }
  }
}
</script>