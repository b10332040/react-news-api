import PropTypes from 'prop-types'
import styles from '/styles/searchPage.styles'
import { useParams } from 'react-router-dom'
import { Main, StickyBar, Popup } from '/layouts'
import { Button, Head, Loading, FormArea, ResultsText, NoResults, DropDownMenu, RadioList, ArticleCardListMode, RadioTabs, Pagination } from '/components'
import { useNews } from '/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createRadios, formatNumber, isArrayEmpty, isExisted, memoize, isEncodedUrl } from '/utils'
import { CiSearch } from 'react-icons/ci'
import { apiNewsEverything, getApiNewsResult } from '../api/apiNews'

/**
 * 文章列表
 * @param {object} props - 屬性
 * @param {array} props.articleList - 文章資料
 * @returns 
 */
const ArticleList = ({ articleList }) => {
  if (isArrayEmpty(articleList)) {
    return <></>
  }

  return (
    <>
      {
        articleList.map((article, index) => {
          return (
            <ArticleCardListMode
              key={`article-${index}`}
              article={article}
              className='mb-3'
            />
          )
        })
      }
    </>
  )
}
ArticleList.propTypes = {
  articleList: PropTypes.array
}
const MemoizedArticleList = memoize(ArticleList)

/**
 * 搜尋結果頁
 * @returns 
 */
const SearchPage = () => {
  const {
    keywordMaxLength,
    sortByList,
    sortByMap
  } = useNews()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('publishedAt')
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [articleList, setArticleList] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [popupMenuOpen, setPopupMenuOpen] = useState(false)
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const [popupContentType, setPopupContentType] = useState('upper')
  const [keywordHistoryList, setKeywordHistoryList] = useState([])
  const [isKeywordSubmitted, setIsKeywordSubmitted] = useState(false)
  const [keywordHistoryListMenuOpen, setKeywordHistoryListMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const showStickyBarRef = useRef(null)
  const keywordHistoryListRef = useRef(null)
  const { encodeKeyword } = useParams()
  const pageSize = 12
  const isDisabled = loading
  const sortByObj = (isExisted(sortByMap.get(sortBy))) ? sortByMap.get(sortBy) : {}
  const filterPopupMenuId = 'filterPopupMenu'
  const isUpperContentInPopup = (popupContentType === 'upper')
  const hasKeywordHistoryList = (!isArrayEmpty(keywordHistoryList))
  const keywordHistoryListMaxLength = 10
  let Result = <></>
  let SortByDropDownMenu = <></>
  let SortByItemsInPopup = <></>

  // 呼叫 API 取得文章
  const getArticleListAsync = useCallback(async (data) => {
    if (!isExisted(data.q)) {
      setTotalResults(0)
      setArticleList([])
      setLoading(false)
      setIsKeywordSubmitted(false)
      return
    }

    // 修改狀態
    setLoading(true)
    setKeyword((isEncodedUrl(data.q)) ? decodeURI(data.q) : data.q)
    if (data?.sortBy) {
      setSortBy(data.sortBy)
    }
    
    // 呼叫 API
    const response = await apiNewsEverything({
      ...data,
      pageSize: pageSize,
      q: (isEncodedUrl(data.q)) ? data.q : encodeURI(data.q)
    })
    const result = getApiNewsResult(response)
    if (result.status === 'ok') {
      setTotalResults((result?.totalResults) ? result.totalResults : 0)
      setArticleList(result.articles)
      setPage((data?.page) ? data.page : 1)
      setNoResultsMessage('')
    } else {
      setTotalResults(0)
      setArticleList([])
      setNoResultsMessage((result?.message) ? result.message : '')
    }
    // console.log(result)
    console.log('Search page: get article list')
    setLoading(false)
    setIsKeywordSubmitted(true)
  }, [])

  useEffect(() => {
    // 把 Local storage 中曾送給 API 的關鍵字取出來
    const keywordHistoryList = localStorage.getItem('keywordHistoryList')
    if (keywordHistoryList && !isArrayEmpty(JSON.parse(keywordHistoryList))) {
      setKeywordHistoryList(JSON.parse(keywordHistoryList))
    }

    // 網址路徑上是否有帶關鍵字
    if (isExisted(encodeKeyword)) {
      // 有 -> 取得（此關鍵字）文章
      getArticleListAsync({
        q: encodeKeyword
      })

    } else {
      // 無
      setLoading(false)
      setNoResultsMessage('Please search something...')
    }
  }, [encodeKeyword, getArticleListAsync])

  // 當點擊非 search bar 的地方，收起下拉選單（曾送給 API 的關鍵字列表）
  useEffect(() => {
    const handleClickSearchOutside = (event) => {
      if (
        searchRef.current
        && keywordHistoryListRef.current
        && !searchRef.current.contains(event.target)
        && !keywordHistoryListRef.current.contains(event.target)
      ) {
        setKeywordHistoryListMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickSearchOutside);
    return () => {
      document.removeEventListener('click', handleClickSearchOutside);
    };
  }, [])

  // 當送給 API 的關鍵字列表有變更時，記錄到 Local storage
  useEffect(() => {
    if (hasKeywordHistoryList) {
      localStorage.setItem('keywordHistoryList', JSON.stringify(keywordHistoryList))
    }
  }, [hasKeywordHistoryList, keywordHistoryList])


  // 處理關鍵字提交
  const handleKeywordSubmit = (value) => {
    const tempKeyword = value.trim()

    if (tempKeyword !== '') {
      // 此送給 API 的關鍵字，尚未記錄進送給 API 的關鍵字列表中的話，紀錄進去
      if (keywordHistoryList.findIndex((item) => item === tempKeyword) === -1) {
        // 只記錄最近的幾筆
        const tempKeywordHistoryList = keywordHistoryList.slice(0, (keywordHistoryListMaxLength - 1))
        setKeywordHistoryList([
          tempKeyword,
          ...tempKeywordHistoryList
        ])
      }
      // 取得（此關鍵字 + 目前排序）第一篇文章
      getArticleListAsync({
        q: tempKeyword,
        sortBy: sortBy
      })

    } else {
      // 清空
      setPage(1)
      setKeyword('')
      setTotalResults(0)
      setArticleList([])
    }
  }
  // 處理關鍵字改變
  const handleKeywordChange = (inputValue) => {
    // 處理第一個字不能為空白
    const tempKeyword = inputValue.trimStart()
    // 不能超過限制字元數量
    if (encodeURI(tempKeyword).length <= keywordMaxLength) {
      setKeyword(tempKeyword)
    }
  }
  // 處理關鍵字失去焦點，keyword 要去掉前後空白
  const handleKeywordBlur = () => {
    setKeyword(keyword.trim())
  }
  // 處理關鍵字紀錄 click 事件
  const handleKeywordHistoryClick = (keywordHistory) => {
    setKeywordHistoryListMenuOpen(false)

    // 取得（此關鍵字 + 目前排序）第一篇文章
    getArticleListAsync({
      q: keywordHistory,
      sortBy: sortBy
    })
  }

  // 處理當排序依據改變
  const handleSortByChange = (inputValue) => {
    const tempKeyword = keyword.trim()

    // 檢查關鍵字是否有值
    if (tempKeyword !== '') {
      // 有 -> 載入（此排序依據 + 目前關鍵字）的第一頁文章
      getArticleListAsync({
        q: tempKeyword,
        sortBy: inputValue
      })

    } else {
      // 沒有 -> 只更新排序依據
      setSortBy(inputValue)
    }
  }

  // 處理頁碼改變
  const handlePageClick = (page) => {
    const tempKeyword = keyword.trim()

    // 檢查關鍵字是否有值
    if (tempKeyword !== '') {
      // 取得（此頁碼 + 目前關鍵字 + 目前排序）第一篇文章
      getArticleListAsync({
        q: tempKeyword,
        sortBy: sortBy,
        page: page
      })
    } else {
      setPage(page)
    }
  }

  // 產生所有排序依據項目
  if (!isArrayEmpty(sortByList) && isExisted(sortByObj.displayName)) {
    const SortByRadioItems = createRadios({
      RadioComponent: RadioList.Item,
      radios: sortByList,
      name: 'sortBy',
      checkedValue: sortBy,
      onChange: (inputValue) => {
        handleSortByChange(inputValue)
      },
      disabled: isDisabled
    })
    SortByDropDownMenu = (
      <DropDownMenu
        menuId='sortByDropDownMenu'
        openButtonTitle='Sort by'
        openButtonDisabled={isDisabled}
        openButtonChildren={`Sort by ${sortByObj.displayName}`}
      >
        <RadioList>
          { SortByRadioItems }
        </RadioList>
      </DropDownMenu>
    )
    SortByItemsInPopup = SortByRadioItems
  }

  // 處理文章區塊要顯示的內容
  if (loading) {
    Result = (
      <div className='w-full h-[120px]'>
        <Loading />
      </div>
    )
  } else {
    if (isArrayEmpty(articleList)) {
      Result = (
        <NoResults message={noResultsMessage} />
      )
    } else {
      Result = (
        <>
          <MemoizedArticleList articleList={articleList} />
        </>
      )
    }
  }

  return (
    <>
      <Head title='Search' />
      <StickyBar showStickyBarRef={showStickyBarRef}>
        <div className='row items-center h-full'>
          <div className='col w-1/2 md:w-3/12'>
            <ResultsText
              startWith='page'
              page={page}
              pageSize={pageSize}
              total={totalResults}
              className={`
                'my-3 lg:my-0'
                ${(totalResults === 0) ? 'invisible' : ''}
              `}
            />
          </div>
          <div className='col w-1/2 md:w-9/12 flex flex-wrap justify-end'>
            <StickyBar.IconButton
              title='Open filter popup menu'
              icon='filter'
              popupId={filterPopupMenuId}
              popupOpen={popupMenuOpen}
              onClick={() => {
                setPopupMenuOpen(true)
                setPopupContentType('upper')
              }}
              className='border-l-2 border-[--theme-gray-200]'
            />
          </div>
        </div>
      </StickyBar>
      
      <Popup
        open={popupMenuOpen}
        popupId={filterPopupMenuId}
        setOpen={setPopupMenuOpen}
        overScreenHeight={false}
        dialogFullInMobile={true}
        backdropVisibleInMobile={true}
      >
        <Popup.Dialog>
          <Popup.Header
            hasLeftArrowButton={!isUpperContentInPopup}
            onLeftArrowButtonClick={() => {
              setPopupContentType('upper')
            }}
          >
            <Popup.Title>
              {(isUpperContentInPopup) ? 'Filter' : 'Sort By'}
            </Popup.Title>
          </Popup.Header>
          <Popup.Body>
            {/* Upper content */}
            <FormArea className={(!isUpperContentInPopup) ? 'hidden' : ''}>
              <Popup.ChangeContentButtonInBody
                title='Choose sort by'
                note={(sortByObj?.displayName) ? sortByObj?.displayName : ''}
                onClick={() => {
                  setPopupContentType('sortBy')
                }}
              >
                Sort By
              </Popup.ChangeContentButtonInBody>
            </FormArea>
            {/* Sort By content */}
            <FormArea className={(isUpperContentInPopup)  ? 'hidden' : ''}>
              <RadioList>
                { SortByItemsInPopup }
              </RadioList>
            </FormArea>
          </Popup.Body>
          <Popup.Footer>
            <Button
              title={`${formatNumber(totalResults)} results`}
              display='block'
              size='lg'
              onClick={() => {
                setPopupMenuOpen(false)
              }}
              processing={isDisabled}
              disabled={isDisabled}
            >
              {(isDisabled) ? 'loading' : `${formatNumber(totalResults)} results`}
            </Button>
          </Popup.Footer>
        </Popup.Dialog>
      </Popup>

      <div className={styles['main-header']['self']}>
        <div className={styles['main-header']['container']}>
          <div className={styles['container-inner']}>
            <div className={styles['main-header']['row']}>
              <div
                className={`
                  ${styles['main-header']['result-text-wrap']}
                  ${(isKeywordSubmitted) ? '' : 'invisible'}
                `}
              >
                <p className={styles['main-result-text']['self']}>
                  {(loading) ? 'Loading...' : `Showing ${formatNumber(totalResults)} results for:`}
                </p>
              </div>
              <FormArea 
                className={styles['main-header']['search-bar-wrap']}
                onSubmit={() => {
                  handleKeywordSubmit(keyword)
                }}
              >
                <div
                  className={`
                    ${styles['main-search']['self-wrap']}
                    ${(keywordHistoryListMenuOpen) ? 'z-30' : 'z-[1]'}
                  `}
                >
                  <input
                    ref={searchRef}
                    type='text'
                    name='keyword'
                    placeholder={`Search NEWS API`}
                    onChange={(event) => {
                      handleKeywordChange(event.target.value)
                    }}
                    onBlur={() => {
                      handleKeywordBlur()
                    }}
                    onFocus={() => {
                      if (hasKeywordHistoryList) {
                        setKeywordHistoryListMenuOpen(true)
                      }
                    }}
                    value={keyword}
                    autoComplete='off'
                    disabled={loading}
                    className={styles['main-search']['self']}
                  />
                  <button
                    type='submit'
                    title='Submit keyword'
                    name='Submit keyword'
                    aria-label='Submit keyword'
                    className={styles['main-search']['submit-button']}
                    disabled={loading}
                  >
                    <CiSearch className={styles['main-search']['submit-button-icon']} />
                  </button>
                  <div
                    ref={keywordHistoryListRef}
                    className={`
                      ${styles['main-search']['keyword-list']}
                      ${(hasKeywordHistoryList && keywordHistoryListMenuOpen) ? 'block' : 'hidden'}
                    `}
                  >
                    <RadioTabs>
                      { 
                        keywordHistoryList.map((item) => {
                          return (
                            <button
                              key={item}
                              type='button'
                              title={`history: ${item}`}
                              aria-label={`history: ${item}`}
                              onClick={() => {
                                handleKeywordHistoryClick(item)
                              }}
                              className={styles['main-search']['keyword-tab']}
                              disabled={isDisabled}
                            >
                              { item }
                            </button>
                          )
                        })
                      }
                    </RadioTabs>
                  </div>
                </div>
              </FormArea>
              <FormArea className={styles['main-header']['drop-down-menu-wrap']}>
                { SortByDropDownMenu }
              </FormArea>
            </div>
          </div>
        </div>
      </div>
      
      <Main>
        <div className={styles['container-inner']}>
          <div ref={showStickyBarRef}>
            { Result }
          </div>
          <div className='mt-6'> 
            <Pagination
              withEllipsis={true}
              page={page}
              pageSize={pageSize}
              total={totalResults}
              handlePageClick={handlePageClick}
              disabled={isDisabled}
            />
          </div>
        </div>
      </Main>
    </>
  )
}

export default SearchPage