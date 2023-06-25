import PropTypes from 'prop-types'

/**
 * 表單
 * @param {object} props - 屬性
 * @param {func} props.handleAfterSubmit - 處理表單提交後
 * @param {string} props.className - 樣式（預設：''）
 * @param {node} props.children - 內容
 * @returns 
 */
const FormArea = ({ handleAfterSubmit, className='', children }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    handleAfterSubmit?.()
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
  handleAfterSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

export default FormArea