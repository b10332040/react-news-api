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
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可輸入 (預設：false)
 * @returns
 */
const Search = ({
  onChange,
  onBlur,
  handleEnter,
  value,
  placeholder='',
  className='',
  disabled=false
}) => {
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
        disabled={disabled}
      />
      <div className={styles['icon-wrap']}>
        <CiSearch className={styles['icon']} />
      </div>
    </div>
  )
}
Search.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  handleEnter: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

export default Search