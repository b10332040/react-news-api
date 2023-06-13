import PropTypes from 'prop-types'
import { formatNumber } from '/utils'

/**
 * 搜尋結果（文字）
 * @param {string} start 第幾筆資料（起始）
 * @param {string} end 第幾筆資料（結束）
 * @param {string} total 共幾筆
 * @param {string} className 樣式（預設：''）
 * @returns 
 */
const ResultsText = ({ start, end ,total, className=''}) => {
  let text = ''

  if (typeof total !== 'undefined') {
    
    if (typeof start !== 'undefined' && typeof end !== 'undefined') {
      text = `${formatNumber(start)} - ${formatNumber(end)} over ` 
    }
    text += `${formatNumber(total)} results`

    return (
      <p className={`text-[--theme-gray-400] text-sm ${className}`}>
        { text }
      </p>
    )
  }

  return (
    <></>
  )
}
ResultsText.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  total: PropTypes.string,
  className: PropTypes.string
}

export default ResultsText