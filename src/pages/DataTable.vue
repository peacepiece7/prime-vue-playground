<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref, watchEffect } from 'vue'

const products = ref([
  { code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10 },
  { code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 20 },
  { code: 'P003', name: 'Product 3', category: 'Category 3', quantity: 30 },
  { code: 'P004', name: 'Product 4', category: 'Category 4', quantity: 40 },
  { code: 'P005', name: 'Product 5', category: 'Category 5', quantity: 50 },
])

onMounted(() => {
  setTimeout(() => {
    // change values of products
    products.value = [
      { code: 'A001', name: 'Prod A1', category: 'Categ 1', quantity: 40 },
      { code: 'A002', name: 'Prod A2', category: 'Categ 2', quantity: 30 },
      { code: 'A003', name: 'Prod A3', category: 'Categ 3', quantity: 20 },
      { code: 'A004', name: 'Prod A4', category: 'Categ 4', quantity: 10 },
      { code: 'A005', name: 'Prod A5', category: 'Categ 5', quantity: 5 },
    ]
  }, 5000)
})

const sortField = ref<any>(null)
const sortOrder = ref<any>(null)

const onSort = (event: any) => {
  sortField.value = event.sortField
  sortOrder.value = event.sortOrder
}
</script>

<template>
  <DataTable
    :value="products"
    resizableColumns
    columnResizeMode="fit"
    :sortField="sortField"
    :sortOrder="sortOrder"
    @sort="onSort"
    tableStyle="min-width: 50rem"
  >
    <Column field="code" header="Code" sortable style="width: 25%" />
    <Column field="name" header="Name" sortable style="width: 25%" />
    <Column field="category" header="Category" sortable style="width: 25%" />
    <Column field="quantity" header="Quantity" sortable style="width: 25%" />
  </DataTable>
</template>

<style>
.p-datatable-column-resizer {
  background-color: rgba(0, 0, 0, 0.1); /* 원하는 색상으로 변경 */
  width: 5px !important; /* 두께 설정 */
  cursor: col-resize; /* 마우스 커서 모양 설정 */
}
</style>
