import styles from '/styles/toTopButton.styles'
import { useApp } from '/hooks'
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
        ${styles['self']}
        ${(pageTop) ? styles['self--hidden'] : styles['self--show']}
      `}
      onClick={handleClick}
    >
      <div className={styles['icon-wrap']}>
        <SlArrowUp className={styles['icon']} />
      </div>
    </button>
  )
}

export default ToTopButton

