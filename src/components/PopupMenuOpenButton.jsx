import PropTypes from 'prop-types'
import { BsFilter } from 'react-icons/bs'
import { TiFilter } from 'react-icons/ti'
import { stylesPopupMenuOpenButton } from '/styles'

/**
 * 彈跳 menu 開啟按鈕
 * @param {object} props - 屬性
 * @param {string} props.title - title 屬性值 (預設：'')
 * @param {string} props.icon - icon
 * @param {string} props.menuId - menu ID
 * @param {bool} props.open - menu 是否開啟 (預設：false)
 * @param {func} props.setOpen - 設定 menu 是否開啟
 * @param {string} props.className - 樣式
 */
const PopupMenuOpenButton = ({ title='', icon, menuId, open=false, setOpen, className }) => {
  const IconClassName = stylesPopupMenuOpenButton['icon']
  let Icon = <BsFilter className={IconClassName} />

  switch (icon) {
    case 'filter':
      Icon = <TiFilter className={IconClassName} />
      break
  }
  
  return (
    <button
      type='button'
      title={title}
      aria-label={title}
      aria-controls={menuId}
      aria-expanded={(open) ? 'true' : 'false'}
      aria-haspopup='menu'
      onClick={() => {
        setOpen?.(true)
      }}
      className={`
        ${stylesPopupMenuOpenButton['self']}
        ${className}
      `}
    >
      { Icon }
    </button>
  )
}
PopupMenuOpenButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  className: PropTypes.string
}

export default PopupMenuOpenButton