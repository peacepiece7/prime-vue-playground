export const $comma = (str: string | number) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const $toPhoneFormat = (str: string) => {
  return str
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

/**
 * totalPage를 반환하는 함수
 * @param pageSize 10 | 30 | 50 | 100
 * @param totalCount 데이터 갯수
 */
export function $totalPage(
  pageSize: number | string,
  totalCount: number | string
) {
  if (!isNaN(Number(pageSize)) && !isNaN(Number(totalCount))) {
    return Math.ceil(Number(totalCount) / Number(pageSize))
  } else {
    return 1
  }
}

export function $extractNumbers(str: string) {
  // 문자열에서 숫자만 추출하기 위한 정규 표현식 사용
  const matches = str.match(/\d+/g)

  // matches가 null이 아닌 경우, 추출된 숫자들을 합쳐서 반환
  return matches ? Number(matches.join('')) : 0
}
