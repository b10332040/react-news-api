import PropTypes from 'prop-types'
import { stylesMainRightSide } from '/styles'

/**
 * 主要內容右側
 * @param {node} children 內容 
 * @returns 
 */
const MainRightSide = ({ children }) => {
  return (
    <div className={stylesMainRightSide['self']}>
      <div className={stylesMainRightSide['container']}>
        { children }
      </div>
    </div>
  )
}
MainRightSide.propTypes = {
  children: PropTypes.node
}

export default MainRightSide