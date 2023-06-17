import PropTypes from 'prop-types'
import { stylesHeader } from '/styles'

/**
 * 標題
 * @param {object} props - 屬性
 * @param {string} props.title - 標題 
 * @param {node} props.children - 內容
 * @returns
 */
const Header = ({ title, children }) => {
  const headerClassName = stylesHeader['self']
  const titleClassName = stylesHeader['title']
  const hasChildren = typeof(children) === 'undefined' ? false : true

  if (hasChildren) {
    return (
      <header className={headerClassName}>
        <h3
          className={`
            ${titleClassName}
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
    <header className={headerClassName}>
      <h3 className={titleClassName}>
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