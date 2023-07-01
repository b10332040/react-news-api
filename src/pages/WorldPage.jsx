import PropTypes from 'prop-types'
import { dummyNewsList } from '/data'
import { Main, Header, StickyBar, Popup, Waterfall, InnerPageBanner } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, RadioTabs, ResultsText, Search, NoResults, RadioList, ScrollingRadioTabs } from '/components'
import { useNews, usePagination } from '/hooks'
import { useEffect, useRef, useState } from 'react'
import { createRadios, formatNumber, isArrayEmpty, isExisted, memoize, scrollToCheckedRadio } from '/utils'

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

/**
 * 各國新聞
 * @returns 
 */
const WorldPage = () => {
  const { keywordMaxLength, categoryList, continentList, countryList, continentMap, countryMap } = useNews()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('general')
  const [countryId, setCountryId] = useState('tw')
  const [continentId, setContinentId] = useState('asia')
  const [articleList, setArticleList] = useState(dummyNewsList.articles)
  const [totalResults, setTotalResults] = useState(0)
  const [popupMenuOpen, setPopupMenuOpen] = useState(false)
  const [addingArticles, setAddingArticles] = useState(false)
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const [popupContentType, setPopupContentType] = useState('upper')
  const [countrySearchList, setCountrySearchList] = useState(countryList)
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
  const isDisabled = (loading || addingArticles)
  const filterPopupMenuId = 'filterPopupMenu'
  const isUpperContentInPopup = (popupContentType === 'upper') 
  let Result = <></>
  let CountryItemsInPopup = <></>
  let CategoryTabsInPopup = <></>
  let CategoryScrollingTabs = <></>
  let ContinentTabsInBanner = <></>
  let CountryInContinentTabsInBanner = <></>
  let countryListInContinent = []

  // 取得選到的洲包含的所有國家資料
  if (continent?.countryValueList && !isArrayEmpty(continent.countryValueList)) {
    continent.countryValueList.map((item) => {
      const tempCountry = countryMap.get(item)
      if (isExisted(tempCountry)) {
        countryListInContinent.push(tempCountry)
      }
    })
  }
  
  // 載入（預設國家+預設分類）的第一頁文章
  useEffect(() => {
    // setLoading(true)
  }, [])
  
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

  
  const handleCountryIdChange = (inputValue) => {
    setCountryId(inputValue)
    // setLoading(true)
    setPage(1)
    // 載入（此國家）的第一頁文章
  }

  const handleCategoryChange = (inputValue) => {
    setCategory(inputValue)
    // setLoading(true)
    setPage(1)
    // 載入（當前國家+此分類）的第一頁文章
  }

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

  const handleLoadMoreClick = () => {
    setPage(page + 1)
    setAddingArticles(true)
    // 載入（當前國家+當前分類+當前搜尋結果）的下一頁文章
  }

  // 處理搜尋國家 change 事件
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