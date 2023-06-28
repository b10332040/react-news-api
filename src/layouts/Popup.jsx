import PropTypes from 'prop-types'
import styles from '/styles/popup.styles'
import { useEffect, createContext, useContext } from 'react'
import { useApp } from '/hooks'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineLeft } from 'react-icons/ai'
import { isArrayEmpty, isExisted } from '/utils'

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
  const { open, overScreenHeight, dialogFullInMobile, backdropVisibleInMobile } = usePopup()
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

  } else {
    contentMaxHeightClassName = (overScreenHeight) ? 'max-h-none' : 'max-h-[560px]'
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
  if (isExisted(innerContentId)) {
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
 * @param {bool} props.hasCloseButton - 是否有關閉 popup 按鈕 (預設：true)
 * @param {bool} props.hasLeftArrowButton - 是否有回上一層內容按鈕 (預設：false)
 * @param {bool} props.onLeftArrowButtonClick - 處理回上一層內容按鈕 click 事件 
 * @param {node} props.children - 內容
 * @returns 
 */
const Header = ({ hasCloseButton=true, hasLeftArrowButton=false, onLeftArrowButtonClick, children }) => {
  const { setOpen } = usePopup()
  let childrenWrapWidthClassName = 'w-full'
  let selfPaddingCLassName = ''

  if (hasCloseButton && hasLeftArrowButton) {
    childrenWrapWidthClassName = 'w-[calc(100%-96px)]'
  } else if (hasCloseButton || hasLeftArrowButton) {
    childrenWrapWidthClassName = 'w-[calc(100%-48px)]'
  }

  if (!hasCloseButton && !hasLeftArrowButton) {
    selfPaddingCLassName = 'px-3'
  } else if (!hasLeftArrowButton) {
    selfPaddingCLassName = 'pl-3'
  } else if (!hasCloseButton) {
    selfPaddingCLassName = 'pr-3'
  }

  return (
    <div
      className={`
        ${styles['header']['self']}
        ${selfPaddingCLassName}
      `}
    >
      {
        (hasLeftArrowButton) &&
        <button
          type='button'
          title='Prev'
          aria-label='Prev'
          onClick={() => {
            onLeftArrowButtonClick?.()
          }}
          className={styles['header']['close-button']}
        >
          <AiOutlineLeft className={styles['header']['close-button-icon']} />
        </button>
      }
      <div className={childrenWrapWidthClassName}>
        { children }
      </div>
      { 
        (hasCloseButton) &&
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
      }
    </div>
  )
}
Header.propTypes = {
  hasCloseButton: PropTypes.bool,
  hasLeftArrowButton: PropTypes.bool,
  onLeftArrowButtonClick: PropTypes.func,
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
 * @param {object} props.selfRef - ref
 * @param {string} props.className - 樣式（預設：''）
 * @param {node} props.children - 內容
 * @returns 
 */
const Body = ({ selfRef, className='', children }) => {
  return (
    <div
      ref={selfRef}
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
  selfRef: PropTypes.object,
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
 * 多個單選標籤外層 (in body)
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const RadioTabsInBody = ({ children }) => {
  return (
    <ul className={styles['radio-tabs-in-body']['self']}>
      { children }
    </ul>
  )
}
RadioTabsInBody.propTypes = {
  children: PropTypes.node
}

/**
 * 單選標籤 (in body)
 * @param {object} props - 屬性
 * @param {string} props.name - name 屬性值
 * @param {object} props.radio - 資料
 * @param {string} props.checkedValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @returns
 */
const RadioTabInBody = ({ name, radio, checkedValue, onChange, disabled=false }) => {
  if (!isExisted(name) && !isExisted(radio.value) && !isExisted(radio.displayName)) {
    return <></>
  }

  return (
    <li className={styles['radio-tab-in-body']['self']}>
      <input 
        type='radio'
        name={name}
        value={radio.value}
        id={radio.value}
        checked={checkedValue === radio.value}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
        className={styles['radio-tab-in-body']['radio']}
        disabled={disabled}
      />
      <label
        htmlFor={radio.value}
        className={styles['radio-tab-in-body']['label']}
      >
        {radio.displayName}
      </label>
    </li>
  )
}
RadioTabInBody.propTypes = {
  name: PropTypes.string.isRequired,
  radio: PropTypes.object.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

/**
 * 單選列表 (in body)
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 */
const RadioListInBody = ({ children }) => {
  return (
    <ul className={styles['radio-list-in-body']['self']}>
      { children }
    </ul>
  )
}
RadioListInBody.propTypes = {
  children: PropTypes.node
}

/**
 * 單選項目 (in body)
 * @param {object} props - 屬性
 * @param {string} props.name - name 屬性值
 * @param {object} props.radio - 資料
 * @param {string} props.checkedValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @returns
 */
const RadioItemInBody = ({ name, radio, checkedValue, onChange, disabled=false }) => {
  if (!isExisted(name) && !isExisted(radio.value) && !isExisted(radio.displayName)) {
    return <></>
  }

  return (
    <li className={styles['radio-item-in-body']['self']}>
      <input 
        type='radio'
        name={name}
        value={radio.value}
        id={radio.value}
        checked={checkedValue === radio.value}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
        className={styles['radio-item-in-body']['radio']}
        disabled={disabled}
      />
      <label
        htmlFor={radio.value}
        className={styles['radio-item-in-body']['label']}
      >
        {radio.displayName}
      </label>
    </li>
  )
}
RadioItemInBody.propTypes = {
  name: PropTypes.string.isRequired,
  radio: PropTypes.object.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

/**
 * 換其他內容按鈕
 * @param {object} props - 屬性
 * @param {string} props.title - title 屬性值
 * @param {string} props.note - 備註
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @param {func} props.onClick - 處理 click 事件
 * @param {node} props.children - 內容
 * @returns 
 */
const ChangeContentButtonInBody = ({ title, note, disabled=false, onClick, children }) => {

  return (
    <button
      type='button'
      title={title}
      aria-label={title}
      onClick={() => {
        onClick?.()
      }}
      className={styles['change-content-button']['self']}
      disabled={disabled}
    >
      <div className={styles['change-content-button']['children-wrap']}>
        <TitleInBody>
          { children }
        </TitleInBody>
        <span className={styles['change-content-button']['note']}>
          { note }
        </span>
      </div>
    </button>
  )
}
ChangeContentButtonInBody.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
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
Popup.RadioTabInBody = RadioTabInBody
Popup.RadioListInBody = RadioListInBody
Popup.RadioItemInBody = RadioItemInBody
Popup.ChangeContentButtonInBody = ChangeContentButtonInBody
Popup.Footer = Footer
export default Popup