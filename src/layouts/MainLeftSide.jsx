import PropTypes from 'prop-types'
import { stylesMainLeftSide } from '/styles'

/**
 * 主要內容左側
 * @param {object} props - 屬性
 * @param {node} props.children - 內容 
 * @returns 
 */
const MainLeftSide = ({ children }) => {
  return (
    <div className={stylesMainLeftSide['self']}>
      <div className={stylesMainLeftSide['container']}>
        { children }
      </div>
    </div>
  )
}
MainLeftSide.propTypes = {
  children: PropTypes.node
}

export default MainLeftSide