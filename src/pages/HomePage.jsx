import { useState } from 'react'
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
import { categories, dummyNewsList } from '/data'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Main, MainLeftSide, MainRightSide, MainRightSideSection } from '/layouts'
import { ArticleCard, Button, Header, RadioTabList, ResultsText, Search } from '/components'


/**
 * 主 Banner 輪播前後箭頭按鈕
 * @param {func} onClick
 * @param {string} arrowDirection
 * @returns 
 */
const MainBannerSliderArrowButton = ({ onClick, arrowDirection }) => {
  let buttonClassName = stylesHomePage['main-banner-slider-prev-button']
  let arrowClassName = stylesHomePage['main-banner-slider-arrow']
  let arrowIcon = <AiOutlineLeft className={`${arrowClassName} ${stylesHomePage['main-banner-slider-left-arrow']}`} />
  let title = 'Prev article'

  if (arrowDirection === 'right') {
    buttonClassName = stylesHomePage['main-banner-slider-next-button']
    arrowIcon = <AiOutlineRight className={`${arrowClassName} ${stylesHomePage['main-banner-slider-right-arrow']}`} />
    title = 'Next article'
  }

  return (
    <button
      type='button'
      aria-label={title}
      title={title}
      onClick={onClick}
      className={`
        ${stylesHomePage['main-banner-slider-button']}
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
 * @param {bool} showSlider 是否顯示 Slider
 * @param {array} articles  文章資料
 * @returns 
 */
const MainBannerSlider = ({ showSlider, articles }) => {
  if (showSlider) {
    articles = articles.slice(0,3)

    const sliderSettings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnHover: true,
      prevArrow: <MainBannerSliderArrowButton arrowDirection='left' />,
      nextArrow: <MainBannerSliderArrowButton arrowDirection='right' />
    }

    const MainBannerSlides = articles.map((article, index) => {
      return (
        <section
          key={`main-banner-article-${index}`}
          className={stylesHomePage['main-banner-slide']}
        >
          <div className={stylesHomePage['main-banner-slide-container']}>
            <a
              href={article.url}
              title={article.title}
              aria-label={article.title}
              target='_blank'
              rel='noreferrer noopener'
              className={stylesHomePage['main-banner-slide-link']}
            >
              <p className={stylesHomePage['main-banner-slide-time']}>
                {moment(article.publishedAt).format('ll')}
              </p>
              <h2 className={stylesHomePage['main-banner-slide-title']}>
                {article.title}
              </h2>
            </a>
          </div>
        </section>
      )
    })

    return (
      <article className={stylesHomePage['main-banner-slider']}>
        <Slider {...sliderSettings}>
          { MainBannerSlides }
        </Slider>
      </article>
    )
  }
  return (
    <></>
  )
}
MainBannerSlider.propTypes = {
  showSlider: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired
}


/**
 * 主 Banner
 * @returns 
 */
const MainBanner = () => {
  let articles = dummyNewsList.articles
  const showSlider = (Array.isArray(articles) && articles.length !== 0) ? true : false
  
  return (
    <div className={stylesHomePage['main-banner']}>
      <picture className={stylesHomePage['main-banner-picture']}>
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
          className={stylesHomePage['main-banner-img']}
          loading='true'
        />
      </picture>
      <div className={stylesHomePage['main-banner-mask']}></div>
      <MainBannerSlider
        showSlider={showSlider}
        articles={articles}
      />
    </div>
  )
}

/**
 * 首頁
 * @returns 
 */
const HomePage = () => {
  const [category, setCategory] = useState('general')
  const articles = dummyNewsList.articles

  const handleCategoryRadioChange = (radioValue) => {
    setCategory(radioValue)
  }

  const ArticleList = articles.map((article, index) => {
    return (
      <ArticleCard 
        key={`article-${index}`}
        article={article}
        className='mb-3'
      />
    )
  })

  return (
    <>
      <MainBanner />
      <Main>
        <MainLeftSide>
          <article>
            <Header title={`Don't Miss`}>
              <RadioTabList
                name='category'
                tabs={categories}
                checkedValue={category}
                onChange={handleCategoryRadioChange}
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
                    start='1'
                    end='12'
                    total='9800'
                    className='px-3 text-center md:text-left'
                  />
                </div>
              </div>

              <div className='mt-4 px-3 columns-1 sm:columns-2 md:columns-3 gap-3'>
                { ArticleList }
              </div>
              <Button
                text='Load More'
                styled='outlined'
                display='block'
                className='mx-auto mt-6 max-w-[160px]'
              />
            </div>
          </article>
        </MainLeftSide>

        <MainRightSide
          isContentSticky={true}
        >
          <MainRightSideSection contentType='about'/>
          <MainRightSideSection contentType='connect'/>
        </MainRightSide>
      </Main>
    </>
  )
}

export default HomePage