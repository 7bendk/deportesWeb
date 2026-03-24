<template>
  <nav class="navbar navbar-dark bg-dark px-3">
    <span class="navbar-brand">Sport POS</span>

    <div>
      <button class="btn btn-outline-light me-2"
              @click="$router.push('/productos')">
        Tienda
      </button>

      <button class="btn btn-outline-warning me-2"
              @click="$router.push('/admin')">
        Admin
      </button>

      <button class="btn btn-danger"
              @click="logout">
        Salir
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('auth')
      this.$router.push('/')
    }
  }
}
</script>