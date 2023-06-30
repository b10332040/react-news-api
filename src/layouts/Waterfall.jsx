import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'
import { isExisted } from '/utils'

/**
 * 瀑布流
 * @param {object} props - 屬性
 * @param {object} props.breakpointCols - 不同斷點下要顯示幾列
 * @param {string} props.className - 樣式 (預設：'')
 * @param {node} props.children - 內容
 * @returns
 */
const Waterfall = ({
  breakpointCols,
  className='',
  children
}) => {
  if (!isExisted(breakpointCols)) {
    breakpointCols={
      default: 3,
      575: 1,
      767: 2
    }
  }

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={`${className} flex -ml-3 w-auto`}
      columnClassName='pl-3 bg-clip-padding [&>*]:mb-3'
    >
      { children }
    </Masonry>
  )
}
Waterfall.propTypes = {
  breakpointCols: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node
}

export default Waterfall