import PropTypes from 'prop-types'
import { stylesButton } from '/styles'

/**
 * 按鈕
 * @param {string} type 按鈕類型 (預設：button)
 * @param {string} display 按鈕滿版或不是滿版 (預設：inline-block)
 * @param {string} size 按鈕大小 (預設：base)
 * @param {string} styled 按鈕樣式 (預設：filled)
 * @param {bool} disabled disabled 屬性值，按鈕是否不可點擊 (預設：false)
 * @param {bool} processing 是否在處理中 (預設：false)
 * @param {func} onClick 處理 click 事件
 * @param {string} text 按鈕文字 (預設：'')
 * @param {string} className 樣式 (預設：'')
 * @returns 
 */
const Button = ({type='button', display='inline-block', size='base', styled='filled', disabled=false, processing=false, onClick, text='', className=''}) => {
  return (
    <button
      type={type}
      title={text}
      aria-label={text}
      onClick={() => {onClick?.()}}
      disabled={disabled}
      className={`
        ${className}
        ${stylesButton['self']}
        ${stylesButton[`self--${display}`]}
        ${stylesButton[`self--${size}`]}
        ${stylesButton[`self--${styled}`]}
        ${(processing) ? stylesButton['self--processing'] : stylesButton['self--done']}
      `}
    >
      { text }
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
  text: PropTypes.string,
  className: PropTypes.string
}

export default Button