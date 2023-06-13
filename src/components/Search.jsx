import PropTypes from 'prop-types'
import { CiSearch } from 'react-icons/ci'
import { stylesSearch } from '/styles'

/**
 * 搜尋框
 * @param {func} onChange 處理當值改變
 * @param {string} className 樣式（預設：''）
 * @returns 
 */
const Search = ({onChange, className=''}) => {
  return (
    <div
      className={`
        ${stylesSearch['self']}
        ${className}
      `}
    >
      <input
        type='text'
        id='search'
        placeholder='Search something...'
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
        className={stylesSearch['input']}
      />
      <CiSearch className={stylesSearch['icon']} />
    </div>
  )
}
Search.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string
}

export default Search