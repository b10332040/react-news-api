import PropTypes from 'prop-types'
import { useEffect, createContext, useContext } from 'react'
import { useApp } from '/hooks'
import { stylesPopup } from '/styles'
import { RxCross1 } from 'react-icons/rx'

const defaultContext = {
  open: false,
  setOpen: null,
  overScreenHeight: true,
  dialogFullInMobile: false,
  backdropVisibleInMobile: false
}
const PopupContext = createContext(defaultContext)
const usePopup = () => useContext(PopupContext)

/**
 * 彈跳視窗
 * @param {object} props props - 屬性
 * @param {string} props.popupId - popup ID
 * @param {bool} props.open - 是否開啟 (預設：false)
 * @param {func} props.setOpen - 設定彈跳視窗是否關閉
 * @param {bool} props.overScreenHeight - content 高度是否可以超過螢幕高度 (預設：true)
 * @param {bool} props.dialogFullInMobile - Dialog 在手機尺寸下是否滿版 (預設：false)
 * @param {bool} props.backdropVisible - 在手機尺寸下可否看到彈跳視窗背景 (預設：false)
 * @param {node} props.children - 內容
 * @returns
 */
const Popup = ({ popupId, open=false, setOpen, overScreenHeight=true, dialogFullInMobile=false, backdropVisibleInMobile=false, children }) => {
  const { setBodyScroll } = useApp()

  useEffect(() => {
    setBodyScroll(!open)
  }, [open, setBodyScroll])

  return (
    <PopupContext.Provider
      value={{
        open,
        setOpen,
        overScreenHeight,
        dialogFullInMobile,
        backdropVisibleInMobile
      }}
    >
      <div
        id={popupId}
        className={`
          ${stylesPopup['popup']['self']}
          ${(dialogFullInMobile) ? stylesPopup['popup']['self--full-in-mobile'] : stylesPopup['popup']['self--normal-in-mobile']}
          ${(open) ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <div
          onClick={() => {
            setOpen?.(false)
          }}
          className={stylesPopup['popup']['backdrop']}
        ></div>

        { children }
      </div>
    </PopupContext.Provider>
  )
}
Popup.propTypes = {
  popupId: PropTypes.string.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  overScreenHeight: PropTypes.bool,
  dialogFullInMobile: PropTypes.bool,
  backdropVisibleInMobile: PropTypes.bool,
  children: PropTypes.node
}

/**
 * dialog
 * @param {object} props props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const Dialog = ({ size='base', children }) => {
  const { open, overScreenHeight, dialogFullInMobile, backdropVisibleInMobile } = usePopup()
  let animationClassName = ''
  let maxWidthClassName = ''
  let contentMaxHeightClassName = ''

  if (dialogFullInMobile && backdropVisibleInMobile) {
    animationClassName = (open) ? 'translate-x-0 sm:translate-y-0' : 'translate-x-1/3 sm:translate-x-0 sm:-translate-y-1/2'
    maxWidthClassName = 'ml-auto max-w-[calc(100%-60px)]'

  } else {
    animationClassName = (open) ? 'translate-y-0' : '-translate-y-1/2'
    maxWidthClassName = 'max-w-full'
  }

  if (dialogFullInMobile) {
    contentMaxHeightClassName = (overScreenHeight) ? 'sm:max-h-none' : 'sm:max-h-[calc(100vh-5rem)]'

  } else {
    contentMaxHeightClassName = (overScreenHeight) ? 'max-h-none' : 'max-h-[calc(100vh-5rem)]'
  }

  return (
    <div 
      className={`
        ${stylesPopup['dialog']['self']}
        ${stylesPopup['dialog'][`self--${size}`]}
        ${(dialogFullInMobile) ? stylesPopup['dialog']['self--full-in-mobile'] : stylesPopup['dialog']['self--normal-in-mobile']}
        ${maxWidthClassName}
        ${animationClassName}
      `}
    >
      <div 
        className={`
          ${stylesPopup['dialog']['content']}
          ${(dialogFullInMobile) ? 'sm:rounded-md' : 'rounded-md'}
          ${contentMaxHeightClassName}
        `}
      >
        { children }
      </div>
    </div>
  )
}
Dialog.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node
}

/**
 * Header (Popup)
 * @param {object} props props - 屬性
 * @param {bool} props.hasCloseButton - 是否有關閉 popup 的按鈕 (預設：false)
 * @param {node} props.children - 內容
 * @returns 
 */
const Header = ({ hasCloseButton=true, children }) => {
  const { setOpen } = usePopup()
  let CloseButton = <></>

  if (hasCloseButton) {
    CloseButton = (
      <button
        type='button'
        title='Close'
        aria-label='Close'
        onClick={() => {
          setOpen?.(false)
        }}
        className={stylesPopup['header']['close-button']}
      >
        <RxCross1 className={stylesPopup['header']['close-button-icon']} />
      </button>
    )
  }

  return (
    <div 
      className={stylesPopup['header']['self']}
    >
      <div>
        { children }
      </div>
      { CloseButton }
    </div>
  )
}
Header.propTypes = {
  hasCloseButton: PropTypes.bool,
  children: PropTypes.node
}

/**
 * 標題
 * @param {object} props props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const Title = ({ children }) => {
  return (
    <h2 className={stylesPopup['title']['self']}>
      { children }
    </h2>
  )
}
Title.propTypes = {
  children: PropTypes.node
}

/**
 * Body
 * @param {object} props props - 屬性
 * @param {string} props.className - 樣式
 * @param {node} props.children - 內容
 * @returns 
 */
const Body = ({ className='', children }) => {
  return (
    <div 
      className={`
        ${stylesPopup['body']['self']}
        ${className}
      `}
    >
      { children }
    </div>
  )
}
Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * Footer
 * @param {object} props props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const Footer = ({ children }) => {
  return (
    <div className={stylesPopup['footer']['self']}>
      { children }
    </div>
  )
}
Footer.propTypes = {
  children: PropTypes.node
}

Popup.Dialog = Dialog
Popup.Header = Header
Popup.Title = Title
Popup.Body = Body
Popup.Footer = Footer
export default Popup