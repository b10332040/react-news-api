import PropTypes from 'prop-types'
import styles from '/styles/searchPage.styles'
import { useParams } from 'react-router-dom'
import { dummyNewsList } from '/data'
import { Main, StickyBar, Popup } from '/layouts'
import { Button, Head, Loading, FormArea, ResultsText, NoResults, ScrollingRadioTabs, DropDownMenu, RadioList, ArticleCardListMode, RadioTabs, Pagination } from '/components'
import { useNews } from '/hooks'
import { useEffect, useRef, useState } from 'react'
import { createRadios, formatNumber, getTotalPage, isArrayEmpty, isEncodedUrl, isExisted, memoize, scrollToCheckedRadio } from '/utils'
import { CiSearch } from 'react-icons/ci'

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
  const { keywordMaxLength, categoryList, categoryMap, sortByList, sortByMap } = useNews()
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('publishedAt')
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [keywordList, setKeywordList] = useState([])
  const [articleList, setArticleList] = useState(dummyNewsList.articles)
  const [totalResults, setTotalResults] = useState(100)
  const [popupMenuOpen, setPopupMenuOpen] = useState(false)
  const [keywordListOpen, setKeywordListOpen] = useState(false)
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const [popupContentType, setPopupContentType] = useState('upper')
  const searchRef = useRef(null)
  const keywordListRef = useRef(null)
  const showStickyBarRef = useRef(null)
  const categoryRadioTabsOnStickyBarRef = useRef(null)
  const { encodeKeyword } = useParams()
  const pageSize = 12
  const totalPage = getTotalPage(totalResults, pageSize)
  const isDisabled = loading
  const isKeywordSubmit = (q !== '')
  const filterPopupMenuId = 'filterPopupMenu'
  const keywordListMaxLength = 10
  const isUpperContentInPopup = (popupContentType === 'upper')
  const hasKeywordList = (!isArrayEmpty(keywordList))
  const sortByObj = (isExisted(sortByMap.get(sortBy))) ? sortByMap.get(sortBy) : {}
  const categoryObj = (isExisted(categoryMap.get(category))) ? categoryMap.get(category) : {}
  let Result = <></>
  let SortByDropDownMenu = <></>
  let SortByItemsInPopup = <></>
  let CategoryTabsInPopup = <></>
  let CategoryDropDownMenu = <></>
  let CategoryScrollingTabs = <></>

  useEffect(() => {
    const keywordList = localStorage.getItem('keywordList')
    if (keywordList && !isArrayEmpty(JSON.parse(keywordList))) {
      setKeywordList(JSON.parse(keywordList))
    }

    if (isExisted(encodeKeyword)) {
      let tempKeyword = encodeKeyword
      let tempQ = encodeKeyword
      if (isEncodedUrl(tempKeyword)) {
        tempKeyword = decodeURI(tempKeyword)
      } else{
        tempQ = encodeURI(tempQ)
      }
      setKeyword(tempKeyword)
      setQ(tempQ)
      // 載入（此關鍵字+預設排序依據）的第一頁文章
    }
  }, [encodeKeyword])

  // 當類型 (category) 改變
  useEffect(() => {
    // 類型標籤列表（包含 sticky bar 上的）自動滾動到選到的類型
    scrollToCheckedRadio({
      radiosWrap: categoryRadioTabsOnStickyBarRef,
      value: category
    })
  },[category])

  // 當點擊非 search bar 的地方，收起 keyword list
  useEffect(() => {
    const handleClickSearchOutside = (event) => {
      if (
        searchRef.current
        && keywordListRef.current
        && !searchRef.current.contains(event.target)
        && !keywordListRef.current.contains(event.target)
      ) {
        setKeywordListOpen(false);
      }
    };
    document.addEventListener('click', handleClickSearchOutside);
    return () => {
      document.removeEventListener('click', handleClickSearchOutside);
    };
  }, [])

  // 當搜尋關鍵字有變更時，記錄到 Local storage
  useEffect(() => {
    if (hasKeywordList) {
      localStorage.setItem('keywordList', JSON.stringify(keywordList))
    }
  }, [hasKeywordList, keywordList])


  // 處理 search 提交 
  const handleSearchSubmit = (value) => {
    const trimmedValue = value.trim()
    setKeyword(trimmedValue)

    if (trimmedValue !== '') {
      // 紀錄尚未紀錄的關鍵字
      if (keywordList.findIndex((item) => item === trimmedValue) === -1) {
        const tempKeywordList = keywordList.slice(0, (keywordListMaxLength - 1))
        setKeywordList([
          trimmedValue,
          ...tempKeywordList
        ])
      }
      
      setQ(encodeURI(trimmedValue))
      // setLoading(true)
      setPage(1)
    } else {
      setQ('')
      setArticleList([])
    }
  }

  const handleSearchChange = (inputValue) => {
    // 處理第一個字不能為空白
    const trimmedValue = inputValue.trimStart()
    // 不能超過限制字元數量
    if (encodeURI(trimmedValue).length <= keywordMaxLength) {
      setKeyword(trimmedValue)
    }
  }

  // 處理搜尋框 blur 事件，keyword 要去掉前後空白
  const handleSearchBlur = () => {
    setKeyword(keyword.trim())
  }

  // 處理關鍵字紀錄 click 事件
  const handleKeywordHistoryClick = (keywordHistory) => {
    setKeywordListOpen(false)
    setKeyword(keywordHistory)
    setQ(encodeURI(keywordHistory))
    // setLoading(true)
    setPage(1)
  }

  const handleSortByChange = (inputValue) => {
    setSortBy(inputValue)

    if (keyword !== '') {
      // 載入（當前關鍵字+當前排序依據+此分類）的第一頁文章
      // setLoading(true)
      setPage(1)
    }
  }

  // 處理類型改變
  const handleCategoryChange = (inputValue) => {
    setCategory(inputValue)

    if (keyword !== '') {
      // 載入（當前關鍵字+當前排序依據+此分類）的第一頁文章
      // setLoading(true)
      setPage(1)
    }
  }

  // 處理頁碼改變
  const handlePageClick = (page) => {
    console.log(page)
    setPage(page)
  }

  // 產生排序所有項目
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

  if (
    !isArrayEmpty(categoryList)
    && (isExisted(categoryObj.displayName) || (!isExisted(categoryObj.displayName) && category === 'all'))
  ) {
    const tempCategoryList = [
      { value: 'all', displayName: 'All' },
      ...categoryList
    ]
    CategoryDropDownMenu = (
      <DropDownMenu
        menuId='categoryDropDownMenu'
        openButtonTitle='Choose category'
        openButtonDisabled={isDisabled}
        openButtonChildren={(categoryObj?.displayName) ? categoryObj.displayName : 'All'}
      >
        <RadioList>
          { 
            createRadios({
              RadioComponent: RadioList.Item,
              radios: tempCategoryList,
              name: 'category',
              checkedValue: category,
              onChange: (inputValue) => {
                handleCategoryChange(inputValue)
              },
              disabled: isDisabled
            }) 
          }
        </RadioList>
      </DropDownMenu>
    )
    
    CategoryScrollingTabs = createRadios({
      RadioComponent: ScrollingRadioTabs.Tab,
      radios: tempCategoryList,
      name: 'category',
      checkedValue: category,
      onChange: (inputValue) => {
        handleCategoryChange(inputValue)
      },
      disabled: isDisabled
    })
    CategoryTabsInPopup = createRadios({
      RadioComponent: RadioTabs.Tab,
      radios: tempCategoryList,
      name: 'category',
      checkedValue: category,
      onChange: (inputValue) => {
        handleCategoryChange(inputValue)
      },
      disabled: isDisabled
    })
  }

  if (loading) {
    Result = (
      <div className='w-full h-[120px]'>
        <Loading />
      </div>
    )
  } else {
    if (isArrayEmpty(articleList)) {
      Result = (
        <NoResults />
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
            <FormArea className='hidden md:block md:max-w-[calc(100%-44px)]'>
              <ScrollingRadioTabs selfRef={categoryRadioTabsOnStickyBarRef}>
                { CategoryScrollingTabs }
              </ScrollingRadioTabs>
            </FormArea>
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
              <hr className='mb-1'/>
              <Popup.TitleInBody>
                Category
              </Popup.TitleInBody>
              <RadioTabs>
                { CategoryTabsInPopup }
              </RadioTabs>
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
            >
              {formatNumber(totalResults)} results
            </Button>
          </Popup.Footer>
        </Popup.Dialog>
      </Popup>

      <div className={styles['main-header']['self']}>
        <div className={styles['main-header']['container']}>
          <div className={styles['container-inner']}>
            <div className='row items-center'>
              <div
                className={`
                  ${styles['main-header']['result-text-wrap']}
                  ${(isKeywordSubmit) ? '' : 'invisible'}
                `}
              >
                <p className={styles['main-result-text']['self']}>
                  {(loading) ? 'Loading...' : `Showing ${formatNumber(totalResults)} results for:`}
                </p>
              </div>
              <FormArea 
                className={styles['main-header']['search-bar-wrap']}
                onSubmit={() => {
                  handleSearchSubmit(keyword)
                }}
              >
                <div
                  className={`
                    ${styles['main-search']['self-wrap']}
                    ${(keywordListOpen) ? 'z-40' : 'z-[1]'}
                  `}
                >
                  <input
                    ref={searchRef}
                    type='text'
                    name='keyword'
                    placeholder={`Search NEWS API`}
                    onChange={(event) => {
                      handleSearchChange(event.target.value)
                    }}
                    onBlur={() => {
                      handleSearchBlur()
                    }}
                    onFocus={() => {
                      if (hasKeywordList) {
                        setKeywordListOpen(true)
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
                    ref={keywordListRef}
                    className={`
                      ${styles['main-search']['keyword-list']}
                      ${(hasKeywordList && keywordListOpen) ? 'block' : 'hidden'}
                    `}
                  >
                    <RadioTabs>
                      { 
                        keywordList.map((item) => {
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
              <FormArea className={styles['main-header']['drop-down-menu-wrap']}>
                { CategoryDropDownMenu }
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