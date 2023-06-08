import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { stylesFooter } from 'styles'
import mainLogo from 'images/logo.svg'
import { AiFillBehanceCircle, AiFillGithub, AiOutlineLink, AiTwotoneMail } from 'react-icons/ai'

/**
 * 頁面連結
 * @param {string} to - 連結
 * @param {string} title - 連結文字
 * @param {node} children - 內容
 * @returns 
 */
const FooterPageNavLink = ({ to, title, children }) => {
  return (
    <li
      key={`footer-page-link-${title}`}
      className={stylesFooter['link-list-item']}
    >
      <NavLink
        to={to}
        title={title}
        aria-label={title}
        className={({ isActive }) => `
          ${stylesFooter['link']}
          ${(isActive) ? stylesFooter['link--active'] : stylesFooter['link--inactive']}
        `}
        end={(to === '/') ? true : false}
      >
        {children}
      </NavLink>
    </li>
  )
}
FooterPageNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

/**
 * 聯絡連結
 * @param {string} to - 連結
 * @param {string} title - 連結文字
 * @param {string} icon - Icon
 * @param {node} children - 內容
 * @returns 
 */
const FooterContactLink = ({ to, title, icon='', children }) => {
  let Icon = <AiOutlineLink />

  switch (icon) {
    case 'behance':
      Icon = <AiFillBehanceCircle />
      break

    case 'github':
      Icon = <AiFillGithub />
      break

    case 'mail':
      Icon = <AiTwotoneMail />
      break
  }

  return (
    <li
      key={`footer-contact-link-${title}`}
      className={stylesFooter['link-list-item']}
    >
      <a
        href={to}
        title={title}
        aria-label={title}
        target='_blank'
        rel='noreferrer noopener'
        className={`
          ${stylesFooter['link']}
          ${stylesFooter['contact-link']}
        `}
      >
        <div className={stylesFooter['link-icon']}>
          { Icon }
        </div>
        { children }
      </a>
    </li>
  )
}
FooterContactLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired
};
 

/**
 * 頁尾
 * @returns
 */
const Footer = () => {
  return (
    <footer className={stylesFooter['footer']}>
      <article className="container">
        <div className="row">
          <div className={stylesFooter['col-2/4']}>
            <Link
              to='/'
              title='home'
              aria-label='home'
              className={stylesFooter['logo']}
            >
              <img
                src={mainLogo}
                alt="logo"
              />
            </Link>
            <p className={stylesFooter['copyright']}>
              Copyright ©2023 All rights reserved
            </p>
          </div>
          <section className={stylesFooter['col-1/4']}>
            <h2 className={stylesFooter['link-list-title']}>Links</h2>
            <ul>
              <FooterPageNavLink
                to='/'
                title='home'
              >
                Home
              </FooterPageNavLink>
              <FooterPageNavLink
                to='/world'
                title='world'
              >
                World
              </FooterPageNavLink>
              <FooterPageNavLink
                to='/sources'
                title='sources'
              >
                Sources
              </FooterPageNavLink>
            </ul>
          </section>
          <section className={stylesFooter['col-1/4']}>
            <h2 className={stylesFooter['link-list-title']}>Contact</h2>
            <ul>
              <FooterContactLink
                to='mailto:b10332040@gmail.com'
                title='mail'
                icon='mail'
              >
                b10332040@gmail.com
              </FooterContactLink>
              <FooterContactLink
                to='https://github.com/b10332040'
                title='GitHub'
                icon='github'
              >
                b10332040
              </FooterContactLink>
              <FooterContactLink
                to='https://www.behance.net/ba1013245e684'
                title='Behance'
                icon='behance'
              >
                Anna Lai
              </FooterContactLink>
            </ul>
          </section>
        </div>
      </article>
    </footer>
  )
}

export default Footer