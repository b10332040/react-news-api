import PropTypes from 'prop-types'
import { useState, useEffect, createContext } from 'react'
import { isExisted } from '/utils'

const defaultContext = {
  pageTop: true,
  setBodyScroll: null,
  scrollLeftToCheckedRadio: null,
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

  // 處理被選到的單選按鈕自動滾到左側
  const scrollLeftToCheckedRadio = (radiosWrap, value) => {
    if (isExisted(value) && isExisted(radiosWrap)) {
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
        scrollLeftToCheckedRadio
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