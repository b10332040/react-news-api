import moment from 'moment'
import PropTypes from 'prop-types'
import { stylesHomePage } from '/styles'
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
import { ArticleCard, Button, RadioTabList, ResultsText, Search } from '/components'
import { useData, useNews } from '/hooks'
import { useRef, useState } from 'react'
import { formatNumber, memoize } from '/utils'


/**
 * 主 Banner 輪播前後箭頭按鈕
 * @param {object} props - 屬性
 * @param {func} props.onClick - 處理 click 事件
 * @param {string} props.arrowDirection - 箭頭方向
 * @returns 
 */
const MainBannerSliderArrowButton = ({ onClick, arrowDirection }) => {
  let buttonClassName = stylesHomePage['main-banner-slider-arrow-button']['prev']
  let arrowClassName = stylesHomePage['main-banner-slider-arrow-button']['arrow']
  let arrowIcon = <AiOutlineLeft className={`${arrowClassName} ${stylesHomePage['main-banner-slider-arrow-button']['arrow--left']}`} />
  let title = 'Prev article'

  if (arrowDirection === 'right') {
    buttonClassName = stylesHomePage['main-banner-slider-arrow-button']['next']
    arrowIcon = <AiOutlineRight className={`${arrowClassName} ${stylesHomePage['main-banner-slider-arrow-button']['arrow--right']}`} />
    title = 'Next article'
  }

  return (
    <button
      type='button'
      aria-label={title}
      title={title}
      onClick={onClick}
      className={`
        ${stylesHomePage['main-banner-slider-arrow-button']['self']}
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
  if (!Array.isArray(articles) || articles.length === 0) {
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
        className={stylesHomePage['main-banner-slide']['self']}
      >
        <div className={stylesHomePage['main-banner-slide']['container']}>
          <a
            href={article.url}
            title={article.title}
            aria-label={article.title}
            target='_blank'
            rel='noreferrer noopener'
            className={stylesHomePage['main-banner-slide']['link']}
          >
            <p className={stylesHomePage['main-banner-slide']['time']}>
              {moment(article.publishedAt).format('ll')}
            </p>
            <h2 className={stylesHomePage['main-banner-slide']['title']}>
              {article.title}
            </h2>
          </a>
        </div>
      </section>
    )
  })

  return (
    <article className={stylesHomePage['main-banner-slider']['self']}>
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

  if (!Array.isArray(articles) || articles.length === 0) {
    Children = (
      <div>
        <div className={stylesHomePage['main-banner']['content']}>
          <h2 className={stylesHomePage['main-banner']['title']}>
            Welcome to the World !
          </h2>
        </div>
      </div>
    )
  } else {
    Children = <MainBannerSlider articles={articles.slice(0,3)}/>
  }
  
  return (
    <div className={stylesHomePage['main-banner']['self']}>
      <picture className={stylesHomePage['main-banner']['picture']}>
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
          className={stylesHomePage['main-banner']['img']}
          loading='true'
        />
      </picture>
      <div className={stylesHomePage['main-banner']['mask']}></div>
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
  if (!Array.isArray(articles) || articles.length === 0) {
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
  const filterPopupMenuId = 'filterPopupMenu'
  const filterPopupInnerContentId = 'popupCategoriesContent'
  const showStickyBarRef = useRef()
  const { category, setCategory, page, pageSize, totalResults } = useNews()
  const { categoryList, categoryMap } = useData()
  const [filterPopupMenuOpen, setFilterPopupMenuOpen] = useState(false)
  const [filterPopupCategoriesContentOpen, setFilterPopupCategoriesContentOpen] = useState(false)
  const articles = dummyNewsList.articles

  return (
    <>
      <StickyBar showStickyBarRef={showStickyBarRef}>
        <div className='row items-center h-full'>
          <div className='col w-1/2 md:w-3/12'>
            <ResultsText
              page={page}
              pageSize={pageSize}
              total={totalResults}
              className='my-3 lg:my-0'
            />
          </div>
          <div className='col w-1/2 md:w-9/12 flex flex-wrap justify-end'>
            <div className='hidden md:block md:max-w-[calc(100%-44px)]'>
              <RadioTabList
                prefix='sticky-bar'
                name='category'
                radios={categoryList}
                inputValue={category}
                onChange={(inputValue) => {
                  setCategory(inputValue)
                }}
              />
            </div>
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
      
      {/* start - filter popup */}
      <Popup
        open={filterPopupMenuOpen}
        popupId={filterPopupMenuId}
        setOpen={setFilterPopupMenuOpen}
        overScreenHeight={false}
        dialogFullInMobile={true}
        backdropVisibleInMobile={true}
        hasInnerContent={true}
      >
        <Popup.Dialog>
          <Popup.Content>
            <Popup.Header>
              <Popup.Title>
                Filter
              </Popup.Title>
            </Popup.Header>
            <Popup.Body>
              <Popup.TitleInBody>
                Category
              </Popup.TitleInBody>
              <hr/>
              <Popup.InnerContentOpenButton
                title={`Open Categories Inner Content`}
                innerContentId={filterPopupInnerContentId}
                innerContentOpen={filterPopupCategoriesContentOpen}
                setInnerContentOpen={setFilterPopupCategoriesContentOpen}
              >
                Category <span>{ categoryMap.get(category).displayName }</span>
              </Popup.InnerContentOpenButton>
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
          </Popup.Content>
          
          <Popup.Content
            innerContentId={filterPopupInnerContentId}
            innerContentOpen={filterPopupCategoriesContentOpen}
          >
            <Popup.InnerContentHeader
              setInnerContentOpen={setFilterPopupCategoriesContentOpen}
            >
              <Popup.Title>
                Category
              </Popup.Title>
            </Popup.InnerContentHeader>
            <Popup.Body>
              <div className='h-[120vh]'>
                Category inner content
              </div>
              
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
          </Popup.Content>
        </Popup.Dialog>
      </Popup>
      {/* close - filter popup */}

      <MemoizedMainBanner articles={articles} />

      <Main>
        <Main.LeftSide>
          <article>
            <Header title={`Don't Miss`}>
              <RadioTabList
                prefix='header'
                name='category'
                radios={categoryList}
                inputValue={category}
                onChange={(inputValue) => {
                  setCategory(inputValue)
                }}
              />
            </Header>
            <div>
              <div className='row mt-3 items-center'>
                <div className='col w-full md:w-1/2'>
                  <Search
                    className='ml-auto px-3 md:max-w-[320px]'
                  />
                </div>
                <div className='col w-full mt-2 md:mt-0 md:w-1/2 md:order-first'>
                  <ResultsText
                    page={page}
                    pageSize={pageSize}
                    total={totalResults}
                    className='px-3 text-center md:text-left'
                  />
                </div>
              </div>

              <div ref={showStickyBarRef}>
                <MemoizedArticlesWaterfall articles={articles} />
              </div>

              <Button
                title='Load More'
                styled='outlined'
                display='block'
                className='mx-auto mt-6 max-w-[160px]'
              >
                Load More
              </Button>
            </div>
          </article>
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