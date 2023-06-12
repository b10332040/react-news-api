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
import { Main, MainLeftSide, MainRightSide } from '/layouts'
import { Header, RadioTabList } from '/components'


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
  const [category, setCategory] = useState('all')

  const handleCategoryRadioChange = (radioValue) => {
    setCategory(radioValue)
  }

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
          </article>
        </MainLeftSide>
        <MainRightSide>
          <section>
            <Header title='About' />
            <p className={stylesHomePage['about-content']} >
              HI! 我是 Anna。此新聞網站使用 React 框架以及串接
              <a
                target='_blank'
                rel='noreferrer noopener'
                className='text-link'
                href='https://newsapi.org/'
              >
                News API
              </a>
              製作而成，感謝您的閱覽。
            </p>
          </section>
          <section className='border-t-2 border-[--theme-gray-200]'>
            <Header title='Stay Connected' />
          </section>
        </MainRightSide>
      </Main>
    </>
  )
}

export default HomePage