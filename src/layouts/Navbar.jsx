import PropTypes from 'prop-types'
import styles from '/styles/navbar.styles'
import { useState, useEffect } from 'react'
import { useApp } from '/hooks'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { srcSvgLogo } from '/assets/images'
import { CiSearch } from 'react-icons/ci'

/**
 * 頁面連結
 * @param {object} props - 屬性
 * @param {string} props.to - 連結
 * @param {string} props.title - 連結文字
 * @param {node} props.children - 內容
 * @returns 
 */
const NavbarPageNavLink = ({ to, title, children }) => {
  return (
    <li
     key={`nav-page-link-${title}`}
     className={styles['item']}
    >
      <NavLink
        to={to}
        title={title}
        aria-label={title}
        className={({ isActive }) => `
          ${styles['link']}
          ${(isActive) ? styles['link--active'] : styles['link--inactive']}
        `}
        end={(to === '/') ? true : false}
      >
        {children}
      </NavLink>
    </li>
  )
}
NavbarPageNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

/**
 * 導覽列
 * @returns
 */
const Navbar = () => {
  const [navbarMenuOpen, setNavbarMenuOpen] = useState(false)
  const [searchInputOpen, setSearchInputOpen] = useState(false)
  const { pageTop } = useApp()
  const { pathname } = useLocation()

  // 處理漢堡選單按鈕點擊
  const handleNavbarTogglerClick = () => {
    setNavbarMenuOpen(!navbarMenuOpen)
  }

  // 處理搜尋表單提交
  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  // 處理搜尋框收合
  const handleSearchInputTogglerClick = (open) => {
    setSearchInputOpen(open)
  }

  // 當 path name 改變
  useEffect(() => {
    setNavbarMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`
        ${styles['self']}
        ${(pageTop) ? styles['self--top'] : styles['self--non-top']}
      `}
    >
      <nav
        className={`
          ${styles['nav']}
          ${(pageTop) ? styles['nav--top'] : styles['nav--non-top']}
        `}
      >
        <Link
          to='/'
          title='home'
          aria-label='home'
          className={styles['logo-wrap']}
        >
          <img
           src={srcSvgLogo}
           alt="logo"
           className={styles['logo']}
          />
        </Link>

        <button
          type='button'
          title='Toggle navigation'
          aria-label='Toggle navigation'
          aria-controls='navbarMenu'
          aria-expanded={(navbarMenuOpen) ? 'true' : 'false'}
          aria-haspopup='menu'
          onClick={handleNavbarTogglerClick}
          className={styles['hamburger']}
        >
          <span
            className={`
              ${styles['hamburger-icon']}
              ${(navbarMenuOpen) ? styles['hamburger-icon--active'] : styles['hamburger-icon--inactive']}
            `}
          ></span>
        </button>
        <div
          id='navbarMenu'
          className={`
            ${styles['menu']}
            ${(navbarMenuOpen) ? styles['menu--open'] : styles['menu--close']}
          `}
        >
          <ul>
            <NavbarPageNavLink
              to='/'
              title='home'
            >
              Home
            </NavbarPageNavLink>
            <NavbarPageNavLink
              to='/world'
              title='world'
            >
              World
            </NavbarPageNavLink>
          </ul>
          <div
            className={`
              ${styles['search']}
              ${(searchInputOpen) ? styles['search--open'] : styles['search--close']}
            `}
          >
            <form onSubmit={handleSearchSubmit} className='relative'>
              <input
                type='text'
                id='search'
                placeholder='Search something...'
                onClick={() => {
                  handleSearchInputTogglerClick(true)
                }}
                className={`
                  ${styles['search-input']}
                  ${(searchInputOpen) ? styles['search-input--open'] : styles['search-input--close']}
                `}
                autoComplete='off'
              />
              <button
                type='button'
                title='Close search input'
                aria-label='Close search input'
                className={`
                  ${styles['search-close-btn']}
                  ${(searchInputOpen) ? styles['search-close-btn--show'] : styles['search-close-btn--hidden']}
                `}
                onClick={() => {
                  handleSearchInputTogglerClick(false)
                }}
              ></button>
              <CiSearch
                className={styles['search-icon']}
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar