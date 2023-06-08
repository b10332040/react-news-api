import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import { createContext } from "react"

const defaultAppContext = {
  pageTop: true
}
const AppContext = createContext(defaultAppContext)

/**
 * 提供基本邏輯（頁面是否滑動到頂端……）
 * @param {node} children - 內容
 * @returns 
 */
const AppProvider = ({ children }) => {
  const [pageTop, setPageTop] = useState(true)

  // 處理頁面滑動
  const handleScroll = () => {
    (window.pageYOffset === 0) ? setPageTop(true) : setPageTop(false)
  }

  // 偵測頁面滑動
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        pageTop
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