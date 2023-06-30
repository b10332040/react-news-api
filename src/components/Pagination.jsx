import PropTypes from 'prop-types'
import styles from '/styles/pagination.styles'
import { usePagination } from '/hooks'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

/**
 * 頁碼
 * @param {object} props - 屬性
 * @param {bool} obj.withEllipsis - 是否顯示 ...
 * @param {number} obj.page - 目前第幾頁
 * @param {number} obj.pageSize - 一頁顯示幾筆資料
 * @param {number} obj.total - 資料總筆數
 * @param {bool} props.disabled - disabled 屬性值，按鈕是否不可點擊 (預設：false)
 * @param {func} obj.handlePageClick - 當點擊頁碼
 * @returns 
 */
const Pagination = ({
  withEllipsis,
  page,
  pageSize,
  total,
  disabled,
  handlePageClick,
}) => {
  const {
    items,
    totalPage,
    handleClickPrev,
    handleClickNext
  } = usePagination({
    page,
    pageSize,
    total,
    withEllipsis,
    handlePageClick
  })

  if (total === 0) {
    return <></>
  }

  return (
    <ul
      className={`
        ${styles['self']}
        ${(disabled) ? 'opacity-50' : ''}
      `}
    >
      <li className={styles['item']}>
        <button
          type='button'
          title='Prev page'
          aria-label='Prev page'
          role='presentation'
          onClick={(page === 1) ? null : handleClickPrev}
          disabled={(page === 1 || disabled)}
          className={`
            ${styles['button']}
            ${(page === 1) ? 'invisible' : ''}
          `}
        >
          <AiOutlineLeft
            className={`
              ${styles['button-icon']}
              ${styles['button-icon--left']}
            `}
          />
        </button>
      </li>
        {
          items.map((item) => {
            if (item.type !== 'page') {
              return (
                <li
                  key={item.page}
                  className={styles['item']}  
                >
                  <div className={styles['ellipsis']}>
                    ...
                  </div>
                </li>
              )
            }
            return (
              <li
                key={item.page}
                className={styles['item']}  
              >
                <button
                  type='button'
                  title={`page ${item.page}`}
                  aria-label={`page ${item.page}`}
                  role='presentation'
                  onClick={item.handlePageClick}
                  disabled={(item.page === page || disabled)}
                  className={`
                    ${styles['button']}
                    ${(item.isCurrent) ? styles['button--current'] : styles['button--not-current']}
                  `}
                >
                  {item.page}
                </button>
              </li>
            )
          })
        }
      <li className={styles['item']}>
        <button
          type='button'
          title='Next page'
          aria-label='Next page'
          role='presentation'
          onClick={(page === totalPage) ? null : handleClickNext}
          disabled={(page === totalPage) || disabled}
          className={`
            ${styles['button']}
            ${(page === totalPage) ? 'invisible' : ''}
          `}
        >
          <AiOutlineRight
            className={`
              ${styles['button-icon']}
              ${styles['button-icon--right']}
            `}
          />
        </button>
      </li>
    </ul>
  )
}
Pagination.propTypes = {
  withEllipsis: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  disabled: PropTypes.bool,
  handlePageClick: PropTypes.func
}

export default Pagination