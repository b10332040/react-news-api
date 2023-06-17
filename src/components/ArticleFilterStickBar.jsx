import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { stylesArticleFilterStickyBar } from '/styles'

/**
 * 文章黏著過濾導覽列
 * @param {object} props - 屬性
 * @param {array} props.filterList - 過濾清單（category, country, keyword）
 * @param {node} props.children - 要顯示導覽列的區塊
 * @returns 
 */
const ArticleFilterStickyBar = ({ filterList, children }) => {
  const [showBar, setShowBar] = useState(false)
  const showBarAnchorRef = useRef(null)

  // 處理頁面滑動（偵測是否經過要顯示導覽列的區塊）
  const handleScroll = () => {
    const { top, bottom } = showBarAnchorRef.current.getBoundingClientRect()

    // 區塊頂端 (top) 座標 <= 0 - 區塊頂端已進入視窗頂端
    // 區塊底端 (bottom) 座標 > 0 - 區塊底端尚未進入或離開視窗
    if (top <= 0 && bottom > 0) {
      setShowBar(true)
    } else {
      setShowBar(false)
    }
  }

  // 偵測頁面滑動
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (Array.isArray(filterList)) {


    return (
      <>
        <div
          className={`
            ${stylesArticleFilterStickyBar['self']}
            ${(showBar) ? 'top-[55px]' : '-top-full'}
          `}
        >
          { (showBar) ? '顯示導覽列' : '隱藏'}
        </div>

        <div
          ref={showBarAnchorRef}
          className='w-full'
        >
          { children }
        </div>
      </>
    )
  }

  return (
    <></>
  )
}
ArticleFilterStickyBar.propTypes = {
  filterList: PropTypes.array,
  children: PropTypes.node.isRequired,
}

export default ArticleFilterStickyBar