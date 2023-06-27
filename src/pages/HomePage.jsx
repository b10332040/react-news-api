import moment from 'moment'
import PropTypes from 'prop-types'
import styles from '/styles/homePage.styles'
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
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { dummyNewsList } from '/data'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Main, Header, StickyBar, Popup, Waterfall } from '/layouts'
import { ArticleCard, Button, Head, Loading, FormArea, RadioTabs, ResultsText, Search, NoResults } from '/components'
import { useApp, useNews } from '/hooks'
import { useEffect, useRef, useState } from 'react'
import { formatNumber, isArrayEmpty, memoize } from '/utils'

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

const MemoizedMainBanner = memoize(MainBanner)
const MemoizedArticlesWaterfall = memoize(ArticlesWaterfall)

/**
 * 首頁
 * @returns 
 */
const HomePage = () => {
  const { keywordMaxLength, categoryList } = useNews()
  const { getTotalPage, scrollToCheckedRadio } = useApp()
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('general')
  const [articleList, setArticleList] = useState(dummyNewsList.articles)
  const [totalResults, setTotalResults] = useState(0)
  const [popupMenuOpen, setPopupMenuOpen] = useState(false)
  const [addingArticles, setAddingArticles] = useState(false)
  const showStickyBarRef = useRef()
  const categoryRadioTabsRef = useRef()
  const categoryRadioTabsOnStickyBarRef = useRef()
  const pageSize = 12
  const totalPage = getTotalPage(totalResults, pageSize)
  const filterPopupMenuId = 'filterPopupMenu'
  let Result = <></>

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

    // 出現 loading 效果，並把 page 改成第一頁
    // setLoading(true)
    setPage(1)
  },[category, scrollToCheckedRadio])

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
              <Header title={`Don't Miss`}>
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

export default HomePage