import { ref, CSSProperties, watch } from 'vue'

/**
 *
 * @param addMargin 드롭다운과의 여백
 * @param maxHeight maxHeight px
 * @param blurEvent blur시 이벤트
 * @returns
 */
function usePositionTracker(
  addMargin: number | undefined = 0,
  maxHeight: number,
  blurEvent?: () => void
) {
  const isHidden = ref(false)
  const targetElement = ref<null | HTMLElement>(null)
  const element = ref<null | HTMLElement>(null)
  const position = ref<CSSProperties>({})

  // 드롭다운 오픈시 동작하는 함수
  const toggleHandler = async () => {
    if (!targetElement.value || !element.value) return

    // element는 애니메이션 역할 element의 자식은 실제 리스트 크기
    let limitHeight = maxHeight

    const { left, top, height } = targetElement.value.getBoundingClientRect()
    const adjustLeft = left + window.scrollX
    const adjustedTop = top + window.scrollY
    // 요소가 브라우저창에 넘치는지 여부
    const isOverflowing = window.innerHeight < top + height + limitHeight

    position.value = {
      left: `${adjustLeft}px`,
      top: isOverflowing ? 'auto' : `${adjustedTop + height + addMargin}px`,
      bottom: isOverflowing
        ? `${window.innerHeight - adjustedTop + addMargin}px`
        : 'auto',
    }
  }

  function blur(e: Event) {
    if (
      element.value &&
      e.target instanceof HTMLElement &&
      targetElement.value
    ) {
      if (
        !element.value.contains(e.target) &&
        !targetElement.value.contains(e.target) &&
        !e.target.classList.contains('item')
      ) {
        blurEvent && blurEvent()
        isHidden.value = false
      }
    }
  }

  function scrollEv() {
    toggleHandler()
  }

  function resizeEv(event: Event) {
    // 드롭다운 내부의 스크롤 이벤트인 경우 함수를 종료
    if (
      event.target instanceof HTMLElement &&
      element.value &&
      element.value.contains(event.target)
    ) {
      return
    }

    isHidden.value = false
  }

  watch(isHidden, (open) => {
    if (open) {
      document.body.addEventListener('click', blur)
      window.addEventListener('scroll', scrollEv)
      window.addEventListener('resize', resizeEv)
      window.addEventListener('scroll', resizeEv, true) // true로 캡처 모드 설정
    } else {
      document.body.removeEventListener('click', blur)
      window.removeEventListener('scroll', scrollEv)
      window.removeEventListener('resize', resizeEv)
      window.removeEventListener('scroll', resizeEv, true)
    }
  })

  return { position, targetElement, element, toggleHandler, isHidden }
}

export default usePositionTracker
