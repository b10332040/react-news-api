/**
 * 判斷傳進來的東西是否已存在
 * @param {any} checked 
 * @returns 
 */
const isExisted = (checkedParam) => {
  return (typeof checkedParam !== 'undefined') ? true : false
}

export default isExisted