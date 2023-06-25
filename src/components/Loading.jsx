import styles from '/styles/loading.styles'
/**
 * Loading
 */
const Loading = () => {
  return (
    <div className={styles['self']}>
      <div className={styles['loading-wrap']}>
        <span className={styles['loading']}></span>
      </div>
    </div>
  )
}

export default Loading