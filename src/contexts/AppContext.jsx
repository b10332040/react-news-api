import PropTypes from 'prop-types'
import { useState, useEffect, createContext } from 'react'
import { isExisted } from '/utils'

const defaultContext = {
  pageTop: true,
  setBodyScroll: null,
  scrollLeftToCheckedRadio: null,
  getTotalPage: null
}
const AppContext = createContext(defaultContext)

/**
 * 提供基本邏輯（頁面是否滑動到頂端……）
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const AppProvider = ({ children }) => {
  const [bodyScroll, setBodyScroll] = useState(true)
  const [pageTop, setPageTop] = useState(defaultContext.pageTop)

  /**
   * <input value = {value} ...> 自動滾到 radiosWrap 的最左側
   * @param {object} radiosWrap 
   * @param {string} value 
   */
  const scrollLeftToCheckedRadio = (radiosWrap, value) => {
    if (isExisted(value) && value !== '' && isExisted(radiosWrap.current)) {
      const selectedRadio = radiosWrap.current.querySelector(`input[value="${value}"]`)
      let radiosWrapLeft = 0
      let radiosWrapScrollLeft = 0
      let checkRadioLeft = 0
      if (selectedRadio) {
        radiosWrapLeft = radiosWrap.current.getBoundingClientRect().left
        radiosWrapScrollLeft = radiosWrap.current.scrollLeft 
        checkRadioLeft = selectedRadio.getBoundingClientRect().left
      }

      // 選到的單選按鈕相對於整個頁面左側的偏移量 - 容器相對於整個頁面左側的偏移量 + 容器橫向滾動位置
      // console.log(`checkRadioLeft(${checkRadioLeft}) - radiosWrapLeft(${radiosWrapLeft}) + radiosWrapScrollLeft(${radiosWrapScrollLeft}) = ${checkRadioLeft - radiosWrapLeft + radiosWrapScrollLeft}`)
      
      radiosWrap.current.scrollTo({
        left: checkRadioLeft - radiosWrapLeft + radiosWrapScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  /**
   * 取得總頁數
   * @param {number} totalResults - 結果總數量
   * @param {number} pageSize -一頁顯示幾筆資料
   * @returns 
   */
  const getTotalPage = (totalResults, pageSize) => {
    if (totalResults / pageSize > 0 && totalResults % pageSize === 0) {
      return totalResults / pageSize
    } else {
      return Math.floor(totalResults / pageSize) + 1
    }
  }

  // 處理頁面滑動
  const handleScroll = () => {
    // 是否滾到頁面頂端
    (window.scrollY === 0) ? setPageTop(true) : setPageTop(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (bodyScroll) {
      document.body.classList.remove('overflow-y-hidden')
    } else {
      document.body.classList.add('overflow-y-hidden')
    }
  }, [bodyScroll])

  return (
    <AppContext.Provider
      value={{
        pageTop,
        setBodyScroll,
        scrollLeftToCheckedRadio,
        getTotalPage
      }}
    >
      { children }
    </AppContext.Provider>
  )
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  AppContext,
  AppProvider
}