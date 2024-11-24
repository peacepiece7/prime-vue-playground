<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="header">
    <RouterLink to="/dropdown">Dropdown</RouterLink>
    <RouterLink to="/datatable">DataTable</RouterLink>
    <RouterLink to="/datatable-pagination">DataTablePagination</RouterLink>
    <RouterLink to="/datatable-pagination-with-api">
      DataTablePaginationWithApi
    </RouterLink>
    <RouterLink to="/datatable-pagination-with-api-and-colum-toggle">
      DataTablePaginationWithApiAndColumnToggle
    </RouterLink>
    <RouterLink to="/cascade-selector"> CasecadeSelector </RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
.header {
  display: flex;
  gap: 10px;
}
</style>
