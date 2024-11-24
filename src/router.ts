import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
  { path: '/dropdown', component: () => import('./pages/Dropdown.vue') },
  { path: '/datatable', component: () => import('./pages/DataTable.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
