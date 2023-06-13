import PropTypes from 'prop-types'

/**
 * 文章卡片
 * @param {string} type 類型（base：圖＋文 ※預設 / image：文壓圖 / text：純文字)
 * @param {object} article 文章資料
 * @param {string} className 樣式
 */
const ArticleCard = ({ type='base', article, className='' }) => {
  return (
    <section
      className={`
        w-full mb-3 bg-white
        ${className}
      `}
    >
      <h3>{article.title}</h3>
    </section>
  )
}
ArticleCard.propTypes = {
  type: PropTypes.string,
  article: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default ArticleCard