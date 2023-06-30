import PropTypes from 'prop-types'
import styles from '/styles/articleCard.styles'
import { formateDateDiff, getRandomNum, isExisted } from '/utils'
import { srcDefaultImage } from '/assets/images'

/**
 * 文章卡片
 * @param {object} props - 屬性
 * @param {string} props.type - 類型 ※未提供則隨機顯示
 * @param {object} props.article - 文章資料
 * @param {string} props.className - 樣式（預設：''）
 * @returns
 */
const ArticleCard = ({
  type,
  article,
  className=''
}) => {
  const typeList = ['base', 'cover', 'text'] // （base：圖＋文 / cover：文壓圖 / text：純文字)
  const hasLink = (article?.url) ? true : false
  const title = (article?.title) ? article.title : ''
  const dateDiff = (article?.publishedAt) ? formateDateDiff(article.publishedAt) : ''
  const sourceName = (article.source?.name) ? article.source.name : ''
  const randomType = !(isExisted(type))
  const urlToImage = (article?.urlToImage) ? article.urlToImage : srcDefaultImage // 沒有圖片給預設圖片
  let LinkCover = <></>
  let TopImage = <></>

  if (randomType) {
    type = typeList[getRandomNum(2)]
  }

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

  if (type !== 'text') {
    TopImage = (
      <div
        className={(type === 'base') ? styles['top-img'] : styles['bg-img']}
      >
        <div>
          <img
            src={urlToImage}
            alt={`Image about ${title}`}
            title={`Image about ${title}`}
            aria-label={`Image about ${title}`}
            loading='true'
            className={styles['img']}
          />
        </div>
      </div>
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
      { TopImage }
      <div className={styles['body']}>
        <h3 
          className={`
            ${styles['title']}
            ${(type === 'cover') ? styles['title--cover'] : styles['title--no-cover']}
          `}
        >
          { title }
        </h3>

        <p 
          className={`
            ${styles['note']}
            ${(type === 'cover') ? styles['note--cover'] : styles['note--no-cover']}
          `}
        >
          {`${sourceName}${(sourceName !== '' && dateDiff !== '') ? ' · ' : ''}${dateDiff}`}
        </p>
      </div>
    </section>
  )
}
ArticleCard.propTypes = {
  type: PropTypes.string,
  article: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default ArticleCard