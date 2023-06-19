import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { stylesStickyBar } from '/styles'

/**
 * 黏著 bar
 * @param {object} props props - 屬性
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
        ${stylesStickyBar['self']}
        ${(showBar) ? 'top-[55px]' : '-top-[55px]'}
      `}
    >
      <div className={stylesStickyBar['children-wrap']}>
        { children }
      </div>
    </div>
  )
}
StickyBar.propTypes = {
  showStickyBarRef: PropTypes.any,
  children: PropTypes.node.isRequired
}

export default StickyBar

