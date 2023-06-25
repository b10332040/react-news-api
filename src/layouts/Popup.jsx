import PropTypes from 'prop-types'
import styles from '/styles/popup.styles'
import { useEffect, createContext, useContext } from 'react'
import { useApp } from '/hooks'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineLeft } from 'react-icons/ai'
import { isArrayEmpty } from '/utils'

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
 * @param {object} props - 屬性
 * @param {string} props.popupId - popup ID
 * @param {bool} props.open - 是否開啟 (預設：false)
 * @param {func} props.setOpen - 設定彈跳視窗是否關閉
 * @param {bool} props.overScreenHeight - content 高度是否可以超過螢幕高度 (預設：true)
 * @param {bool} props.dialogFullInMobile - Dialog 在手機尺寸下是否滿版 (預設：false)
 * @param {bool} props.backdropVisible - 在手機尺寸下可否看到彈跳視窗背景 (預設：false)
 * @param {bool} props.hasInnerContent - 是否有 Inner Content (預設：false)
 * @param {node} props.children - 內容
 * @returns
 */
const Popup = ({ popupId, open=false, setOpen, overScreenHeight=true, dialogFullInMobile=false, backdropVisibleInMobile=false, hasInnerContent=false, children }) => {
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
        backdropVisibleInMobile,
        hasInnerContent
      }}
    >
      <div
        id={popupId}
        className={`
          ${styles['popup']['self']}
          ${(dialogFullInMobile) ? styles['popup']['self--full-in-mobile'] : styles['popup']['self--normal-in-mobile']}
          ${(open) ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <div
          onClick={() => {
            setOpen?.(false)
          }}
          className={styles['popup']['backdrop']}
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
  hasInnerContent: PropTypes.bool,
  children: PropTypes.node
}

/**
 * dialog
 * @param {object} props - 屬性
 * @param {string} props.size - 大小 (預設：'base')
 * @param {node} props.children - 內容
 * @returns
 */
const Dialog = ({ size='base', children }) => {
  const { open, overScreenHeight, dialogFullInMobile, backdropVisibleInMobile, hasInnerContent } = usePopup()
  let animationClassName = ''
  let maxWidthClassName = ''
  let heightClassName = ''
  let contentMaxHeightClassName = ''

  if (dialogFullInMobile && backdropVisibleInMobile) {
    animationClassName = (open) ? 'translate-x-0 sm:translate-y-0' : 'translate-x-1/3 sm:translate-x-0 sm:-translate-y-1/2'
    maxWidthClassName = 'ml-auto max-w-[calc(100%-60px)]'

  } else {
    animationClassName = (open) ? 'translate-y-0' : '-translate-y-1/2'
    maxWidthClassName = 'max-w-full'
  }

  if (dialogFullInMobile) {
    contentMaxHeightClassName = (overScreenHeight) ? 'sm:max-h-none' : 'sm:max-h-[560px]'
    heightClassName = (hasInnerContent) ? 'sm:h-full' : 'sm:h-auto'

  } else {
    contentMaxHeightClassName = (overScreenHeight) ? 'max-h-none' : 'max-h-[560px]'
    heightClassName = (hasInnerContent) ? 'h-full' : 'h-auto'
  }

  return (
    <div 
      className={`
        ${styles['dialog']['self']}
        ${styles['dialog'][`self--${size}`]}
        ${(dialogFullInMobile) ? styles['dialog']['self--full-in-mobile'] : styles['dialog']['self--normal-in-mobile']}
        ${maxWidthClassName}
        ${heightClassName}
        ${animationClassName}
      `}
    >
      <div 
        className={`
          ${styles['dialog']['content']}
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
 * Content
 * @param {object} props - 屬性
 * @param {string} props.innerContentId - inner content ID
 * @param {bool} props.innerContentOpen - 次內容是否開啟 (預設：false)
 * @param {node} props.children - 內容
 * @returns 
 */
const Content = ({ innerContentId, innerContentOpen=false, children }) => {
  if (typeof innerContentId !== 'undefined') {
    return (
      <div
        id={innerContentId}
        className={`
          ${styles['content']['self']}
          ${(innerContentOpen) ? 'order-first' : ''}
        `}
      >
        { children }
      </div>
    )
  }

  return (
    <div className={styles['content']['self']}>
      { children }
    </div>
  )
}
Content.propTypes = {
  innerContentId: PropTypes.string,
  innerContentOpen: PropTypes.bool,
  children: PropTypes.node
}

/**
 * Header (Popup)
 * @param {object} props - 屬性
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
        className={styles['header']['close-button']}
      >
        <RxCross1 className={styles['header']['close-button-icon']} />
      </button>
    )
  }

  return (
    <div className={styles['header']['self']}>
      <div className={(hasCloseButton) ? 'w-[calc(100%-48px)]': 'w-full'}>
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
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const Title = ({ children }) => {
  return (
    <h2 className={styles['title']['self']}>
      { children }
    </h2>
  )
}
Title.propTypes = {
  children: PropTypes.node
}

/**
 * Body
 * @param {object} props - 屬性
 * @param {string} props.className - 樣式（預設：''）
 * @param {node} props.children - 內容
 * @returns 
 */
const Body = ({ className='', children }) => {
  return (
    <div 
      className={`
        ${styles['body']['self']}
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
 * 標題 (in body)
 * @param {object} props - 屬性
 * @param {string} props.className - 樣式（預設：''）
 * @param {node} props.children - 內容
 * @returns 
 */
const TitleInBody = ({ className='', children }) => {
  return (
    <h3 className={`
      ${styles['title-in-body']['self']}
      ${className}
    `}>
      { children }
    </h3>
  )
}
TitleInBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * 單選標籤 (in body)
 * @param {object} props - 屬性
 * @param {array} props.radios - 資料
 * @param {string} props.name - 單選 name 屬性值
 * @param {string} props.checkedValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 */
const RadioTabsInBody = ({ radios, name, checkedValue, onChange, disabled=false }) => {
  if (isArrayEmpty(radios)) {
    return <></>
  }

  const RadioTabs = radios.map((radio) => {
    return (
      <li
        key={`radio-${radio.value}`}
        className={styles['radio-tabs-in-body']['tab']}
      >
        <input 
          type='radio'
          name={name}
          value={radio.value}
          id={radio.value}
          checked={checkedValue === radio.value}
          onChange={(event) => {
            onChange?.(event.target.value)
          }}
          className={styles['radio-tabs-in-body']['radio']}
          disabled={disabled}
        />
        <label
          htmlFor={radio.value}
          className={styles['radio-tabs-in-body']['label']}
        >
          {radio.displayName}
        </label>
      </li>
    )
  })

  return (
    <ul className={styles['radio-tabs-in-body']['self']}>
      { RadioTabs }
    </ul>
  )

}
RadioTabsInBody.propTypes = {
  radios: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

/**
 * 打開按鈕（次內容）
 * @param {object} props - 屬性
 * @param {string} props.title - title 屬性值
 * @param {string} props.innerContentId - inner content ID
 * @param {bool} props.innerContentOpen - 次內容是否開啟 (預設：false)
 * @param {func} props.setInnerContentOpen - 設定次內容是否關閉
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @param {node} props.children - 內容
 * @returns 
 */
const InnerContentOpenButton = ({ title, innerContentId, innerContentOpen=false, setInnerContentOpen, disabled=false, children }) => {
  if (typeof innerContentId === 'undefined') {
    return <></>
  }

  return (
    <button
      type='button'
      title={title}
      aria-label={title}
      aria-controls={innerContentId}
      aria-expanded={(innerContentOpen) ? 'true' : 'false'}
      aria-haspopup='menu'
      onClick={() => {
        setInnerContentOpen?.(true)
      }}
      className={styles['inner-content-open-button']['self']}
      disabled={disabled}
    >
      <TitleInBody className={styles['inner-content-open-button']['title']}>
        { children }
      </TitleInBody>
    </button>
  )
}
InnerContentOpenButton.propTypes = {
  title: PropTypes.string,
  innerContentId: PropTypes.string.isRequired,
  innerContentOpen: PropTypes.bool,
  setInnerContentOpen: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node
}

/**
 * Header (inner content)
 * @param {object} props - 屬性
 * @param {bool} props.hasCloseButton - 是否有關閉 popup 的按鈕 (預設：false)
 * @param {func} props.setInnerContentOpen - 設定次內容是否關閉
 * @param {node} props.children - 內容
 * @returns 
 */
const InnerContentHeader = ({ hasCloseButton=true, setInnerContentOpen, children }) => {
  return (
    <Header hasCloseButton={hasCloseButton}>
      <button
        type='button'
        title='Prev'
        aria-label='Prev'
        onClick={() => {
          setInnerContentOpen?.(false)
        }}
        className={styles['inner-content-header']['prev-button']}
      >
        <AiOutlineLeft className={styles['inner-content-header']['prev-button-icon']} />
      </button>
      <div className={styles['inner-content-header']['children-wrap']}>
        { children }
      </div>
    </Header>
  )
}
InnerContentHeader.propTypes = {
  hasCloseButton: PropTypes.bool,
  setInnerContentOpen: PropTypes.func,
  children: PropTypes.node
}

/**
 * Footer
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const Footer = ({ children }) => {
  return (
    <div className={styles['footer']['self']}>
      { children }
    </div>
  )
}
Footer.propTypes = {
  children: PropTypes.node
}

Popup.Dialog = Dialog
Popup.Content = Content
Popup.Header = Header
Popup.Title = Title
Popup.Body = Body
Popup.TitleInBody = TitleInBody
Popup.RadioTabsInBody = RadioTabsInBody
Popup.InnerContentOpenButton = InnerContentOpenButton
Popup.InnerContentHeader = InnerContentHeader
Popup.Footer = Footer
export default Popup