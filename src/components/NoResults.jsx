import PropTypes from 'prop-types'
import styles from '/styles/noResults.styles'
import { TbMoodEmpty } from 'react-icons/tb'

/**
 * 無結果
 * @param {object} props - 屬性
 * @param {string} props.message - 訊息（預設：''）
 */
const NoResults = ({ message='' }) => {
  return (
    <div className={styles['self']}>
      <div className={styles['content']}>
        <TbMoodEmpty className={styles['icon']} />
        <h3 className={styles['title']}>
          Sorry! No result found
        </h3>
        <p className={styles['message']}>
          { (message === '') ? `We couldn't find what you're looking for.` : message }
        </p>
      </div>
    </div>
  )
}
NoResults.propTypes = {
  message: PropTypes.string,
}

export default NoResults