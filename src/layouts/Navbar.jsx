import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useApp } from '/hooks'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { stylesNavbar } from '/styles'
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
     className={stylesNavbar['item']}
    >
      <NavLink
        to={to}
        title={title}
        aria-label={title}
        className={({ isActive }) => `
          ${stylesNavbar['link']}
          ${(isActive) ? stylesNavbar['link--active'] : stylesNavbar['link--inactive']}
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
        ${stylesNavbar['self']}
        ${(pageTop) ? stylesNavbar['self--top'] : stylesNavbar['self--non-top']}
      `}
    >
      <nav
        className={`
          ${stylesNavbar['nav']}
          ${(pageTop) ? stylesNavbar['nav--top'] : stylesNavbar['nav--non-top']}
        `}
      >
        <Link
          to='/'
          title='home'
          aria-label='home'
          className={stylesNavbar['logo-wrap']}
        >
          <img
           src={srcSvgLogo}
           alt="logo"
           className={stylesNavbar['logo']}
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
          className={stylesNavbar['hamburger']}
        >
          <span
            className={`
              ${stylesNavbar['hamburger-icon']}
              ${(navbarMenuOpen) ? stylesNavbar['hamburger-icon--active'] : stylesNavbar['hamburger-icon--inactive']}
            `}
          ></span>
        </button>
        <div
          id='navbarMenu'
          className={`
            ${stylesNavbar['menu']}
            ${(navbarMenuOpen) ? stylesNavbar['menu--open'] : stylesNavbar['menu--close']}
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
              ${stylesNavbar['search']}
              ${(searchInputOpen) ? stylesNavbar['search--open'] : stylesNavbar['search--close']}
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
                  ${stylesNavbar['search-input']}
                  ${(searchInputOpen) ? stylesNavbar['search-input--open'] : stylesNavbar['search-input--close']}
                `}
                autoComplete='off'
              />
              <button
                type='button'
                title='Close search input'
                aria-label='Close search input'
                className={`
                  ${stylesNavbar['search-close-btn']}
                  ${(searchInputOpen) ? stylesNavbar['search-close-btn--show'] : stylesNavbar['search-close-btn--hidden']}
                `}
                onClick={() => {
                  handleSearchInputTogglerClick(false)
                }}
              ></button>
              <CiSearch
                className={stylesNavbar['search-icon']}
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar