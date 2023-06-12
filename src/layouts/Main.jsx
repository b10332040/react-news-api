import PropTypes from 'prop-types'

/**
 * 主要內容
 * @param {node} children 內容 
 * @returns 
 */
const Main = ({ children }) => {
  return (
    <main className="my-[60px] md:my-[80px] xl:my-[100px] container">
      <div className="row">
        { children }
      </div>
    </main>
  )
}
Main.propTypes = {
  children: PropTypes.node
}

export default Main