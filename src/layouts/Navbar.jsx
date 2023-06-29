import PropTypes from 'prop-types'
import styles from '/styles/navbar.styles'
import { useState, useEffect, useRef } from 'react'
import { useApp, useNews } from '/hooks'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { srcSvgLogo } from '/assets/images'
import { CiSearch } from 'react-icons/ci'
import { FormArea } from '/components'

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
  const [keyword, setKeyword] = useState('')
  const { keywordMaxLength } = useNews()
  const { pageTop } = useApp()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  // 當 path name 改變
  useEffect(() => {
    setNavbarMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  // 處理漢堡選單按鈕點擊
  const handleNavbarTogglerClick = () => {
    setNavbarMenuOpen(!navbarMenuOpen)
  }

  // 處理搜尋框 change 事件，處理第一個字不能為空白
  const handleSearchChange = (inputValue) => {
    const trimmedValue = inputValue.trimStart()

    // 不能超過限制字元數量
    if (encodeURI(trimmedValue).length <= keywordMaxLength) {
      setKeyword(trimmedValue)
    }
    
    if (inputValue === '') {
      setKeyword(inputValue)
    }
  }

  // 處理當搜尋框按下 Enter
  const handleSearchEnter = (inputValue) => {
    const trimmedValue = inputValue.trim()
    setKeyword(trimmedValue)

    // 轉到 result 頁面，並傳送 encodeURI 後的 trimmed value
    if (trimmedValue !== '') {
      navigate(`/search/${encodeURI(trimmedValue)}`)
    }
  }

  // 處理搜尋框 blur 事件，keyword 要去掉前後空白
  const handleSearchBlur = () => {
    setKeyword(keyword.trim())
  }

  // 當點擊非 search bar 的地方，收起 drop down
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchInputOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [])

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
              to='/country'
              title='world'
            >
              World
            </NavbarPageNavLink>
          </ul>
          <div
            ref={searchRef}
            className={`
              ${styles['search']}
              ${(searchInputOpen) ? styles['search--open'] : styles['search--close']}
            `}
          >
            <FormArea className='relative'>
              <input
                type='text'
                placeholder={`Max length: ${keywordMaxLength} chars`}
                value={keyword}
                className={`
                  ${styles['search-input']}
                  ${(searchInputOpen) ? styles['search-input--open'] : styles['search-input--close']}
                `}
                autoComplete='off'
                onClick={() => {
                  setSearchInputOpen(true)
                }}
                onChange={(event) => {
                  handleSearchChange(event.target.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearchEnter(event.target.value);
                  }
                }}
                onBlur={() => {
                  handleSearchBlur()
                }}
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
                  setSearchInputOpen(false)
                }}
              ></button>
              <CiSearch
                className={styles['search-icon']}
              />
            </FormArea>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar