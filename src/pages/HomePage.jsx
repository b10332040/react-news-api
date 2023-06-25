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
import { ArticleCard, Button, Head, Form, RadioTabList, ResultsText, Search } from '/components'
import { useData, useNews } from '/hooks'
import { useRef, useState } from 'react'
import { formatNumber, isArrayEmpty, memoize } from '/utils'
import Loading from '/components/Loading'


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
  const filterPopupMenuId = 'filterPopupMenu'
  const showStickyBarRef = useRef()
  const { category, setCategory, page, pageSize, totalResults } = useNews()
  const { categoryList } = useData()
  const [filterPopupMenuOpen, setFilterPopupMenuOpen] = useState(false)
  const articles = dummyNewsList.articles

  return (
    <>
      <Head title='Homepage' />
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
            <Form className='hidden md:block md:max-w-[calc(100%-44px)]'>
              <RadioTabList
                name='category'
                radios={categoryList}
                checkedValue={category}
                onChange={(inputValue) => {
                  setCategory(inputValue)
                }}
              />
            </Form>
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
            <Form className='mb-3'>
              <Popup.RadioTabsInBody
                radios={categoryList}
                name='category'
                checkedValue={category}
                onChange={(inputValue) => {
                  setCategory(inputValue)
                }}
              />
            </Form>
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

      <MemoizedMainBanner articles={articles} />

      <Main>
        <Main.LeftSide>
          <Form>
             <article>
              <Header title={`Don't Miss`}>
                <RadioTabList
                  name='category'
                  radios={categoryList}
                  checkedValue={category}
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
                  {
                    (isArrayEmpty(articles)) ?
                    <Loading />
                    :
                    <MemoizedArticlesWaterfall articles={articles} />
                  }
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
          </Form>
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