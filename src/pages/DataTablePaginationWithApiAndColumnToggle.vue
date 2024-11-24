<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import {
  MOCK_PRODUCTS_1PAGE_BY_10SIZE,
  MOCK_PRODUCTS_2PAGE_BY_10SIZE,
  MOCK_PRODUCTS_3PAGE_BY_10SIZE,
} from '../constants'

const products = ref<any[]>([])
const totalRecords = ref(0)
const rows = ref(MOCK_PRODUCTS_1PAGE_BY_10SIZE.data.length) // 페이지당 행 수
const first = ref(0) // 현재 페이지의 첫 번째 행 인덱스

const columns = [
  { field: 'code', header: 'Code', style: 'width: 25%' },
  { field: 'name', header: 'Name', style: 'width: 25%' },
  { field: 'category', header: 'Category', style: 'width: 25%' },
  { field: 'quantity', header: 'Quantity', style: 'width: 25%' },
]

const selectedColumns = ref(columns) // 초기에는 모든 열이 선택됨

const loadData = async (page: number, rows: number) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // API 호출 예시
  if (page == 1) {
    products.value = MOCK_PRODUCTS_1PAGE_BY_10SIZE.data
    totalRecords.value = MOCK_PRODUCTS_1PAGE_BY_10SIZE.totalCount
  } else if (page == 2) {
    products.value = MOCK_PRODUCTS_2PAGE_BY_10SIZE.data
    totalRecords.value = MOCK_PRODUCTS_2PAGE_BY_10SIZE.totalCount
  } else if (page == 3) {
    products.value = MOCK_PRODUCTS_3PAGE_BY_10SIZE.data
    totalRecords.value = MOCK_PRODUCTS_3PAGE_BY_10SIZE.totalCount
  } else {
    products.value = []
    totalRecords.value = 0
  }
}

const onPage = (event: any) => {
  first.value = event.first
  const page = event.page + 1 // PrimeVue는 0부터 시작하므로 1을 더해줌
  loadData(page, rows.value)
}

onMounted(() => {
  loadData(1, rows.value) // 초기 로드 시 첫 페이지 데이터 로드
})
</script>

<template>
  <div style="padding: 40px">
    <MultiSelect
      v-model="selectedColumns"
      :options="columns"
      optionLabel="header"
      placeholder="Select Columns"
      display="chip"
      class="mb-3"
    />
    <DataTable
      :value="products"
      :lazy="true"
      :paginator="true"
      :rows="rows"
      :totalRecords="totalRecords"
      :first="first"
      @page="onPage"
      tableStyle="min-width: 50rem"
    >
      <Column
        v-for="col in selectedColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :style="col.style"
      />
    </DataTable>
  </div>
</template>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
</style>
