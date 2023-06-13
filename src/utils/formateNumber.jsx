/**
 * 格式化數字（K, M, B, T）
 * @param {*} num 數字 
 * @param {number} precision 取小數點末幾位（預設：1）  
 * @returns 
 */
const formatNumber = (num, precision=1) => {
  num = Number(num)

  if (isNaN(num)) {
    return ''
  }

  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 }
  ]

  const found = map.find((x) => Math.abs(num) >= x.threshold)

  if (found) {
    let floatNum = num / found.threshold

    floatNum = (floatNum % 1 === 0) ? floatNum : floatNum.toFixed(precision)

    const formatted = floatNum.toString() + found.suffix
    return formatted
  }

  return num
}

export default formatNumber