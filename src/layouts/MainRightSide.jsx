import PropTypes from 'prop-types'

/**
 * 主要內容右側
 * @param {node} children 內容 
 * @returns 
 */
const MainRightSide = ({ children }) => {
  return (
    <div className='col w-full lg:w-4/12'>
      <div className='md:border-l-2 md:border-[--theme-gray-200] h-full'>
        { children }
      </div>
    </div>
  )
}
MainRightSide.propTypes = {
  children: PropTypes.node
}

export default MainRightSide