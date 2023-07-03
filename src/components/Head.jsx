import PropTypes from 'prop-types'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { srcFavicon, srcJpgHomeBanner1x } from '/assets/images'

const baseUrl = `https://${process.env.REACT_DOMAIN_NAME}`

/**
 * Head (meta/link...)
 * @param {object} props - 屬性
 * @param {string} props.title - 標題 (預設：'')
 * @param {string} props.description - 描述 (預設：'')
 * @param {string} props.srcImage - 圖片 (預設：'')
 * @returns 
 */
const Head = ({
  title='',
  description='',
  srcImage=''
}) => {
  const location = useLocation()
  const seo = {
    title: `NEWS API ${(title !== '') && `- ${title}`}`,
    description: (description !== '') ? description : '此新聞網站使用 React 框架以及串接 News API 製作而成，感謝您的閱覽。' ,
    image: (srcImage !== '') ? srcImage : srcJpgHomeBanner1x,
    url: `${baseUrl}${location.pathname}`
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />

          <title> { seo.title } </title>
          <meta property='og:title' content={ seo.title } />
          <meta property='og:site_name' content={ seo.title } />
          <meta property='og:description' content={ seo.description } />
          <meta property='og:image' content={ seo.image } />
          <meta property='og:rul' content={ seo.url } />
          <meta property='og:type' content='website' />
          <meta name='description' content={ seo.description } />
          <link rel='canonical' href={ seo.url } />
          <link rel='shortcut icon' href={ srcFavicon } type='image/x-icon' />
          <link rel='apple-touch-icon' href={ srcFavicon } />
        </Helmet>
      </HelmetProvider>
      <h1 className='absolute -z-[1] top-0 left-0 opacity-0'>{`${seo.title}-${seo.description}`}</h1>
    </>
  )
}
Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  srcImage: PropTypes.string
}

export default Head