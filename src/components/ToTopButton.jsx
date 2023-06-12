import { useApp } from '/hooks'
import { stylesToTopButton } from '/styles'
import { SlArrowUp } from 'react-icons/sl'

/**
 * 至頂按鈕
 * @returns 
 */
const ToTopButton = () => {
  const { pageTop } = useApp()

  // 處理點擊
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type='button'
      title='To top'
      aria-label='To top'
      className={`
        ${stylesToTopButton['to-top']}
        ${(pageTop) ? stylesToTopButton['to-top--hidden'] : stylesToTopButton['to-top--show']}
      `}
      onClick={handleClick}
    >
      <div className={stylesToTopButton['icon-wrap']}>
        <SlArrowUp className={stylesToTopButton['icon']} />
      </div>
    </button>
  )
}

export default ToTopButton

