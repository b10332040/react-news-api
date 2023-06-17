import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'

const defaultAppContext = {
  pageTop: true,
  navbarMenuOpen: false,
  setNavbarMenuOpen: null
}
const AppContext = createContext(defaultAppContext)

/**
 * 提供基本邏輯（頁面是否滑動到頂端……）
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const AppProvider = ({ children }) => {
  const [pageTop, setPageTop] = useState(true)
  const [navbarMenuOpen, setNavbarMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // 處理頁面滑動
  const handleScroll = () => {
    (window.scrollY === 0) ? setPageTop(true) : setPageTop(false)
  }

  // 當 path name 改變
  useEffect(() => {
    setNavbarMenuOpen(false)
  }, [pathname])

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
        pageTop,
        navbarMenuOpen,
        setNavbarMenuOpen
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