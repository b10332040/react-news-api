import PropTypes from 'prop-types'
import { useApp } from '/hooks'
import { useEffect } from 'react'
import { stylesPopupMenu } from '/styles'

/**
 * 彈跳視窗選單
 * @param {object} props props - 屬性
 * @param {bool} props.open - 是否開啟 (預設：false)
 * @param {string} props.menuId - menu ID
 * @param {func} props.setOpen - 設定是否開啟
 * @returns
 */
const PopupMenu = ({ open=false, menuId, setOpen, children }) => {
  const { setBodyScroll } = useApp()

  useEffect(() => {
    setBodyScroll(!open)
  }, [open, setBodyScroll])

  if (!open) {
    return <></>
  }
  
  return (
    <>
      <div
        id={menuId}
        className={`
          ${stylesPopupMenu['self']}
          ${(open) ? stylesPopupMenu['self--open'] : stylesPopupMenu['self--hide']}
        `}
      >

        <div className={stylesPopupMenu['content']}>
          { children }
        </div>
      </div>
      <div
        onClick={() => {
          setOpen?.(false)
        }}
        className={stylesPopupMenu['backdrop']}
      ></div>
    </>
  )
}
PopupMenu.propTypes = {
  open: PropTypes.bool,
  menuId: PropTypes.string.isRequired,
  setOpen: PropTypes.func,
  children: PropTypes.node
}

export default PopupMenu

