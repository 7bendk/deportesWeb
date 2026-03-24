<template>
  <div class="container mt-4">

    <h2>Administrar productos</h2>

    <!-- FORM -->
    <div class="card p-3 mb-4">
      <input v-model="nuevo.nombre" class="form-control mb-2" placeholder="Nombre">
      <input v-model="nuevo.precio" class="form-control mb-2" placeholder="Precio">
      <input v-model="nuevo.categoria" class="form-control mb-2" placeholder="Categoría">
      <input v-model="nuevo.stock" class="form-control mb-2" placeholder="Stock">
      <input v-model="nuevo.imagen" class="form-control mb-2" placeholder="Imagen URL">

      <button class="btn btn-success" @click="guardar">
        {{ editando ? 'Actualizar' : 'Agregar' }}
      </button>
    </div>

    <!-- LISTA -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>${{ p.precio }}</td>
          <td>{{ p.categoria }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editar(p)">
              Editar
            </button>

            <button class="btn btn-danger btn-sm" @click="eliminar(p.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      nuevo: {},
      editando: false,
      idEdit: null
    }
  },

  mounted() {
    this.productos = JSON.parse(localStorage.getItem('productos')) || []
  },

  methods: {
    guardar() {
      if (this.editando) {
        const i = this.productos.findIndex(p => p.id === this.idEdit)
        this.productos[i] = { ...this.nuevo, id: this.idEdit }
        this.editando = false
      } else {
        this.productos.push({
          ...this.nuevo,
          id: Date.now()
        })
      }

      localStorage.setItem('productos', JSON.stringify(this.productos))
      this.nuevo = {}
    },

    editar(p) {
      this.nuevo = { ...p }
      this.editando = true
      this.idEdit = p.id
    },

    eliminar(id) {
      this.productos = this.productos.filter(p => p.id !== id)
      localStorage.setItem('productos', JSON.stringify(this.productos))
    }
  }
}
</script>