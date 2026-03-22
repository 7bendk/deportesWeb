<script setup>
import { ref } from 'vue'
// Importamos nuestros dos nuevos bloques de Lego (componentes)
import Login from './components/Login.vue'
import Tienda from './components/Tienda.vue'

// Variable reactiva que rastrea si el usuario ya inició sesión o no
const estaLogueado = ref(false)
</script>

<template>
  <Login v-if="!estaLogueado" @ingresar="estaLogueado = true" />
  
  <Tienda v-else @salir="estaLogueado = false" />
</template>

<style>
/* Quitamos el scroll de toda la página para que se comporte como una aplicación de escritorio */
body {
  overflow: hidden;
}
</style>