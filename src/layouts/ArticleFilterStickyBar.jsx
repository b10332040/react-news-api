import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { stylesArticleFilterStickyBar } from '/styles'
import { ResultsText } from '/components'
import { categories, world } from '/data'
import { HiFilter } from 'react-icons/hi'

/**
 * 文章黏著過濾導覽列
 * @param {object} props - 屬性
 * @param {number} props.page - 第幾頁
 * @param {number} props.pageSize - 一頁有幾筆資料
 * @param {number} props.total - 共幾筆
 * @param {func} props.onCategoryChange - 處理當類型改變
 * @param {func} props.onCountryChange - 處理當國家改變
 * @param {func} props.onKeywordChange - 處理當關鍵字改變
 * @param {node} props.children - 要顯示導覽列的區塊
 * @returns 
 */
const ArticleFilterStickyBar = ({ page, pageSize, total, onCategoryChange, onCountryChange, onKeywordChange , children }) => {
  const [showBar, setShowBar] = useState(false)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
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

  return (
    <>
      <div
        className={`
          ${stylesArticleFilterStickyBar['self']}
          ${(showBar) ? 'top-[55px]' : '-top-full'}
        `}
      >
        <div className={stylesArticleFilterStickyBar['container']}>
          <ResultsText
            page={page}
            pageSize={pageSize}
            total={total}
          />
          <button
            type='button'
            title='Toggle filter navigation'
            aria-label='Toggle filter navigation'
            aria-controls='articleFilterMenu'
            aria-expanded={(filterMenuOpen) ? 'true' : 'false'}
            aria-haspopup='menu'
            onClick={() => {
              setFilterMenuOpen(true)
            }}
            className={stylesArticleFilterStickyBar['open-button']}
          >
            <HiFilter />
          </button>
        </div>
      </div>

      <div
        id='articleFilterMenu'
        className={`
          ${stylesArticleFilterStickyBar['menu']}
          ${(filterMenuOpen) ? stylesArticleFilterStickyBar['menu--open'] : stylesArticleFilterStickyBar['menu--close']}
        `}
      >
        
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
ArticleFilterStickyBar.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number.isRequired,
  onCategoryChange: PropTypes.func,
  onCountryChange: PropTypes.func,
  onKeywordChange: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default ArticleFilterStickyBar