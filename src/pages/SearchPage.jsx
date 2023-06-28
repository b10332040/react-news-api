import PropTypes from 'prop-types'
import styles from '/styles/searchPage.styles'
import { useParams } from 'react-router-dom'
import { dummyNewsList } from '/data'
import { Main, Header, StickyBar, Popup } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, RadioTabs, ResultsText, Search, NoResults } from '/components'
import { useNews } from '/hooks'
import { useEffect, useRef, useState } from 'react'
import { formatNumber, getTotalPage, isArrayEmpty, isExisted, memoize, scrollToCheckedRadio } from '/utils'
import { CiSearch } from 'react-icons/ci'


/**
 * 搜尋結果頁
 * @returns 
 */
const SearchPage = () => {
  const { keywordMaxLength, categoryList } = useNews()
  const [page, setPage] = useState(1)
  const [sortBy, setSotyBy] = useState('publishedAt')
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [articleList, setArticleList] = useState(dummyNewsList.articles)
  const [totalResults, setTotalResults] = useState(0)
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const showStickyBarRef = useRef()
  const pageSize = 12
  const totalPage = getTotalPage(totalResults, pageSize)
  const isDisabled = (loading || keyword === '')
  const { encodeKeyword } = useParams() 
  let Result = <></>
  let CategoryTabs = <></>

  const handleSearchChange = (inputValue) => {
    // 處理第一個字不能為空白
    const trimmedValue = inputValue.trimStart()
    // 不能超過限制字元數量
    if (encodeURI(trimmedValue).length <= keywordMaxLength) {
      setKeyword(trimmedValue)
    }
    
    if (inputValue === '') {
      // 當 input 的值為空時，載入（當前國家＋當前分類）的第一頁文章
      setKeyword(inputValue)
    }
  }

  // 處理當搜尋框按下 Enter
  const handleSearchEnter = (inputValue) => {
    const trimmedValue = inputValue.trim()
    setKeyword(trimmedValue)
    // setLoading(true)
    setPage(1)
    // 載入（當前國家+當前分類+此搜尋結果）的第一篇文章
  }

  // 處理搜尋框 blur 事件，keyword 要去掉前後空白
  const handleSearchBlur = () => {
    setKeyword(keyword.trim())
  }

  const handleCategoryChange = (inputValue) => {
    setCategory(inputValue)
    // setLoading(true)
    setPage(1)
    // 載入（當前國家+此分類）的第一頁文章
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
          
        </>
      )
    }
  }

  if (!isArrayEmpty(categoryList)) {
    const tempCategoryList = [
      {
        value: 'all',
        displayName: 'All'
      },
      ...categoryList
    ]
    CategoryTabs = tempCategoryList.map((categoryItem) => {
      return (
        <RadioTabs.Tab
          key={categoryItem.value}
          name='category'
          radio={categoryItem}
          checkedValue={category}
          onChange={(inputValue) => {
            handleCategoryChange(inputValue)
          }}
          disabled={isDisabled}
        />
      )
    })
  }

  return (
    <>
      <Head title='Search' />
      <FormArea className={styles['main-header']['self']}>
        <div className={styles['main-header']['container']}>
          <div className={styles['container-inner']}>
            <div className='row'>
              <p
                className={`
                  ${styles['main-header']['result-text']}
                  ${(isDisabled) ? 'invisible' : ''}
                `}
              >
                Showing {formatNumber(totalResults)} results for:
              </p>
              <div className={styles['main-header']['search-bar-wrap']}>
                <input
                  type='text'
                  placeholder={`Search NEWS API (Max length: ${keywordMaxLength} chars)`}
                  onChange={(event) => {
                    handleSearchChange(event.target.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSearchEnter(event.target.value);
                    }
                  }}
                  onBlur={() => {
                    handleSearchBlur()
                  }}
                  value={keyword}
                  autoComplete='off'
                  disabled={(loading)}
                />
                <div className=''>
                  <CiSearch className='' />
                </div>
              </div>
              <div className={styles['main-header']['sort-by-select-wrap']}>

              </div>
            </div>
          </div>
        </div>
      </FormArea>
      
      
      <Main>
        <FormArea className={styles['container-inner']}>
          <article className='w-full'>
            <div className={(isArrayEmpty(articleList)) ? 'hidden' : ''}>
              <Header>
                <RadioTabs>
                  { CategoryTabs }
                </RadioTabs>
              </Header>
              <div className='mt-2'>
                <ResultsText
                  page={page}
                  pageSize={pageSize}
                  total={totalResults}
                  className={`
                    px-3
                    ${(totalResults === 0) ? 'invisible' : ''}
                  `}
                />
              </div>
            </div>
            <div ref={showStickyBarRef}>
              { Result }
            </div>
          </article>
        </FormArea>
      </Main>
    </>
  )
}

export default SearchPage