import { getTotalPage } from '/utils'

/**
 * 使用頁碼相關邏輯
 * @param {object} obj - 物件
 * @param {bool} obj.page - 目前第幾頁
 * @param {number} obj.pageSize - 一頁顯示幾筆資料
 * @param {number} obj.total - 資料總筆數
 * @param {number} obj.withEllipsis - 是否顯示 ...
 * @param {func} obj.handlePageClick - 當點擊頁碼
 * @returns
 */
const usePagination = ({
  page,
  pageSize,
  total,
  withEllipsis,
  handlePageClick,
}) => {
  // 計算總頁數
  const totalPage = getTotalPage(total, pageSize)

  // 給 Pagination 的資料
  const items = [...Array(totalPage).keys()]
  .map((index) => index + 1)
  .map((item) => {
    return {
      type: 'page',
      isCurrent: item === page,
      page: item,
      handlePageClick: () => handlePageClick(item)
    }
  })

  // 修改資料 (items) 中某些資料類型類型 (type) 變成 ...
  const defineItemsType = items
  .map((item) => {
    // 當符合以下情況，type 維持 page
    if (
      item.page === totalPage // 最後一頁
      || item.page === 1 // 第一頁
      || item.page === page // 當前頁
      || item.page === page + 1 // 當前頁 + 1
      || item.page === page - 1 // 當前頁 - 1
    ) {
      return item
    }

    return {
      ...item,
      type: item.page > page ? 'end-ellipsis' : 'start-ellipsis'
    }
  })

  // 過濾資料 (defineItemsType)
  const ellipsisItems = defineItemsType.filter((item, index) => {
    // 當 type: 'start-ellipsis'，且下一個 item 的 type 也是 'start-ellipsis' 過濾掉
    if (item.type === 'start-ellipsis' && defineItemsType[index + 1].type === 'start-ellipsis') {
      return false
    }
    // 當 type: 'end-ellipsis'，且下一個 item 的 type 也是 'end-ellipsis' 過濾掉
    if (item.type === 'end-ellipsis' && defineItemsType[index + 1].type === 'end-ellipsis') {
      return false
    }
    return true
  })

  // 點擊下一頁
  const handleClickNext = () => {
    const nextPage = (page + 1) > totalPage ? totalPage : (page + 1)
    handlePageClick?.(nextPage)
  }

  // 點擊上一頁
  const handleClickPrev = () => {
    const prevPage = (page - 1) < 1 ? 1 : (page - 1)
    handlePageClick?.(prevPage)
  }

  return {
    items: withEllipsis ? ellipsisItems : items,
    totalPage,
    handleClickNext,
    handleClickPrev
  }
}

export default usePagination