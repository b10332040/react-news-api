import PropTypes from 'prop-types'
import styles from '/styles/search.styles'
import { CiSearch } from 'react-icons/ci'

/**
 * 搜尋框
 * @param {object} props - 屬性
 * @param {func} props.onChange - 處理 change 事件
 * @param {string} props.className - 樣式（預設：''）
 * @returns
 */
const Search = ({onChange, className=''}) => {
  return (
    <div
      className={`
        ${styles['self']}
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
        className={styles['input']}
        autoComplete='off'
      />
      <CiSearch className={styles['icon']} />
    </div>
  )
}
Search.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string
}

export default Search