<template>
  <div class="card h-100 shadow product-card">
    <img :src="producto.imagen" class="card-img-top">

    <div class="card-body text-center">
      <h5>{{ producto.nombre }}</h5>
      <p class="text-success fw-bold">${{ producto.precio }}</p>

      <button class="btn btn-primary w-100"
              @click="$emit('agregar', producto)">
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['producto']
}
</script>

<style>
.product-card img {
  height: 200px;
  object-fit: cover;
}
</style>