/**
 * 取得總頁數
 * @param {number} totalResults - 結果總數量
 * @param {number} pageSize -一頁顯示幾筆資料
 * @returns 
 */
const getTotalPage = (totalResults, pageSize) => {
  return Math.ceil(totalResults / pageSize)
}

export default getTotalPage