import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'
import { ArticleCard } from '/components'

/**
 * 瀑布流
 * @param {object} props - 屬性
 * @param {object} props.breakpointCols - 不同斷點下要顯示幾列
 * @param {string} props.className - 樣式 (預設：'')
 * @param {node} props.childrenType - 內容類型 (預設：'')
 * @param {array} props.data - 資料
 * @returns
 */
const Waterfall = ({ breakpointCols, className='', childrenType='', data }) => {
  const childrenTypeList = ['articles']
  if (!Array.isArray(data) || !childrenTypeList.includes(childrenType)) {
    return <></>
  }

  if (typeof breakpointCols === 'undefined') {
    breakpointCols={
      default: 3,
      575: 1,
      767: 2
    }
  }

  let Children = <></>

  switch (childrenType) {
    case 'articles':
      Children = data.map((article, index) => {
        return (
          <ArticleCard 
            key={`article-${index}`}
            article={article}
          />
        )
      })
      break
  }

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={`${className} flex -ml-3 w-auto`}
      columnClassName='pl-3 bg-clip-padding [&>*]:mb-3'
    >
      { Children }
    </Masonry>
  )
}
Waterfall.propTypes = {
  breakpointCols: PropTypes.object,
  className: PropTypes.string,
  childrenType: PropTypes.string,
  data: PropTypes.array.isRequired
}

export default Waterfall