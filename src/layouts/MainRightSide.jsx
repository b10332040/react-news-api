import PropTypes from 'prop-types'
import { stylesMainRightSide } from '/styles'

/**
 * 主要內容右側
 * @param {node} children 內容 
 * @param {bool} isContentSticky 內容是否 sticky（預設：false）
 * @returns 
 */
const MainRightSide = ({ children, isContentSticky=false }) => {
  return (
    <div className={stylesMainRightSide['self']}>
      <div className={stylesMainRightSide['container']}>
        <article
          className={`
            ${stylesMainRightSide['stickyWrap']}
            ${(isContentSticky) ? stylesMainRightSide['stickyWrap--sticky'] : ''}
          `}
        >
          { children }
        </article>
      </div>
    </div>
  )
}
MainRightSide.propTypes = {
  children: PropTypes.node,
  isContentSticky: PropTypes.bool
}

export default MainRightSide