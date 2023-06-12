import PropTypes from 'prop-types'

/**
 * 主要內容左側
 * @param {node} children 內容 
 * @returns 
 */
const MainLeftSide = ({ children }) => {
  return (
    <div className='col w-full lg:w-8/12'>
      <div className='h-full min-h-[160px]'>
        { children }
      </div>
    </div>
  )
}
MainLeftSide.propTypes = {
  children: PropTypes.node
}

export default MainLeftSide