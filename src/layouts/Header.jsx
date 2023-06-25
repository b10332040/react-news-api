import PropTypes from 'prop-types'
import styles from '/styles/header.styles'

/**
 * 標題
 * @param {object} props - 屬性
 * @param {string} props.title - 標題 
 * @param {node} props.children - 內容
 * @returns
 */
const Header = ({ title, children }) => {
  const headerClassName = styles['self']
  const titleClassName = styles['title']
  const hasChildren = typeof(children) === 'undefined' ? false : true

  if (hasChildren) {
    return (
      <header className={headerClassName}>
        <h3
          className={`
            ${titleClassName}
            ${styles['title--has-right']}
          `}
        >
          { title }
        </h3>
        <div className={styles['right-side']}>
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