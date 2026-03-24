import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Productos from '../views/Productos.vue'
import Pago from '../views/Pago.vue'
import Ticket from '../views/Ticket.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/productos', name: 'Productos', component: Productos },
  { path: '/pago', name: 'Pago', component: Pago },
  { path: '/ticket', name: 'Ticket', component: Ticket },
  { path: '/admin', name: 'Admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = localStorage.getItem('auth')

  if (to.path !== '/' && !auth) {
    return '/'
  }

  if (to.path === '/' && auth) {
    return '/productos'
  }
})

export default router