<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import usePositionTracker from '../../composables/usePositionTracker'
import { cloneDeep } from '../../util/common'
import { watch } from 'vue'
import { $extractNumbers } from '../../plugins/commonFn'
import VCheckbox from './VCheckbox.vue'
import { v4 as uuidv4 } from 'uuid'
import VIconFont from './VIconFont.vue'
import VTextInput from './VTextInput.vue'

const uuid = uuidv4()

export type DropdownProps = {
  options: any[]
  modelValue: any | null
  multiple: any[] | null
  placeholder: string
  optionsHeight: string
  labelProperty: string
  valueProperty: string
  disabled: boolean
  type: 'single' | 'multiple'
  width: string
  scrollHeight: string
  allOption: boolean
  disabledProperty: string[]
  /**
   * @deprecated
   */
  name?: any
  allValue?: any
  searhDropdown?: boolean
}

type DropdownEmits = {
  'update:modelValue': [p: any]
  change: [p: any]
  'update:multiple': [p: any]
  blur: []
}

/**
 * disabled : asdf
 */
const props = withDefaults(defineProps<Partial<DropdownProps>>(), {
  disabled: false,
  labelProperty: 'label',
  valueProperty: 'value',
  placeholder: '선택하세요.',
  type: 'single',
  width: '180px',
  scrollHeight: '200px',
  searhDropdown: false,
})

const emits = defineEmits<DropdownEmits>()
const checkedList = ref<any[]>(props.multiple ?? [])

const searchVal = ref('')

const selectedTitles = computed(() => {
  if (props.type === 'multiple') {
    if (!checkedList.value.length) return props.placeholder

    const valueArr = checkedList.value.map((ele) => ele[props.valueProperty])
    const filterEle = props.options
      ?.filter((ele) => valueArr.includes(ele[props.valueProperty]))
      .map((ele) => ele[props.labelProperty])

    return !!filterEle?.length ? filterEle.join(', ') : props.placeholder
  } else {
    // 단일 선택시
    if (!props.modelValue) return props.placeholder
    const findEle = props.options?.find(
      (ele) =>
        ele[props.valueProperty] === props.modelValue[props.valueProperty]
    )

    return findEle ? findEle[props.labelProperty] : props.placeholder
  }
})

const calcScrollHeight = computed(() => {
  const heightNum = $extractNumbers(props.scrollHeight)
  return props.searhDropdown ? `${heightNum + 54}px` : `${heightNum}px`
})

// 단일 선택
function handleOnClickOption(opt: any) {
  emits('update:modelValue', opt)
  emits('change', opt)
  isHidden.value = false
}

// 다중선택
function multipleClickOption(item: any, checked: boolean) {
  checked
    ? checkedList.value.push(item)
    : (checkedList.value = checkedList.value.filter(
        (ele) => ele[props.valueProperty] !== item[props.valueProperty]
      ))
}

function selected(selectedItem: any) {
  if (props.type === 'single') {
    if (!props.modelValue) return false
    return (
      selectedItem[props.valueProperty] ===
      props.modelValue[props.valueProperty]
    )
  } else {
    const checkedValue = checkedList.value.map(
      (ele) => ele[props.valueProperty]
    )
    return checkedValue.includes(selectedItem[props.valueProperty])
  }
}

const { position, targetElement, element, toggleHandler, isHidden } =
  usePositionTracker(4, $extractNumbers(calcScrollHeight.value), () => {})

watch(
  () => props.multiple,
  (newVal) => {
    if (newVal && props.type === 'multiple') {
      checkedList.value = newVal
    }
  }
)

const refWidth = ref('')

watch(isHidden, (flag) => {
  if (!isHidden.value) {
    searchVal.value = ''
    emits('blur')
  } else {
    refWidth.value = targetElement.value?.offsetWidth + 'px'
  }

  if (props.type === 'multiple') {
    if (!isHidden.value) emits('update:multiple', cloneDeep(checkedList.value))
  }

  if (flag) {
    console.log(targetElement.value?.offsetWidth)
  }
})

const bodyWidth = computed(() => {
  if (props.width !== '100%') return props.width
  return refWidth.value
})

// option like 검색
const optionsValue = computed(() => {
  if (props.searhDropdown) {
    if (searchVal.value) {
      if (Array.isArray(props.options)) {
        return props.options.filter((ele) =>
          ele[props.labelProperty]
            .toLowerCase()
            .includes(searchVal.value.toLowerCase())
        )
      }
    }
  }

  return props.options
})
</script>

<template>
  <div
    class="select"
    :class="{ disabled: disabled, active: isHidden }"
    role="combobox"
    aria-expanded="false"
    ref="targetElement"
    :style="{ width: width }"
    tabindex="0"
    @keydown.enter="
      isHidden = !isHidden
      toggleHandler()
    "
    @click="
      isHidden = !isHidden
      toggleHandler()
    "
  >
    <p class="select-view">
      {{ selectedTitles }}
    </p>
    <div class="select-btn">
      <VIconFont icon="ic_arrow" v-if="type === 'single'" />
      <VIconFont icon="ic_dropdown" v-else style="font-size: 13px" />
    </div>
    <Teleport to="body">
      <div
        class="select-opt-animation-guard"
        :class="{ 'is-active': isHidden }"
        :style="{
          ...position,
          width: bodyWidth,
          'max-height': isHidden ? calcScrollHeight : '0px',
          border: isHidden ? '1px solid #ddd' : '#d6dce5',
        }"
        ref="element"
      >
        <div class="select-like-search" v-if="searhDropdown">
          <VTextInput search-icon v-model="searchVal" width="100%" />
        </div>
        <div class="select-opt-cover">
          <ul class="select-opt-list" v-if="type === 'single'">
            <li
              class="select-opt"
              v-for="item of optionsValue"
              :key="item[valueProperty]"
              :class="{
                selected: selected(item),
                disabled: disabledProperty?.includes(item[valueProperty]),
              }"
              @click="handleOnClickOption(item)"
              tabindex="0"
              @keydown.enter="handleOnClickOption(item)"
            >
              <label>
                {{ item[labelProperty] }}
              </label>
            </li>
          </ul>

          <ul class="select-opt-list" v-else>
            <li
              v-if="options && allOption"
              class="select-opt"
              :class="{ selected: checkedList.length === options.length }"
            >
              <VCheckbox
                class="mr-10"
                :checked="checkedList.length === options.length"
                :id="uuid"
                @change="
                  checkedList =
                    checkedList.length === options.length ? [] : options
                "
              />
              <label :for="uuid">전체선택 </label>
            </li>
            <li
              class="select-opt"
              v-for="item of options"
              :key="item[valueProperty]"
              :class="{ selected: selected(item) }"
            >
              <VCheckbox
                class="mr-10"
                :id="item[valueProperty]"
                :checked="selected(item)"
                @change="
                  multipleClickOption(
                    item,
                    ($event.target as HTMLInputElement).checked
                  )
                "
              />
              <label :for="item[valueProperty]">
                {{ item[labelProperty] }}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.select-like-search {
  background-color: #fff;
  padding: 10px;
  height: 54px;
}

.select {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #d6dce5;
  color: #666;
  background-color: #fff;
  cursor: pointer;
  display: inline-flex;
  vertical-align: bottom;

  &-btn {
    font-size: 20px;
  }
  &.active {
    border-color: #111;
    .select-view {
      color: #222;
      font-weight: 400;
    }
  }
  &.disabled {
    cursor: default;
    background-color: #f7f7f7;
    pointer-events: none;
    .select-view,
    .select-btn {
      color: #999;
    }
  }
  .select-view {
    width: 80%;
    font-weight: 400;
    text-align: left;
    padding-left: 10px;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .select-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 7px;
    height: fit-content;
    margin: auto;
    transition: transform 0.3s;
    font-size: 16px;
  }
}
/* Teleport */
.select-opt-animation-guard {
  position: absolute;
  overflow: hidden;
  max-height: 0px;
  box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  z-index: 33;
  background-color: #fff;

  /* 나올때만 애니메이션 실행 */
  &.is-active {
    // transition: max-height 0.3s;
  }

  .select-opt-cover {
    background-color: #fff;
    border-radius: 8px;
    max-height: 200px;
    overflow: auto;
    .select-opt-list {
      height: inherit;

      border-radius: 8px;
      padding: 4px 4px;
      overflow: auto;
      .select-opt {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        padding: 7px 12px;
        border-radius: 8px;
        font-size: 14px;
        height: 32px;

        label {
          flex-grow: 1;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          word-break: keep-all;
        }

        &.selected {
          background-color: #f1f8ff;
          color: #197ffa !important;
          font-weight: 500;
        }

        &.disabled {
          cursor: default;
          color: #999;
          pointer-events: none;
          background-color: #f7f7f7;
        }
      }
    }
  }
}
</style>
