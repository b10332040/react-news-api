import PropTypes from 'prop-types'
import styles from '/styles/main.styles'
import Header from './Header'
import { contact } from '/data'
import { SocialCircleLink } from '/components'

/**
 * 主要內容
 * @param {object} props - 屬性
 * @param {node} props.children - 內容 
 * @returns 
 */
const Main = ({ children }) => {
  return (
    <main className="my-[60px] md:my-[80px] xl:my-[100px] container">
      <div className="row">
        { children }
      </div>
    </main>
  )
}
Main.propTypes = {
  children: PropTypes.node
}

/**
 * 主要內容左側
 * @param {object} props - 屬性
 * @param {node} props.children - 內容 
 * @returns 
 */
const LeftSide = ({ children }) => {
  return (
    <div className={styles['left-side']['self']}>
      <div className={styles['left-side']['container']}>
        { children }
      </div>
    </div>
  )
}
LeftSide.propTypes = {
  children: PropTypes.node
}

/**
 * 主要內容右側
 * @param {object} props - 屬性
 * @param {node} props.children - 內容 
 * @param {bool} props.isContentSticky - 內容是否 sticky（預設：false）
 * @returns 
 */
const RightSide = ({ children, isContentSticky=false }) => {
  return (
    <div className={styles['right-side']['self']}>
      <div className={styles['right-side']['container']}>
        <article
          className={`
            ${styles['right-side']['stickyWrap']}
            ${(isContentSticky) ? styles['right-side']['stickyWrap--sticky'] : ''}
          `}
        >
          { children }
        </article>
      </div>
    </div>
  )
}
RightSide.propTypes = {
  children: PropTypes.node,
  isContentSticky: PropTypes.bool
}

/**
 * 右側 Section
 * @param {object} props - 屬性
 * @param {string} props.contentType - 內容類型
 * @param {title} props.title - 標題
 * @param {node} props.children - 內容
 */
const RightSideSection = ({contentType, title, children}) => {
  if (typeof contentType !== 'undefined') {
    switch (contentType) {
      case 'about':
        title = (typeof title !== 'undefined') ? title : 'About'
        children = (
          <p className='text-sm text-[--theme-gray-400] leading-loose'>
            {/* 此新聞網站使用 React 框架以及串接
            <a
              target='_blank'
              rel='noreferrer noopener'
              className='text-link'
              href='https://newsapi.org/'
            >
              News API
            </a>
            製作而成，感謝您的閱覽。 */}
            此新聞網站使用 React 框架建置，
            待串接
            <a
              target='_blank'
              rel='noreferrer noopener'
              className='text-link'
              href='https://newsapi.org/'
            >
              News API
            </a>。
          </p>
        )
        break

      case 'connect':
        title = (typeof title !== 'undefined') ? title : 'Stay Connected'
        children = (
          <ul className={styles['right-side-section']['connect-list']}>
            <li>
              <SocialCircleLink
                to={contact.github.to}
                title={contact.github.title}
                icon={contact.github.icon}
              />
            </li>
            <li>
              <SocialCircleLink
                to={contact.behance.to}
                title={contact.behance.title}
                icon={contact.behance.icon}
              />
            </li>
          </ul>
        )
        break
    }
  }

  if (typeof title !== 'undefined' && typeof children !== 'undefined') {
    return (
      <section>
        <Header title={title}/>
        <div className="px-3 py-4">
          { children }
        </div>
      </section>
    )
  }

  return (
    <></>
  )
}
RightSideSection.propTypes = {
  contentType: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
}

Main.LeftSide = LeftSide
Main.RightSide = RightSide
Main.RightSideSection = RightSideSection
export default Main