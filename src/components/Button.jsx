import PropTypes from 'prop-types'
import styles from '/styles/button.styles'

/**
 * 按鈕
 * @param {object} props - 屬性
 * @param {string} props.type - 按鈕類型 (預設：'button')
 * @param {string} props.display - 按鈕滿版或不是滿版 (預設：'inline-block')
 * @param {string} props.size - 按鈕大小 (預設：'base')
 * @param {string} props.styled - 按鈕樣式 (預設：'filled')
 * @param {bool} props.disabled - disabled 屬性值，按鈕是否不可點擊 (預設：false)
 * @param {bool} props.processing - 是否在處理中 (預設：false)
 * @param {func} props.onClick - 處理 click 事件
 * @param {string} props.title - title 屬性值 (預設：'')
 * @param {string} props.className - 樣式 (預設：'')
 * @param {node} props.children - 內容
 * @returns
 */
const Button = ({type='button', display='inline-block', size='base', styled='filled', disabled=false, processing=false, onClick, title='', className='', children}) => {
  return (
    <button
      type={type}
      title={title}
      aria-label={title}
      onClick={() => {onClick?.()}}
      disabled={disabled}
      className={`
        ${className}
        ${styles['self']}
        ${styles[`self--${display}`]}
        ${styles[`self--${size}`]}
        ${styles[`self--${styled}`]}
        ${(processing) ? styles['self--processing'] : styles['self--done']}
      `}
    >
      { children }
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
Button.propTypes = {
  type: PropTypes.string,
  display: PropTypes.string,
  size: PropTypes.string,
  styled: PropTypes.string,
  processing: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

export default Button