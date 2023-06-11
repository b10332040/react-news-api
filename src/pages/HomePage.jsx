import moment from 'moment'
import PropTypes from 'prop-types'
import { stylesHomePage } from 'styles'
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
} from 'images'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { dummyNewsList } from 'data'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const MainBannerPrevArrow = ({ onClick }) => {
  return (
    <button
      type='button'
      aria-label='Prev article'
      title='Prev article'
      onClick={onClick}
      className={`
        ${stylesHomePage['main-banner-slide-button']}
        ${stylesHomePage['main-banner-slide-prev-button']}
      `}
    >
      <AiOutlineLeft className={stylesHomePage['main-banner-slide-arrow']} />
    </button>
  )
}
MainBannerPrevArrow.propTypes = {
  onClick: PropTypes.func
}

const MainBannerNextArrow = ({ onClick }) => {
  return (
    <button
      type='button'
      aria-label='Prev article'
      title='Prev article'
      onClick={onClick}
      className={`
        ${stylesHomePage['main-banner-slide-button']}
        ${stylesHomePage['main-banner-slide-next-button']}
      `}
    >
      <AiOutlineRight className={stylesHomePage['main-banner-slide-arrow']} />
    </button>
  )
}
MainBannerNextArrow.propTypes = {
  onClick: PropTypes.func
}


/**
 * 主 Banner 輪播
 * @param {bool} showSlider 是否顯示 Slider
 * @param {array} articles  文章資料
 * @returns 
 */
const MainBannerSlider = ({ showSlider, articles }) => {
  if (showSlider) {
    let MainBannerSlides = <></>
    const sliderSettings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnHover: true,
      prevArrow: <MainBannerPrevArrow />,
      nextArrow: <MainBannerNextArrow />
    }

    articles = articles.slice(0,3)

    MainBannerSlides = articles.map((article, index) => {
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
  const showSlider = Array.isArray(articles) ? true : false
  
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
  return (
    <>
      <MainBanner />
    </>
  )
}

export default HomePage