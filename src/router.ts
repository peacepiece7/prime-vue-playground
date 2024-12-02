import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./pages/Home.vue'),
    children: [
      { path: '/dropdown', component: () => import('./pages/Dropdown.vue') },
      { path: '/datatable', component: () => import('./pages/DataTable.vue') },
      {
        path: '/datatable-pagination',
        component: () => import('./pages/DataTablePagination.vue'),
      },
      {
        path: '/datatable-pagination-with-api',
        component: () => import('./pages/DataTablePaginationWithApi.vue'),
      },
      {
        path: '/datatable-pagination-with-api-and-colum-toggle',
        component: () =>
          import('./pages/DataTablePaginationWithApiAndColumnToggle.vue'),
      },
      {
        path: '/cascade-selector',
        component: () => import('./pages/CascadeSelector.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
