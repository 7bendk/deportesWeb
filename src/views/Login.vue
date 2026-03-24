<template>
  <div class="login-container">
    <div class="login-box shadow">
      <h3 class="text-center mb-4">Iniciar sesión</h3>

      <input v-model="usuario" class="form-control mb-3" placeholder="Usuario">
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña">

      <button class="btn btn-dark w-100" @click="login">Entrar</button>

      <p v-if="error" class="text-danger mt-2 text-center">
        Datos incorrectos
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: '',
      password: '',
      error: false
    }
  },

  methods: {
    login() {
      if (this.usuario === 'admin' && this.password === '1234') {
        localStorage.setItem('auth', 'true')
        this.$router.push('/productos')
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000, #444);
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 300px;
}
</style>