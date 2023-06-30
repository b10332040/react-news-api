import PropTypes from 'prop-types'
import { usePagination } from '/hooks'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

/**
 * 頁碼
 * @param {object} props - 屬性
 * @param {bool} obj.withEllipsis - 是否顯示 ...
 * @param {number} obj.page - 目前第幾頁
 * @param {number} obj.pageSize - 一頁顯示幾筆資料
 * @param {number} obj.total - 資料總筆數
 * @param {func} obj.handlePageClick - 當點擊頁碼
 * @returns 
 */
const Pagination = ({
  withEllipsis,
  page,
  pageSize,
  total,
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

  return (
    <ul>
      <li>
        <button
          type='button'
          title='Prev page'
          aria-label='Prev page'
          role='presentation'
          onClick={(page === 1) ? null : handleClickPrev}
          disabled={(page === 1)}
        >
          <AiOutlineLeft />
        </button>
      </li>
        {
          items.map((item) => {
            return (
              <li key={item.page}>
                <button
                  type='button'
                  title={`page ${item.page}`}
                  aria-label={`page ${item.page}`}
                  role='presentation'
                  onClick={item.handlePageClick}
                  disabled={(item.page === page)}
                >
                  {(item.type === 'page') ? item.page : '...'}
                </button>
              </li>
            )
          })
        }
      <li>
        <button
          type='button'
          title='Next page'
          aria-label='Next page'
          role='presentation'
          onClick={(page === totalPage) ? null : handleClickNext}
          disabled={(page === totalPage)}
        >
          <AiOutlineRight />
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
  handlePageClick: PropTypes.func
}

export default Pagination