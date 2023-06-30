import styles from '/styles/articleCardListMode.styles'
import moment from 'moment'
import PropTypes from 'prop-types'
import { srcDefaultImage } from '/assets/images'

/**
 * 文章卡片 (列表模式)
 * @param {object} props - 屬性
 * @param {object} props.article - 文章資料
 * @param {string} props.className - 樣式（預設：''）
 * @returns
 */
const ArticleCardListMode = ({
  article,
  className=''
}) => {
  const hasLink = (article?.url) ? true : false
  const title = (article?.title) ? article.title : ''
  const date = (article?.publishedAt) ? moment(article.publishedAt).format('ll') : ''
  const description = (article?.description) ? article?.description : ''
  const sourceName = (article.source?.name) ? article.source.name : ''
  const urlToImage = (article?.urlToImage) ? article.urlToImage : srcDefaultImage // 沒有圖片給預設圖片
  let LinkCover = <></>

  if (hasLink) {
    LinkCover = (
      <a
        href={article.url}
        target='_blank'
        rel='noreferrer noopener'
        className={styles['link-cover']}
      ></a>
    )
  }

  return (
    <section
      className={`
        ${styles['self']}
        ${(hasLink) ? styles['self--has-link'] : ''}
        ${className}
      `}
    >
      { LinkCover }
      <div className={styles['body']}>
        <h3 className={styles['title']}>
          { title }
        </h3>
        <p className={styles['description']}>
          { description }
        </p>
        <p className={styles['note']}>
          {`${sourceName}${(sourceName !== '' && date !== '') ? ' · ' : ''}${date}`}
        </p>
      </div>
      <div className={styles['img-wrap']}>
        <img
          src={urlToImage}
          alt={`Image about ${title}`}
          title={`Image about ${title}`}
          aria-label={`Image about ${title}`}
          loading='true'
          className={styles['img']}
        />
      </div>
    </section>
  )
}
ArticleCardListMode.propTypes = {
  type: PropTypes.string,
  article: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default ArticleCardListMode