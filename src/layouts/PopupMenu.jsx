import PropTypes from 'prop-types'
import { BsFilter } from 'react-icons/bs'
import { TiFilter } from 'react-icons/ti'
import { useEffect } from 'react'
import { useApp } from '/hooks'
import { stylesPopupMenu } from '/styles'

/**
 * 彈跳視窗選單
 * @param {object} props props - 屬性
 * @param {bool} props.open - 是否開啟 (預設：false)
 * @param {bool} props.backdropVisible - 在手機尺寸下可否看到彈跳視窗背景 (預設：true)
 * @param {string} props.menuId - menu ID
 * @param {func} props.setOpen - 設定是否開啟
 * @returns
 */
const PopupMenu = ({ open=false, menuId, backdropVisible=true, setOpen, children }) => {
  const { setBodyScroll } = useApp()

  useEffect(() => {
    setBodyScroll(!open)
  }, [open, setBodyScroll])
  
  return (
    <>
      <div
        id={menuId}
        className={`
          ${stylesPopupMenu['popup-menu']['self']}
          ${(open) ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <div
          onClick={() => {
            setOpen?.(false)
          }}
          className={stylesPopupMenu['popup-menu']['backdrop']}
        ></div>

        <div 
          className={`
            ${stylesPopupMenu['popup-menu']['dialog']}
            ${(backdropVisible) ? 'w-[calc(100%-60px)]' : 'w-full'}
            ${(open) ? 'translate-x-0 sm:translate-y-0' : 'translate-x-1/3 sm:translate-x-0 sm:-translate-y-1/2'}
          `}
        >
          <div className={stylesPopupMenu['popup-menu']['content']}>
            { children }
          </div>
        </div>
      </div>
    </>
  )
}
PopupMenu.propTypes = {
  open: PropTypes.bool,
  menuId: PropTypes.string.isRequired,
  backdropVisible: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.node
}

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
const OpenButton = ({ title='', icon, menuId, open=false, setOpen, className }) => {
  const IconClassName = stylesPopupMenu['open-button']['icon']
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
        ${stylesPopupMenu['open-button']['self']}
        ${className}
      `}
    >
      { Icon }
    </button>
  )
}
OpenButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  className: PropTypes.string
}

PopupMenu.OpenButton = OpenButton
export default PopupMenu

