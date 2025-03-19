import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/components/DashboardView.vue'

const routes = [
  { path: '/', component: DashboardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router