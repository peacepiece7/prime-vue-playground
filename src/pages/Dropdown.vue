<script setup lang="ts">
import { ref } from 'vue'
import VDropdown from '../components/lagacyCommon/VDropdown.vue'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import FloatLabel from 'primevue/floatlabel'
import { AutoCompleteEmitsOptions } from 'primevue/autocomplete'
import Select from 'primevue/select'

const optionList = ref([
  { commnCd: '1', cdNm: '게이트볼' },
  { commnCd: '2', cdNm: '축구' },
  { commnCd: '3', cdNm: '야구' },
  { commnCd: '4', cdNm: '배구' },
  { commnCd: '5', cdNm: '수영' },
  { commnCd: '6', cdNm: '비치발리볼' },
  { commnCd: '7', cdNm: '볼링' },
  { commnCd: '8', cdNm: '족구' },
  { commnCd: '9', cdNm: '세펙타크로' },
])

const opt = ref(optionList.value[0])

const autoCompleteList = ref(optionList.value)
const autoCompleteRef = ref<AutoCompleteEmitsOptions>()
const ac = ref('')

// 입력 값에 따라 suggestions 업데이트
const searchSuggestions = (event: any) => {
  const query = event.query.toLowerCase()
  const filtered = optionList.value.filter((option) =>
    option.cdNm.toLowerCase().includes(query)
  )
  autoCompleteList.value = filtered
}

const value = ref<any>('')
const items = ref<any[]>([])

const search = (event: any) => {
  let _items = [...Array(10).keys()]

  items.value = event.query
    ? [...Array(10).keys()].map((item) => event.query + '-' + item)
    : _items
}

const selectOption = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
])

const so1 = ref('')
const es1 = ref<any>()

const so2 = ref('')
const es2 = ref<any>()

const so3 = ref('')
const es3 = ref<any>()
</script>

<template>
  <div>
    <h1>Dropdown</h1>
  </div>
  <div>
    <h2>before, after 비교</h2>
    <VDropdown
      v-model="opt"
      :options="optionList"
      label-property="cdNm"
      value-property="commnCd"
    />
    <Dropdown
      v-model="opt"
      :options="optionList"
      option-label="cdNm"
      style="width: 200px; text-align: start"
    />
  </div>

  <h2>
    Auto Complete는 IME 문제가 있음, 검색시 첫 입력이 씹힘 + 구조상 select
    클릭시 리스트 안나옴
  </h2>
  <div>
    <FloatLabel style="width: fit-content" variant="on">
      <AutoComplete
        ref="autoCompleteRef"
        input-id="over_label"
        v-model="ac"
        dropdown
        :suggestions="autoCompleteList"
        @complete="searchSuggestions"
        option-label="cdNm"
      >
        <template #option="slotProps">
          <div>{{ slotProps.option.cdNm }}</div>
        </template>
      </AutoComplete>
      <label for="over_label">운영 종목</label>
    </FloatLabel>
  </div>

  <h2>
    editable select일 경우, 사용자가 입력한 값이 옵션에 없을 수도 있다는 점을
    고려해야 한다.
  </h2>
  <div style="padding: 20px"></div>
  <FloatLabel variant="on">
    <Select
      ref="es1"
      input-id="on_label_select"
      v-model="so1"
      :options="selectOption"
      option-label="label"
      option-value="value"
      editable
      style="width: 200px"
    />
    <label for="on_label_select">경기 종목</label>
  </FloatLabel>
  <div style="padding: 10px"></div>
  <FloatLabel variant="on">
    <!-- 업데이트 되는 순서 떄문에 옵션을 선택해도 계속 show 되는 문제 -->
    <Select
      ref="es2"
      input-id="on_label_select"
      v-model="so2"
      :options="selectOption"
      option-label="label"
      option-value="value"
      @focus="es2.show()"
      editable
      style="width: 200px"
    />
    <label for="on_label_select">경기 종목 (focus)</label>
  </FloatLabel>
  <div style="padding: 10px"></div>
  <FloatLabel variant="on">
    <Select
      ref="es3"
      input-id="on_label_select"
      v-model="so3"
      :options="selectOption"
      option-label="label"
      option-value="value"
      style="width: 200px"
    />
    <label for="on_label_select">경기 종목 (only read)</label>
  </FloatLabel>

  <h2>
    KeyFilter를 사용해서 숫자만 입력받기, 통화 입력 + 출력하기, 전화번호, 이메일
    받기
  </h2>
  <h2>Rating 컴포넌트로 만족도 조사하기</h2>
</template>

<style scoped></style>
