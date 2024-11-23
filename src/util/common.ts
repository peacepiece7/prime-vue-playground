import * as XLSX from 'xlsx-js-style'

export function sliceArr<T>(data: T[], size: number) {
  const arr = []

  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size))
  }

  return arr
}

export const cloneDeep: <T>(data: T[]) => T[] = (data) => {
  return data.map((ele) => ({ ...ele }))
}

const changeCellformat = (arr: (string | number)[]) => {
  return arr.map((a) => {
    return {
      v: a ?? '',
      t: 's',
      s: {
        alignment: { vertical: 'center', horizontal: 'center' },
      },
    }
  })
}

export const excelDown = ({
  title,
  data,
  fileName = '',
}: {
  title: string[]
  data: any[][]
  fileName: string
}) => {
  // workbook 생성
  const wb = XLSX.utils.book_new()

  const tableHead = changeCellformat(title)

  const dataCells = data.map((ele) => changeCellformat(ele))

  const ws = XLSX.utils.aoa_to_sheet([tableHead, ...dataCells])

  // 셀넓이
  const wscols = tableHead.map(() => ({ wch: 20 }))
  ws['!cols'] = wscols

  // 셀높이
  const wsrow = data.map(() => ({ hpt: 30 }))
  wsrow.push({ hpt: 30 })
  ws['!rows'] = wsrow

  XLSX.utils.book_append_sheet(wb, ws, fileName)
  XLSX.writeFile(wb, fileName + '.xlsx')
}
