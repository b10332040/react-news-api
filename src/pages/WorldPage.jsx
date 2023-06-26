import PropTypes from 'prop-types'
import { dummyNewsList } from '/data'
import { Main, Header, StickyBar, Popup, Waterfall, InnerPageBanner } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, RadioTabList, ResultsText, Search, NoResults } from '/components'
import { useApp, useNews } from '/hooks'
import { useEffect, useRef, useState } from 'react'
import { formatNumber, isArrayEmpty, isExisted, memoize } from '/utils'
import { useParams } from 'react-router-dom'

/**
 * 文章瀑布流
 * @param {object} props - 屬性
 * @param {array} props.articles - 文章資料
 * @returns 
 */
const ArticlesWaterfall = ({ articles }) => {
  if (isArrayEmpty(articles)) {
    return <></>
  }

  const Articles = articles.map((article, index) => {
    return (
      <ArticleCard 
        key={`article-${index}`}
        article={article}
      />
    )
  })

  return (
    <Waterfall className='px-3 mt-3'>
      { Articles }
    </Waterfall>
  )
}
ArticlesWaterfall.propTypes = {
  articles: PropTypes.array
}
const MemoizedArticlesWaterfall = memoize(ArticlesWaterfall)

/**
 * 各國新聞
 * @returns 
 */
const WorldPage = () => {
  const { keywordMaxLength, categoryList, continentList, countryList, continentMap, countryMap, getTotalPage } = useNews()
  const [category, setCategory] = useState('general')
  const [keyword, setKeyword] = useState('')
  const [countryId, setCountryId] = useState('tw')
  const [continentId, setContinentId] = useState('asia')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [filterPopupMenuOpen, setFilterPopupMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addingArticles, setAddingArticles] = useState(false)
  const [articleList, setArticleList] = useState(dummyNewsList.articles)
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const { scrollLeftToCheckedRadio } = useApp()
  const showStickyBarRef = useRef()
  const continentRadioTabsRef = useRef()
  const countryRadioTabsRef = useRef()
  const { id } = useParams()
  const pageSize = 12
  const totalPage = getTotalPage({ totalResults, pageSize })
  const filterPopupMenuId = 'filterPopupMenu'
  const country = (countryId !== '' && isExisted(countryMap.get(countryId))) ? countryMap.get(countryId) : {}
  const continent = (isExisted(continentMap.get(continentId))) ? continentMap.get(continentId) : {}
  let Result = <></>
  let countryListInContent = []

  if (continent?.countryValueList && !isArrayEmpty(continent.countryValueList)) {
    continent.countryValueList.map((item) => {
      const tempCountry = countryMap.get(item)
      if (isExisted(tempCountry)) {
        countryListInContent.push(tempCountry)
      }
    })
  }

  // 當重新取得第一頁文章
  const getPageOneArticles = () => {
    // setLoading(true)
    setPage(1)
  }

  // 處理搜尋框 change 事件，處理第一個字不能為空白
  const handleSearchChange = (inputValue) => {
    const trimmedValue = inputValue.trimStart()

    // 不能超過限制字元數量
    if (encodeURI(trimmedValue).length <= keywordMaxLength) {
      setKeyword(trimmedValue)
    }
    
    if (inputValue === '') {
      // 當 input 的值為空時，載入此分類的第一頁文章
      getPageOneArticles()
      setKeyword(inputValue)
    }
  }

  // 處理當搜尋框按下 Enter
  const handleSearchEnter = (inputValue) => {
    const trimmedValue = inputValue.trim()
    getPageOneArticles()
    setKeyword(trimmedValue)

    // 載入此分類+搜尋結果的第一頁文章
  }

  // 處理搜尋框 blur 事件，keyword 要去掉前後空白
  const handleSearchBlur = () => {
    setKeyword(keyword.trim())
  }

  // 處理 load more click 事件
  const handleLoadMoreClick = () => {
    setPage(page + 1)
    setAddingArticles(true)

    // 載入此分類+搜尋結果的下一頁文章
  }

  // 處理 category change 事件
  const handleCategoryRadioChange = (inputValue) => {
    getPageOneArticles()
    setCategory(inputValue)
    // 載入此分類的第一頁文章
  }

  // 滾動到選取的 radio
  

  // 判斷是否有傳入國家代碼，並判斷該代碼是否存在
  useEffect(() => {
    if (isExisted(id)) {
      if (isExisted(countryMap.get(id))) {
        const tempCountry = countryMap.get(id)
        setCountryId(id)
        setContinentId((tempCountry?.continentValue) ? tempCountry?.continentValue : '')
        
      } else {
        setCountryId('')
        setContinentId('asia')
        setArticleList([])
        setNoResultsMessage('There is currently no news for this country.')
      }

    } else {
      console.log('param no id')
    }
  }, [id, countryMap, continentMap])

  useEffect(() => {
    scrollLeftToCheckedRadio(continentRadioTabsRef, continentId)
  },[continentId, scrollLeftToCheckedRadio])

  useEffect(() => {
    scrollLeftToCheckedRadio(countryRadioTabsRef, countryId)
  },[countryId, scrollLeftToCheckedRadio])

  if (loading) {
    Result = (
      <div className='w-full h-[120px]'>
        <Loading />
      </div>
    )
  } else {
    if (isArrayEmpty(articleList)) {
      Result = <NoResults message={noResultsMessage} />

    } else {
      Result = (
        <>
          <MemoizedArticlesWaterfall articles={articleList} />
          <Button
            title='Load More'
            styled='outlined'
            display='block'
            className={`
              mx-auto mt-6 max-w-[160px]
              ${!(totalPage > page) && 'invisible'}
            `}
            disabled={addingArticles}
            processing={addingArticles}
            onClick={handleLoadMoreClick}
          >
            Load More
          </Button>
        </>
      )
    }
  }

  return (
    <>
      <Head title='World' />
      <StickyBar showStickyBarRef={showStickyBarRef}>
        <div className='row items-center h-full'>
          <div className='col w-1/2 md:w-3/12'>
            <ResultsText
              page={page}
              pageSize={pageSize}
              total={totalResults}
              className={`
                'my-3 lg:my-0'
                ${(totalResults === 0) && 'invisible'}
              `}
            />
          </div>
          <div className='col w-1/2 md:w-9/12 flex flex-wrap justify-end'>
            <FormArea className='hidden md:block md:max-w-[calc(100%-44px)]'>
              <RadioTabList
                name='category'
                radios={categoryList}
                checkedValue={category}
                onChange={(inputValue) => {
                  handleCategoryRadioChange(inputValue)
                }}
              />
            </FormArea>
            <StickyBar.IconButton
              title='Open filter popup menu'
              icon='filter'
              popupId={filterPopupMenuId}
              popupOpen={filterPopupMenuOpen}
              onClick={() => {
                setFilterPopupMenuOpen(true)
              }}
              className='border-l-2 border-[--theme-gray-200]'
            />
          </div>
        </div>
      </StickyBar>
      
      <Popup
        open={filterPopupMenuOpen}
        popupId={filterPopupMenuId}
        setOpen={setFilterPopupMenuOpen}
        overScreenHeight={false}
        dialogFullInMobile={true}
        backdropVisibleInMobile={true}
      >
        <Popup.Dialog>
          <Popup.Header>
            <Popup.Title>
              Filter
            </Popup.Title>
          </Popup.Header>
          <Popup.Body>
            <Popup.TitleInBody>
              Category
            </Popup.TitleInBody>
            <FormArea className='mb-3'>
              <Popup.RadioTabsInBody
                radios={categoryList}
                name='category'
                checkedValue={category}
                onChange={(inputValue) => {
                  handleCategoryRadioChange(inputValue)
                }}
              />
            </FormArea>
          </Popup.Body>
          <Popup.Footer>
            <Button
              title={`${formatNumber(totalResults)} results`}
              display='block'
              size='lg'
              onClick={() => {
                setFilterPopupMenuOpen(false)
              }}
            >
              {formatNumber(totalResults)} results
            </Button>
          </Popup.Footer>
        </Popup.Dialog>
      </Popup>

      <InnerPageBanner bannerType='world'>
        <InnerPageBanner.Title>
          World
        </InnerPageBanner.Title>
        <InnerPageBanner.RadioTabsWrap>
          <InnerPageBanner.RadioTabs
            radioTabsRef={continentRadioTabsRef}
            radios={continentList}
            mode='light'
            name='continent'
            checkedValue={continentId}
            onChange={(inputValue) => {
              setContinentId(inputValue)
            }}
          />
          <InnerPageBanner.RadioTabs
            radioTabsRef={countryRadioTabsRef}
            radios={countryListInContent}
            mode='dark'
            name='country'
            checkedValue={countryId}
            onChange={(inputValue) => {
              setCountryId(inputValue)
            }}
          />
        </InnerPageBanner.RadioTabsWrap>
      </InnerPageBanner>

      <Main>
        <Main.LeftSide>
          <FormArea>
             <article>
              <Header
                title={(country?.displayName) ? country?.displayName : `Don't Miss`}
              >
                <RadioTabList
                  name='category'
                  radios={categoryList}
                  checkedValue={category}
                  onChange={(inputValue) => {
                    handleCategoryRadioChange(inputValue)
                  }}
                />
              </Header>
              <div>
                <div className='row mt-3 items-center'>
                  <div className='col w-full md:w-1/2'>
                    <Search
                      onChange={(inputValue) => {
                        handleSearchChange?.(inputValue)
                      }}
                      onBlur={(inputValue) => {
                        handleSearchBlur?.(inputValue)
                      }}
                      handleEnter={(inputValue) => {
                        handleSearchEnter?.(inputValue)
                      }}
                      placeholder={`Max length: ${keywordMaxLength} chars`}
                      value={keyword}
                      className='ml-auto px-3 md:max-w-[320px]'
                    />
                  </div>
                  <div className='col w-full mt-2 md:mt-0 md:w-1/2 md:order-first'>
                    <ResultsText
                      page={page}
                      pageSize={pageSize}
                      total={totalResults}
                      className={`
                        px-3 text-center md:text-left
                        ${(totalResults === 0) && 'invisible'}
                      `}
                    />
                  </div>
                </div>
                <div ref={showStickyBarRef}>
                  { Result }
                </div>
              </div>
            </article> 
          </FormArea>
        </Main.LeftSide>

        <Main.RightSide
          isContentSticky={true}
        >
          <Main.RightSideSection contentType='about'/>
          <Main.RightSideSection contentType='connect'/>
        </Main.RightSide>
      </Main>
    </>
  )
}

export default WorldPage