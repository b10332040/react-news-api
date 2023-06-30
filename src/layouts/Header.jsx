import PropTypes from 'prop-types'
import styles from '/styles/header.styles'

/**
 * 頁首
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const Header = ({ children }) => {  
  return (
    <div className={styles['header']['self']}>
      { children }
    </div>
  )
}
Header.propTypes = {
  children: PropTypes.node
}

/**
 * 較長的容器
 * @param {object} props - 屬性
 * @param {bool} props.isContentRight - 內容是否靠右（預設：false）
 * @param {node} props.children - 內容
 * @returns
 */
const LongContainer = ({
  isContentRight=false,
  children
}) => {
  return (
    <div
      className={`
        ${styles['long-container']['self']}
        ${(isContentRight) ? 'md:justify-end' : ''}
      `}
    >
      { children }
    </div>
  )
}
LongContainer.propTypes = {
  isContentRight: PropTypes.bool,
  children: PropTypes.node
}

/**
 * 較短的容器
 * @param {object} props - 屬性
 * @param {bool} props.isContentRight - 內容是否靠右（預設：false）
 * @param {node} props.children - 內容
 * @returns
 */
const ShortContainer = ({
  isContentRight=false,
  children
}) => {
  return (
    <div
      className={`
        ${styles['short-container']['self']}
        ${(isContentRight) ? 'md:justify-end' : ''}
      `}
    >
      { children }
    </div>
  )
}
ShortContainer.propTypes = {
  isContentRight: PropTypes.bool,
  children: PropTypes.node
}

/**
 * 標題
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const Title = ({ children }) => {
  return (
    <h3 className={styles['title']['self']}>
      { children }
    </h3>
  )
}
Title.propTypes = {
  children: PropTypes.node
}

Header.LongContainer = LongContainer
Header.ShortContainer = ShortContainer
Header.Title = Title
export default Header