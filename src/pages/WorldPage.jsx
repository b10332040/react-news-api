import PropTypes from 'prop-types'
import { dummyNewsList } from '/data'
import { Main, Header, StickyBar, Popup, Waterfall, InnerPageBanner } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, RadioTabs, ResultsText, Search, NoResults } from '/components'
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
  const { scrollLeftToCheckedRadio, getTotalPage } = useApp()
  const { keywordMaxLength, categoryList, continentList, countryList, continentMap, countryMap } = useNews()
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('general')
  const [countryId, setCountryId] = useState('')
  const [continentId, setContinentId] = useState('')
  const [articleList, setArticleList] = useState(dummyNewsList.articles)
  const [totalResults, setTotalResults] = useState(0)
  const [popupMenuOpen, setPopupMenuOpen] = useState(false)
  const [popupContentType, setPopupContentType] = useState('upper')
  const [addingArticles, setAddingArticles] = useState(false)
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const showStickyBarRef = useRef()
  const continentRadioTabsRef = useRef()
  const countryRadioTabsRef = useRef()
  const categoryRadioTabsRef = useRef()
  const categoryRadioTabsOnStickyBarRef = useRef()
  const pageSize = 12
  const totalPage = getTotalPage(totalResults, pageSize)
  const filterPopupMenuId = 'filterPopupMenu'
  const country = (countryId !== '' && isExisted(countryMap.get(countryId))) ? countryMap.get(countryId) : {}
  const continent = (continentId !== '' && isExisted(continentMap.get(continentId))) ? continentMap.get(continentId) : {}
  let Result = <></>
  let popupHeaderHasLeftArrowButton = false
  let popupTitle = ''
  let PopupContent = <></>
  let countryListInContent = []

  // 取得選到的洲包含的所有國家資料
  if (continent?.countryValueList && !isArrayEmpty(continent.countryValueList)) {
    continent.countryValueList.map((item) => {
      const tempCountry = countryMap.get(item)
      if (isExisted(tempCountry)) {
        countryListInContent.push(tempCountry)
      }
    })
  }
  

  useEffect(() => {
    if (isExisted(id)) {
      // 判斷是否有傳入國家代碼
      const tempId = id.toLowerCase()
      if (isExisted(countryMap.get(tempId))) {
        console.log('has id')
        const tempCountry = countryMap.get(tempId)
        setCountryId(tempId)
        setContinentId((tempCountry?.continentValue) ? tempCountry?.continentValue : '')
        
      } else {
        setCountryId('')
        setContinentId('asia')
        setArticleList([])
        setNoResultsMessage('There is currently no news for this country.')
      }

    } else {
      // 預設給台灣
      setCountryId('tw')
      setContinentId('asia')
    }
  }, [id, countryMap, continentMap])
  
  // 當洲 (continentId) 改變，滾動到上層的最左側
  useEffect(() => {
    scrollLeftToCheckedRadio(continentRadioTabsRef, continentId)
    scrollLeftToCheckedRadio(countryRadioTabsRef, countryId)
  },[continentId, countryId, scrollLeftToCheckedRadio])

  // 當國家 (countryId) 改變，滾動到上層的最左側
  useEffect(() => {
    scrollLeftToCheckedRadio(countryRadioTabsRef, countryId)
  },[countryId, scrollLeftToCheckedRadio])

  // 當類型 (category) 改變，滾動到上層的最左側
  useEffect(() => {
    scrollLeftToCheckedRadio(categoryRadioTabsOnStickyBarRef, category)
    scrollLeftToCheckedRadio(categoryRadioTabsRef, category)
  },[category, scrollLeftToCheckedRadio])

  // 當類型 (category) 或國家 (countryId) 改變
  // 出現 loading 效果，並把 page 改成第一頁
  useEffect(() => {
    // setLoading(true)
    setPage(1)
  }, [category, countryId])


  // 處理搜尋框 change 事件，處理第一個字不能為空白
  const handleSearchChange = (inputValue) => {
    const trimmedValue = inputValue.trimStart()

    // 不能超過限制字元數量
    if (encodeURI(trimmedValue).length <= keywordMaxLength) {
      setKeyword(trimmedValue)
    }
    
    if (inputValue === '') {
      // 當 input 的值為空時，載入此分類的第一頁文章
      setKeyword(inputValue)
    }
  }

  // 處理當搜尋框按下 Enter
  const handleSearchEnter = (inputValue) => {
    const trimmedValue = inputValue.trim()
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
    setCategory(inputValue)
    // 載入此分類的第一頁文章
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

  // 處理彈跳視窗要顯示的內容
  switch (popupContentType) {
    case 'country':
      popupHeaderHasLeftArrowButton = true
      popupTitle = 'Country'
      PopupContent = (
        <FormArea className='sm:pb-3 h-full max-h-full'>
          <div className='w-full pt-2 pb-3 sticky z-[2] top-0 left-0 bg-[--theme-gray-50]'>
            <Search
              placeholder='Search country'
            />
          </div>
          <Popup.RadioListInBody
            radios={countryList}
            name='category'
            checkedValue={countryId}
            onChange={(inputValue) => {
              setCountryId(inputValue)
            }}
          />
        </FormArea>
      )
      break

    default:
      popupTitle = 'Filter'
      PopupContent = (
        <FormArea className='sm:pb-3 h-full max-h-full'>
          <Popup.ChangeContentButtonInBody
            title='Go to select country'
            note={(country?.displayName) ? country?.displayName : ''}
            contentType='country'
          >
            Country
          </Popup.ChangeContentButtonInBody>
          <hr className='mb-1'/>
          <Popup.TitleInBody>
            Category
          </Popup.TitleInBody>
          <Popup.RadioTabsInBody
            radios={categoryList}
            name='category'
            checkedValue={category}
            onChange={(inputValue) => {
              handleCategoryRadioChange(inputValue)
            }}
          />
        </FormArea>
      )
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
              <RadioTabs
                selfRef={categoryRadioTabsOnStickyBarRef}
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
              popupOpen={popupMenuOpen}
              onClick={() => {
                setPopupMenuOpen(true)
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
        setContentType={setPopupContentType}
        overScreenHeight={false}
        dialogFullInMobile={true}
        backdropVisibleInMobile={true}
      >
        <Popup.Dialog>
          <Popup.Header
            hasLeftArrowButton={popupHeaderHasLeftArrowButton}
          >
            <Popup.Title>
              { popupTitle }
            </Popup.Title>
          </Popup.Header>
          <Popup.Body>
            { PopupContent }
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

      <InnerPageBanner bannerType='world'>
        <InnerPageBanner.Title>
          World
        </InnerPageBanner.Title>
        <InnerPageBanner.RadioTabsWrap>
          <InnerPageBanner.RadioTabs
            selfRef={continentRadioTabsRef}
            radios={continentList}
            mode='light'
            name='continent'
            checkedValue={continentId}
            onChange={(inputValue) => {
              setContinentId(inputValue)
            }}
          />
          <InnerPageBanner.RadioTabs
            selfRef={countryRadioTabsRef}
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
                <RadioTabs
                  selfRef={categoryRadioTabsRef}
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
                    <div className='px-3'>
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
                        className='ml-auto md:max-w-[320px]'
                      />
                    </div>
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