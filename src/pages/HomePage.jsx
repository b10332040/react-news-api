import moment from 'moment'
import PropTypes from 'prop-types'
import styles from '/styles/homePage.styles'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { 
  srcJpgHomeBanner1x,
  srcJpgHomeBanner2x,
  srcJpgHomeBannerLg1x,
  srcJpgHomeBannerLg2x,
  srcJpgHomeBannerMd1x,
  srcJpgHomeBannerMd2x,
  srcWebpHomeBanner1x,
  srcWebpHomeBanner2x,
  srcWebpHomeBannerLg1x,
  srcWebpHomeBannerLg2x,
  srcWebpHomeBannerMd1x,
  srcWebpHomeBannerMd2x
} from '/assets/images'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Main, Header, StickyBar, Popup, Waterfall } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, ResultsText, Search, NoResults, ScrollingRadioTabs, RadioTabs } from '/components'
import { useNews, usePagination } from '/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createRadios, formatNumber, isArrayEmpty, isEncodedUrl, memoize, scrollToCheckedRadio } from '/utils'
import { apiNewsTopHeadlines, getApiNewsResult } from '/api/apiNews'

/**
 * 主 Banner 輪播前後箭頭按鈕
 * @param {object} props - 屬性
 * @param {func} props.onClick - 處理 click 事件
 * @param {string} props.arrowDirection - 箭頭方向
 * @returns 
 */
const MainBannerSliderArrowButton = ({ onClick, arrowDirection }) => {
  let buttonClassName = styles['main-banner-slider-arrow-button']['prev']
  let arrowClassName = styles['main-banner-slider-arrow-button']['arrow']
  let arrowIcon = <AiOutlineLeft className={`${arrowClassName} ${styles['main-banner-slider-arrow-button']['arrow--left']}`} />
  let title = 'Prev article'

  if (arrowDirection === 'right') {
    buttonClassName = styles['main-banner-slider-arrow-button']['next']
    arrowIcon = <AiOutlineRight className={`${arrowClassName} ${styles['main-banner-slider-arrow-button']['arrow--right']}`} />
    title = 'Next article'
  }

  return (
    <button
      type='button'
      aria-label={title}
      title={title}
      onClick={onClick}
      className={`
        ${styles['main-banner-slider-arrow-button']['self']}
        ${buttonClassName}
      `}
    >
      {arrowIcon}
    </button>
  )
}
MainBannerSliderArrowButton.propTypes = {
  onClick: PropTypes.func,
  arrowDirection:PropTypes.string.isRequired
}

/**
 * 主 Banner 輪播
 * @param {object} props - 屬性
 * @param {array} props.articles - 文章資料
 * @returns
 */
const MainBannerSlider = ({ articles }) => {
  if (isArrayEmpty(articles)) {
    return <></>
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    prevArrow: <MainBannerSliderArrowButton arrowDirection='left' />,
    nextArrow: <MainBannerSliderArrowButton arrowDirection='right' />
  }

  const MainBannerSlides = articles.map((article, index) => {
    return (
      <section
        key={`main-banner-article-${index}`}
        className={styles['main-banner-slide']['self']}
      >
        <div className={styles['main-banner-slide']['container']}>
          <a
            href={article.url}
            title={article.title}
            aria-label={article.title}
            target='_blank'
            rel='noreferrer noopener'
            className={styles['main-banner-slide']['link']}
          >
            <p className={styles['main-banner-slide']['time']}>
              {moment(article.publishedAt).format('ll')}
            </p>
            <h2 className={styles['main-banner-slide']['title']}>
              {article.title}
            </h2>
          </a>
        </div>
      </section>
    )
  })

  return (
    <article className={styles['main-banner-slider']['self']}>
      <Slider {...sliderSettings}>
        { MainBannerSlides }
      </Slider>
    </article>
  )
}
MainBannerSlider.propTypes = {
  articles: PropTypes.array.isRequired
}

/**
 * 主 Banner
 * @returns 
 */
const MainBanner = ({ articles }) => {
  let Children = <></>

  if (isArrayEmpty(articles)) {
    Children = (
      <div>
        <div className={styles['main-banner']['content']}>
          <h2 className={styles['main-banner']['title']}>
            Welcome to the World !
          </h2>
        </div>
      </div>
    )
  } else {
    Children = <MainBannerSlider articles={articles.slice(0,3)}/>
  }
  
  return (
    <div className={styles['main-banner']['self']}>
      <picture className={styles['main-banner']['picture']}>
        <source
          media='(min-width: 992px)'
          srcSet={`
            ${srcWebpHomeBannerLg1x} 1x, 
            ${srcWebpHomeBannerLg2x} 2x
          `}
          type='image/webp'
        />
        <source
          media='(min-width: 992px)'
          srcSet={`
            ${srcJpgHomeBannerLg1x} 1x, 
            ${srcJpgHomeBannerLg2x} 2x
          `}
          type='image/jpge'
        />
        <source
          media='(min-width: 768px)'
          srcSet={`
            ${srcWebpHomeBannerMd1x} 1x, 
            ${srcWebpHomeBannerMd2x} 2x
          `}
          type='image/webp'
        />
        <source
          media='(min-width: 768px)'
          srcSet={`
            ${srcJpgHomeBannerMd1x} 1x, 
            ${srcJpgHomeBannerMd2x} 2x
          `}
          type='image/jpge'
        />
        <source
          srcSet={`
            ${srcWebpHomeBanner1x} 1x, 
            ${srcWebpHomeBanner2x} 2x
          `}
          type='image/webp'
        />
        <img
          src={srcJpgHomeBanner1x}
          srcSet={`${srcJpgHomeBanner2x} 2x`}
          alt='Main banner'
          aria-label='Main banner'
          className={styles['main-banner']['img']}
          loading='true'
        />
      </picture>
      <div className={styles['main-banner']['mask']}></div>
      { Children }
    </div>
  )
}
MainBanner.propTypes = {
  articles: PropTypes.array
}

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

const MemoizedMainBanner = memoize(MainBanner)
const MemoizedArticlesWaterfall = memoize(ArticlesWaterfall)

const defaultState = {
  page: 1,
  loading: true,
  keyword: '',
  category: 'general',
  articleList: [],
  totalResults: 0,
  popupMenuOpen: false,
  noResultsMessage: '',
  addingArticleList: false
}

/**
 * 首頁
 * @returns 
 */
const HomePage = () => {
  const { keywordMaxLength, categoryList} = useNews()
  const [page, setPage] = useState(defaultState.page)
  const [loading, setLoading] = useState(defaultState.loading)
  const [keyword, setKeyword] = useState(defaultState.keyword)
  const [category, setCategory] = useState(defaultState.category)
  const [articleList, setArticleList] = useState(defaultState.articleList)
  const [totalResults, setTotalResults] = useState(defaultState.totalResults)
  const [popupMenuOpen, setPopupMenuOpen] = useState(defaultState.popupMenuOpen)
  const [noResultsMessage, setNoResultsMessage] = useState(defaultState.noResultsMessage)
  const [addingArticleList, setAddingArticleList] = useState(defaultState.addingArticleList)
  const showStickyBarRef = useRef(null)
  const categoryRadioTabsRef = useRef(null)
  const categoryRadioTabsOnStickyBarRef = useRef(null)
  const pageSize = 12
  const { totalPage } = usePagination({ pageSize: pageSize, total: totalResults })
  const isDisabled = (loading || addingArticleList)
  const filterPopupMenuId = 'filterPopupMenu'
  let Result = <></>
  let CategoryTabsInPopup = <></>
  let CategoryScrollingTabs = <></>

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

  // 載入（預設分類）的第一頁文章
  useEffect(() => {
    getArticleListAsync({
      category: defaultState.category
    })
  }, [getArticleListAsync])
  
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

  // 處理分類改變
  const handleCategoryChange = (inputValue) => {
    // 載入（此分類）的第一頁文章
    getArticleListAsync({
      category: inputValue
    })
  }
  // 處理關鍵字改變
  const handleKeywordChange = (inputValue) => {
    const tempKeyword = inputValue.trimStart()
    // 不能超過限制字元數量
    if (encodeURI(tempKeyword).length <= keywordMaxLength) {
      setKeyword(tempKeyword)
    }
  }
  // 處理關鍵字提交
  const handleKeywordSubmit = (inputValue) => {
    // 載入（此搜尋結果 + 當前分類）的第一篇文章
    getArticleListAsync({
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
    // 載入（當前分類 + 當前搜尋結果）的下一頁文章
    getArticleListAsync({
      category: category,
      q: keyword,
      page: page + 1
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

  return (
    <>
      <Head title='Home' />
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
          <Popup.Header>
            <Popup.Title>
              Filter
            </Popup.Title>
          </Popup.Header>
          <Popup.Body>
            <FormArea className='sm:pb-3 h-full max-h-full'>
              <Popup.TitleInBody>
                Category
              </Popup.TitleInBody>
              <RadioTabs>
                { CategoryTabsInPopup }
              </RadioTabs>
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

      <MemoizedMainBanner articles={articleList} />

      <Main>
        <Main.LeftSide>
          <FormArea>
             <article>
              <Header>
                <Header.ShortContainer>
                  <Header.Title>
                    Don&apos;t Miss
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

export default HomePage