<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { MOCK_PRODUCTS } from '../constants'

const products = ref(MOCK_PRODUCTS)

const sortField = ref(null)
const sortOrder = ref(null)

const onSort = (event) => {
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
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20]"
    tableStyle="`min-width: 50rem"
  >
    <Column field="code" header="Code" sortable style="width: 25%" />
    <Column field="name" header="Name" sortable style="width: 25%" />
    <Column field="category" header="Category" sortable style="width: 25%" />
    <Column field="quantity" header="Quantity" sortable style="width: 25%" />
  </DataTable>
</template>
