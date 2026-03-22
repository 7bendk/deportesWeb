<script setup>
// ref nos permite crear variables reactivas (que actualizan la pantalla al cambiar)
import { ref } from 'vue'

// defineEmits nos permite crear "eventos" para avisarle al archivo padre (App.vue) que algo pasó
const emit = defineEmits(['ingresar'])

// Variables conectadas a los inputs del formulario
const usuario = ref('')
const password = ref('')

// Función que se ejecuta al darle clic al botón "Entrar"
const procesarLogin = () => {
  // Aquí en el futuro conectarías con tu base de datos Oracle o Laravel.
  // Por ahora, si escriben algo, los dejamos pasar emitiendo el evento 'ingresar'
  if (usuario.value !== '' && password.value !== '') {
    emit('ingresar') 
  } else {
    alert('Por favor, ingresa un usuario y contraseña')
  }
}
</script>

<template>
  <div class="vh-100 d-flex justify-content-center align-items-center bg-light">
    
    <div class="card shadow-lg p-4 col-11 col-md-4 border-0 rounded-4">
      <div class="text-center mb-4">
        <h1 class="text-primary fw-bold">Sports POS</h1>
        <p class="text-muted">Inicia sesión en el punto de venta</p>
      </div>

      <form @submit.prevent="procesarLogin">
        <div class="mb-3">
          <label class="form-label fw-bold">Usuario</label>
          <input type="text" class="form-control form-control-lg" v-model="usuario" placeholder="Ej. admin" required>
        </div>
        
        <div class="mb-4">
          <label class="form-label fw-bold">Contraseña</label>
          <input type="password" class="form-control form-control-lg" v-model="password" placeholder="****" required>
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold">
          Entrar al Sistema
        </button>
      </form>
    </div>

  </div>
</template>