import PropTypes from 'prop-types'
import { Main, Header, StickyBar, Popup, Waterfall, InnerPageBanner } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, RadioTabs, ResultsText, Search, NoResults, RadioList, ScrollingRadioTabs } from '/components'
import { useNews, usePagination } from '/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createRadios, formatNumber, isArrayEmpty, isEncodedUrl, isExisted, memoize, scrollToCheckedRadio } from '/utils'
import { apiNewsTopHeadlines, getApiNewsResult } from '/api/apiNews'

/**
 * 文章瀑布流
 * @param {object} props - 屬性
 * @param {array} props.articleList - 文章資料
 * @returns 
 */
const ArticlesWaterfall = ({ articleList }) => {
  if (isArrayEmpty(articleList)) {
    return <></>
  }

  const Articles = articleList.map((article, index) => {
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
  articleList: PropTypes.array
}
const MemoizedArticlesWaterfall = memoize(ArticlesWaterfall)

const defaultState = {
  page: 1,
  loading: true,
  keyword: '',
  category: 'general',
  countryId: 'us',
  continentId: 'northAmerica',
  articleList: [],
  totalResults: 0,
  popupMenuOpen: false,
  noResultsMessage: '',
  popupContentType: 'upper',
  addingArticleList: false
}

/**
 * 各國新聞
 * @returns 
 */
const WorldPage = () => {
  const { keywordMaxLength, categoryList, continentList, countryList, continentMap, countryMap } = useNews()
  const [page, setPage] = useState(defaultState.page)
  const [loading, setLoading] = useState(defaultState.loading)
  const [keyword, setKeyword] = useState(defaultState.keyword)
  const [category, setCategory] = useState(defaultState.category)
  const [countryId, setCountryId] = useState(defaultState.countryId)
  const [continentId, setContinentId] = useState(defaultState.continentId)
  const [articleList, setArticleList] = useState(defaultState.articleList)
  const [totalResults, setTotalResults] = useState(defaultState.totalResults)
  const [popupMenuOpen, setPopupMenuOpen] = useState(defaultState.popupMenuOpen)
  const [noResultsMessage, setNoResultsMessage] = useState(defaultState.noResultsMessage)
  const [popupContentType, setPopupContentType] = useState(defaultState.popupContentType)
  const [countrySearchList, setCountrySearchList] = useState(countryList)
  const [addingArticleList, setAddingArticleList] = useState(defaultState.addingArticleList)
  const popupBodyRef = useRef(null)
  const showStickyBarRef = useRef(null)
  const countryRadioTabsRef = useRef(null)
  const categoryRadioTabsRef = useRef(null)
  const continentRadioTabsRef = useRef(null)
  const categoryRadioTabsOnStickyBarRef = useRef(null)
  const pageSize = 12
  const { totalPage } = usePagination({ pageSize: pageSize, total: totalResults })
  const country = (countryId !== '' && isExisted(countryMap.get(countryId))) ? countryMap.get(countryId) : {}
  const continent = (continentId !== '' && isExisted(continentMap.get(continentId))) ? continentMap.get(continentId) : {}
  const isDisabled = (loading || addingArticleList)
  const filterPopupMenuId = 'filterPopupMenu'
  const isUpperContentInPopup = (popupContentType === 'upper') 
  let countryListInContinent = []
  let Result = <></>
  let CountryItemsInPopup = <></>
  let CategoryTabsInPopup = <></>
  let CategoryScrollingTabs = <></>
  let ContinentTabsInBanner = <></>
  let CountryInContinentTabsInBanner = <></>

  // 取得選到的洲包含的所有國家資料
  if (continent?.countryValueList && !isArrayEmpty(continent.countryValueList)) {
    continent.countryValueList.map((item) => {
      const tempCountry = countryMap.get(item)
      if (isExisted(tempCountry)) {
        countryListInContinent.push(tempCountry)
      }
    })
  }

  // 呼叫 API 取得文章
  const getArticleListAsync = useCallback(async (data) => {
    let tempQ = ''

    // 修改狀態
    if (data?.page) {
      setAddingArticleList(true)
      setPage(data.page)
    } else {
      setLoading(true)
      setPage(1)
    }
    if (data?.country) {
      setCountryId(data.country)
    }
    if (data?.category) {
      setCategory(data.category)
    }
    if (data?.q) {
      setKeyword((isEncodedUrl(data.q)) ? decodeURI(data.q) : data.q)
      tempQ = isEncodedUrl(data.q) ? data.q : encodeURI(data.q)
    } else {
      setKeyword('')
    }
    
    // 呼叫 API
    const response = await apiNewsTopHeadlines({
      ...data,
      pageSize: pageSize,
      q: tempQ
    })
    const result = getApiNewsResult(response)
    if (result.status === 'ok') {
      setTotalResults((result?.totalResults) ? result.totalResults : 0)
      // 判斷是否跟 API 要非第一頁資料
      if (data?.page && data.page !== 1) {
        // 是 -> 更新時保留舊的文章列表 + 新的文章列表
        setArticleList((prevArticleList) => {
          return [
            ...prevArticleList,
            ...result.articles
          ]
        })
      } else {
        // 否 -> 更新新的文章列表
        setArticleList(result.articles)
      }
      setNoResultsMessage('')
    } else {
      setTotalResults(0)
      setArticleList([])
      setNoResultsMessage((result?.message) ? result.message : '')
    }
    // console.log(result)
    console.log('World page: get article list')
    setLoading(false)
    setAddingArticleList(false)
  }, [])
  
  // 載入（預設國家 + 預設分類）的第一頁文章
  useEffect(() => {
    getArticleListAsync({
      country: defaultState.countryId,
      category: defaultState.category
    })
  }, [getArticleListAsync])
  
  // 當洲 (continentId) / 國家 (countryId) 改變
  useEffect(() => {
    // 洲標籤列表列表自動滾動到選到的洲
    scrollToCheckedRadio({
      radiosWrap: continentRadioTabsRef,
      value: continentId
    })
    // 國家標籤列表列表自動滾動到選到的國家
    scrollToCheckedRadio({
      radiosWrap: countryRadioTabsRef,
      value: countryId
    })
  },[continentId, countryId])

  // 當國家 (countryId) 改變
  useEffect(() => {
    // 設定洲（該國家屬於哪洲）
    if (countryId !=='' && isExisted(countryMap.get(countryId))) {
      const tempCountry = countryMap.get(countryId)
      if (tempCountry?.continentValue) {
        setContinentId(tempCountry.continentValue)
      }
    }
    // 彈跳視窗國家列表自動滾動到選到的國家
    scrollToCheckedRadio({
      direction: 'top',
      radiosWrap: popupBodyRef,
      value: countryId
    })
  },[countryId, countryMap])

  // 當類型 (category) 改變
  useEffect(() => {
    // 類型標籤列表（包含 sticky bar 上的）自動滾動到選到的類型
    scrollToCheckedRadio({
      radiosWrap: categoryRadioTabsOnStickyBarRef,
      value: category
    })
    scrollToCheckedRadio({
      radiosWrap: categoryRadioTabsRef,
      value: category
    })
  },[category])

  // 當彈跳視窗內容 (popupContentType) 改變
  useEffect(() => {
    if (popupContentType === 'country') {
      // 彈跳視窗國家列表自動滾動到選到的國家
      scrollToCheckedRadio({
        direction: 'top',
        radiosWrap: popupBodyRef,
        value: countryId
      })
    }
  }, [popupContentType, countryId])


  // 處理國家改變
  const handleCountryIdChange = (inputValue) => {
    // 載入（此國家 + 目前分類）的第一頁文章
    getArticleListAsync({
      country: inputValue,
      category: category
    })
  }
  // 處理分類改變
  const handleCategoryChange = (inputValue) => {
    // 載入（此分類 + 當前國家）的第一頁文章
    getArticleListAsync({
      country: countryId,
      category: inputValue
    })
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
  // 處理關鍵字提交
  const handleKeywordSubmit = (inputValue) => {
    // 載入（此搜尋結果 + 當前國家 + 當前分類）的第一篇文章
    getArticleListAsync({
      country: countryId,
      category: category,
      q: inputValue.trim()
    })
  }
  // 處理關鍵字失去焦點，關鍵字要去掉前後空白
  const handleKeywordBlur = () => {
    setKeyword(keyword.trim())
  }

  // 處理載入更多文章
  const handleLoadMoreClick = () => {
    // 載入（當前國家 + 當前分類 + 當前搜尋結果）的下一頁文章
    getArticleListAsync({
      country: countryId,
      category: category,
      q: keyword,
      page: page + 1
    })
  }

  // 處理搜尋國家列表
  const handleSearchCountryChange = (inputValue) => {
    const trimmedValue = inputValue.trim().toLowerCase()
    if (inputValue === '') {
      setCountrySearchList(countryList)
    } else {
      const tempCountryResult = countryList.filter((item) => {
        const tempItemDisplayName = item.displayName.toLowerCase()
        return tempItemDisplayName.includes(trimmedValue)
      })
      setCountrySearchList(tempCountryResult)
    }
  }


  // 產生(包含彈跳視窗中)所有分類的標籤
  if (!isArrayEmpty(categoryList)) {
    CategoryScrollingTabs = createRadios({
      RadioComponent: ScrollingRadioTabs.Tab,
      radios: categoryList,
      name: 'category',
      checkedValue: category,
      onChange: (inputValue) => {
        handleCategoryChange(inputValue)
      },
      disabled: isDisabled
    })
    CategoryTabsInPopup = createRadios({
      RadioComponent: RadioTabs.Tab,
      radios: categoryList,
      name: 'category',
      checkedValue: category,
      onChange: (inputValue) => {
        handleCategoryChange(inputValue)
      },
      disabled: isDisabled
    })
  }
  // 產生 Banner 上所有洲的標籤
  if (!isArrayEmpty(continentList)) {
    ContinentTabsInBanner = createRadios({
      RadioComponent: InnerPageBanner.RadioTab,
      radios: continentList,
      mode: 'light',
      name: 'continent',
      checkedValue: continentId,
      onChange: (inputValue) => {
        setContinentId(inputValue)
      },
    })
  }
  // 產生 Banner 上當前洲所有國家的標籤
  if (!isArrayEmpty(countryListInContinent)) {
    CountryInContinentTabsInBanner = createRadios({
      RadioComponent: InnerPageBanner.RadioTab,
      radios: countryListInContinent,
      mode: 'dark',
      name: 'country',
      checkedValue: countryId,
      onChange: (inputValue) => {
        handleCountryIdChange(inputValue)
      },
      disabled: isDisabled
    })
  }
  // 產生彈跳視窗中所有搜尋國家結果的標籤
  if (!isArrayEmpty(countrySearchList)) {
    CountryItemsInPopup = createRadios({
      RadioComponent: RadioList.Item,
      radios: countrySearchList,
      name: 'country',
      checkedValue: countryId,
      onChange: (inputValue) => {
        handleCountryIdChange(inputValue)
      },
      disabled: isDisabled
    })
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
          <MemoizedArticlesWaterfall articleList={articleList} />
          <Button
            title='Load More'
            styled='outlined'
            display='block'
            className={`
              mx-auto mt-6 max-w-[160px]
              ${!(totalPage > page) && 'invisible'}
            `}
            disabled={addingArticleList}
            processing={addingArticleList}
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
              {(isUpperContentInPopup) ? 'Filter' : 'Country'}
            </Popup.Title>
          </Popup.Header>
          <div
            className={`
              w-full px-3 pt-1 pb-3
              ${(isUpperContentInPopup) ? 'hidden' : ''}
            `}
          >
            <Search
              placeholder='Search country'
              onChange={(inputValue) => {
                handleSearchCountryChange(inputValue)
              }}
            />
          </div>
          <Popup.Body selfRef={popupBodyRef}>
            {/* Upper content */}
            <FormArea className={(!isUpperContentInPopup) ? 'hidden' : ''}>
              <Popup.ChangeContentButtonInBody
                title='Go to select country'
                note={(country?.displayName) ? country?.displayName : ''}
                onClick={() => {
                  setPopupContentType('country')
                }}
              >
                Country
              </Popup.ChangeContentButtonInBody>
              <hr className='mb-1'/>
              <Popup.TitleInBody>
                Category
              </Popup.TitleInBody>
              <RadioTabs>
                { CategoryTabsInPopup }
              </RadioTabs>
            </FormArea>
            {/* Country content */}
            <FormArea className={(isUpperContentInPopup)  ? 'hidden' : ''}>
              <RadioList>
                { CountryItemsInPopup }
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

      <InnerPageBanner bannerType='world'>
        <InnerPageBanner.Title>
          World
        </InnerPageBanner.Title>
        <InnerPageBanner.RadioTabsWrap>
          <InnerPageBanner.RadioTabs selfRef={continentRadioTabsRef}>
            { ContinentTabsInBanner }
          </InnerPageBanner.RadioTabs>
          <InnerPageBanner.RadioTabs selfRef={countryRadioTabsRef}>
            { CountryInContinentTabsInBanner }
          </InnerPageBanner.RadioTabs>
        </InnerPageBanner.RadioTabsWrap>
      </InnerPageBanner>

      <Main>
        <Main.LeftSide>
          <FormArea>
             <article>
              <Header>
                <Header.ShortContainer>
                  <Header.Title>
                    {(country?.displayName) ? country?.displayName : `Don't Miss`}
                  </Header.Title>
                </Header.ShortContainer>
                <Header.LongContainer isContentRight={true}>
                  <ScrollingRadioTabs selfRef={categoryRadioTabsRef}>
                    { CategoryScrollingTabs }
                  </ScrollingRadioTabs>
                </Header.LongContainer>
              </Header>
              <div>
                <div className='row mt-3 items-center'>
                  <div className='col w-full md:w-1/2'>
                    <div className='px-3'>
                      <Search
                        onChange={(inputValue) => {
                          handleKeywordChange?.(inputValue)
                        }}
                        onBlur={(inputValue) => {
                          handleKeywordBlur?.(inputValue)
                        }}
                        handleEnter={(inputValue) => {
                          handleKeywordSubmit?.(inputValue)
                        }}
                        placeholder={`Max length: ${keywordMaxLength} chars`}
                        value={keyword}
                        className='ml-auto md:max-w-[320px]'
                        disabled={isDisabled}
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
                        ${(totalResults === 0) ? 'invisible' : ''}
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