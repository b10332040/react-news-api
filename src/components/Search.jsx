import PropTypes from 'prop-types'
import styles from '/styles/search.styles'
import { CiSearch } from 'react-icons/ci'

/**
 * 搜尋框
 * @param {object} props - 屬性
 * @param {func} props.onChange - 處理 change 事件
 * @param {func} props.onBlur - 處理 blur 事件
 * @param {func} props.handleEnter - 處理按下 Enter
 * @param {string} props.value - 值
 * @param {string} props.placeholder - 提示文字（預設：''）
 * @param {string} props.className - 樣式（預設：''）
 * @returns
 */
const Search = ({onChange, onBlur, handleEnter, value, placeholder='', className=''}) => {
  return (
    <div
      className={`
        ${styles['self']}
        ${className}
      `}
    >
      <input
        type='text'
        placeholder={(placeholder !== '') ? placeholder : 'Search something...'}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleEnter?.(event.target.value);
          }
        }}
        onBlur={() => {
          onBlur?.()
        }}
        value={value}
        className={styles['input']}
        autoComplete='off'
      />
      <CiSearch className={styles['icon']} />
    </div>
  )
}
Search.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleEnter: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string
}

export default Search