/**
 * 隨機數字
 * @param {num} maxNum 最大整數 
 * @param {boolean} includeZero 是否包含 0（預設：true）
 * @returns 
 */
const getRandomNum = (maxNum, includeZero=true) => {
  if (isNaN(maxNum)) {
    return 0
  }

  if (includeZero) {
    return Math.floor(Math.random() * (maxNum + 1))
  }
  
  return Math.floor(Math.random() * maxNum) + 1
}

export default getRandomNum