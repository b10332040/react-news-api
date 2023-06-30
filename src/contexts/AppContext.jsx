import PropTypes from 'prop-types'
import { useState, useEffect, createContext } from 'react'

const defaultContext = {
  pageTop: true,
  setBodyScroll: null
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
        setBodyScroll
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
  AppProvider,
}