/**
 * 取得總頁數
 * @param {number} totalResults - 結果總數量
 * @param {number} pageSize -一頁顯示幾筆資料
 * @returns 
 */
const getTotalPage = (totalResults, pageSize) => {
  if (totalResults / pageSize > 0 && totalResults % pageSize === 0) {
    return totalResults / pageSize
  } else {
    return Math.floor(totalResults / pageSize) + 1
  }
}

export default getTotalPage