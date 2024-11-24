<script setup>
import { ref } from 'vue'
import CascadeSelect from 'primevue/cascadeselect'
import { MOCK_REGIONS } from '../constants'

const regions = ref(MOCK_REGIONS)
const selectedCity = ref(null)
</script>

<template>
  <CascadeSelect
    v-model="selectedCity"
    :options="regions"
    optionLabel="name"
    optionGroupLabel="name"
    :optionGroupChildren="['cities']"
    placeholder="시/도를 선택하세요"
    style="min-width: 14rem"
    :pt="{ panel: { class: 'custom-cascadeselect-panel' } }"
  />
</template>

<style>
.custom-cascadeselect-panel {
  max-height: 300px; /* 원하는 최대 높이로 설정 */
  overflow-y: auto; /* 수직 스크롤 활성화 */
}
.p-cascadeselect-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
