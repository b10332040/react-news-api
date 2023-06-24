import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { stylesStickyBar } from '/styles'
import { BsFilter } from 'react-icons/bs'
import { TiFilter } from 'react-icons/ti'

/**
 * 黏著 bar
 * @param {object} props - 屬性
 * @param {any} props.showStickyBarRef - 顯示 bar 的區域
 * @param {node} props.children - 內容
 * @returns 
 */
const StickyBar = ({ showStickyBarRef, children }) => {
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    // 處理頁面滑動
    const handleScroll = () => {
      // 判斷要顯示 sticky bar 的區塊是否進入視窗範圍內
      if (showStickyBarRef.current !== null) {
        const { top, bottom } = showStickyBarRef.current.getBoundingClientRect()

        // 區塊頂端 (top) 座標 <= 0 - 區塊頂端已進入視窗頂端
        // 區塊底端 (bottom) 座標 > 0 - 區塊底端尚未進入或離開視窗
        if (top <= 0 && bottom > 0) {
          setShowBar(true)
        } else {
          setShowBar(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showStickyBarRef])

  return (
    <div
      className={`
        ${stylesStickyBar['sticky-bar']['self']}
        ${(showBar) ? 'top-[55px]' : '-top-[55px]'}
      `}
    >
      <div className={stylesStickyBar['sticky-bar']['container']}>
        { children }
      </div>
    </div>
  )
}
StickyBar.propTypes = {
  showStickyBarRef: PropTypes.any,
  children: PropTypes.node.isRequired
}

/**
 * 按鈕
 * @param {object} props - 屬性
 * @param {string} props.icon - icon
 * @param {string} props.title - title 屬性值
 * @param {string} props.popupId - popup ID
 * @param {bool} props.popupOpen - 是否開啟 (預設：false)
 * @param {func} props.onClick - 處理 click 事件
 * @param {string} props.className - 樣式（預設：''）
 * @returns
 */
const IconButton = ({ icon, title='', popupId, popupOpen=false, onClick, className='' }) => {
  const selfClassName = stylesStickyBar['icon-button']['self']
  const iconClassName = stylesStickyBar['icon-button']['icon']
  let Icon = <BsFilter className={iconClassName} />

  switch (icon) {
    case 'filter':
      Icon = <TiFilter className={iconClassName} />
      break
  }
  
  if (typeof popupId === 'undefined') {
    return (
      <button
        type='button'
        title={title}
        aria-label={title}
        onClick={() => {
          onClick?.()
        }}
        className={`
          ${selfClassName}
          ${className}
        `}
      >
        { Icon }
      </button>
    )
  }

  return (
    <button
      type='button'
      title={title}
      aria-label={title}
      aria-controls={popupId}
      aria-expanded={(popupOpen) ? 'true' : 'false'}
      aria-haspopup='menu'
      onClick={() => {
        onClick?.()
      }}
      className={`
        ${selfClassName}
        ${className}
      `}
    >
      { Icon }
    </button>
  )
}
IconButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  popupId: PropTypes.string,
  popupOpen: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

StickyBar.IconButton = IconButton
export default StickyBar

