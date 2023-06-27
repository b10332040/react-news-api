import PropTypes from 'prop-types'
import { useState, useEffect, createContext } from 'react'
import { isExisted } from '/utils'

const defaultContext = {
  pageTop: true,
  setBodyScroll: null,
  scrollToCheckedRadio: null,
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
   * <input value = {value} ...> 該選項在容器中自動滾到指定方向
   * @param {string} value 
   * @param {object} props - 屬性
   * @param {object} radiosWrap - 有滾動卷軸的容器
   * @param {string} props.value - 值
   */
  const scrollToCheckedRadio = ({ direction='left' , radiosWrap, value }) => {
    if (isExisted(value) && value !== '' && isExisted(radiosWrap.current)) {
      const selectedRadio = radiosWrap.current.querySelector(`input[value="${value}"]`)
      let radiosWrapDirection = 0
      let radiosWrapScrollDirection = 0
      let checkRadioDirection = 0

      if (direction === 'top') {
        if (selectedRadio) {
          radiosWrapDirection = radiosWrap.current.getBoundingClientRect().top
          radiosWrapScrollDirection = radiosWrap.current.scrollTop
          checkRadioDirection = selectedRadio.getBoundingClientRect().top
        }
        radiosWrap.current.scrollTo({
          top: checkRadioDirection - radiosWrapDirection + radiosWrapScrollDirection,
          behavior: 'smooth'
        })

      } else {
        if (selectedRadio) {
          radiosWrapDirection = radiosWrap.current.getBoundingClientRect().left
          radiosWrapScrollDirection = radiosWrap.current.scrollLeft
          checkRadioDirection = selectedRadio.getBoundingClientRect().left
        }
        radiosWrap.current.scrollTo({
          left: checkRadioDirection - radiosWrapDirection + radiosWrapScrollDirection,
          behavior: 'smooth'
        })
      }

      // 選到的單選按鈕相對於整個頁面指定方向的偏移量 - 容器相對於整個頁面指定方向的偏移量 + 容器指定方向滾動位置
      // console.log(`checkRadioDirection(${checkRadioDirection}) - radiosWrapDirection(${radiosWrapDirection}) + radiosWrapScrollDirection(${radiosWrapScrollDirection}) = ${checkRadioDirection - radiosWrapDirection + radiosWrapScrollDirection}`)
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
        scrollToCheckedRadio,
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