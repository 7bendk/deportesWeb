<template>
  <div>
  
    <Navbar v-if="!esLogin" />

    <Carrito v-if="$route.name === 'Productos'" />

    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Carrito from './components/Carrito.vue'

export default {
  components: { Navbar, Carrito },

  computed: {
    esLogin() {
      return this.$route.path === '/'
    }
  }
}
</script>