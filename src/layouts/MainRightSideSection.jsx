import PropTypes from 'prop-types'
import { contact } from '/data'
import { Header, SocialCircleLink } from '/components'
import { stylesMainRightSideSection } from '/styles'

/**
 * 右側 Section
 * @param {object} props - 屬性
 * @param {string} props.contentType - 內容類型
 * @param {title} props.title - 標題
 * @param {node} props.children - 內容
 */
const MainRightSideSection = ({contentType, title, children}) => {
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
          <ul className={stylesMainRightSideSection['connect-list']}>
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
MainRightSideSection.propTypes = {
  contentType: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
}

export default MainRightSideSection