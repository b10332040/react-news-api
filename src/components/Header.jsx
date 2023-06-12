import PropTypes from 'prop-types'
import { stylesHeader } from '/styles'

/**
 * 標題
 * @param {string} title 標題 
 * @param {node} children 內容
 */
const Header = ({ title, children }) => {
  const hasChildren = typeof(children) === 'undefined' ? false : true

  if (hasChildren) {
    return (
      <header className={stylesHeader['header']}>
        <h3
          className={`
            ${stylesHeader['title']}
            ${stylesHeader['title--has-children']}
          `}
        >
          { title }
        </h3>
        <div className={stylesHeader['children-wrap']}>
          { children }
        </div>
      </header>
    )
  }
  
  return (
    <header className={stylesHeader['header']}>
      <h3 className={stylesHeader['title']}>
        { title }
      </h3>
    </header>
  )
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Header