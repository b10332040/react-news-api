import PropTypes from 'prop-types'
import { formatNumber } from '/utils'

/**
 * 搜尋結果（文字）
 * @param {object} props - 屬性
 * @param {string} props.startWith - 從...開始（預設：'first'）
 * @param {number} props.page - 第幾頁
 * @param {number} props.pageSize - 一頁有幾筆資料
 * @param {number} props.total - 共幾筆
 * @param {number} props.className - 樣式（預設：''）
 * @returns
 */
const ResultsText = ({ startWith='first', page, pageSize, total, className=''}) => {
  if (isNaN(total)) {
    return (
      <></>
    )
  }

  let text = ''
  if (!isNaN(page) && !isNaN(pageSize)) {
    const start = (startWith === 'page' && page > 1) ? ((page - 1) * pageSize) + 1 : 1
    const end = (total > page * pageSize) ? page * pageSize : total

    if (total !== 0 && end !== 1 && start !== total) {
      text = `${formatNumber(start)} - ${formatNumber(end)} of ` 
    }
  }
  
  text += `${formatNumber(total)} results`   

  return (
    <p className={`text-[--theme-gray-400] text-sm ${className}`}>
      { text }
    </p>
  )
}
ResultsText.propTypes = {
  startWith: PropTypes.string,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number.isRequired,
  className: PropTypes.number
}

export default ResultsText