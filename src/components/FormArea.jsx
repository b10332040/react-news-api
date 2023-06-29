import PropTypes from 'prop-types'

/**
 * 表單
 * @param {object} props - 屬性
 * @param {func} props.onSubmit - 處理表單提交後
 * @param {string} props.className - 樣式（預設：''）
 * @param {node} props.children - 內容
 * @returns 
 */
const FormArea = ({ onSubmit, className='', children }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.()
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      { children }
    </form>
  )
}
FormArea.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

export default FormArea