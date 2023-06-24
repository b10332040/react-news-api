/**
 * 檢查陣列是否空的
 * @param {array} arr - 陣列 
 * @returns 
 */
const isArrayEmpty = (arr) => {
  return (!Array.isArray(arr) || arr.length === 0) ? true : false
}

export default isArrayEmpty