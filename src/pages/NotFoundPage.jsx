import styles from '/styles/notFoundPage.styles'
import { TbUfo } from 'react-icons/tb'
import { Link } from "react-router-dom"
import { Head } from '/components'

const NotFoundPage = () => {
  return (
    <div className={styles['self']}>
      <Head title='Error'/>
      <div className={styles['container']}>
        <div className={styles['icon-wrap']}>
          <TbUfo className={styles['icon']}/>
        </div>
        <h2 className={styles['404']}>
          404
        </h2>
        <h3 className={styles['title']}>
          Page Not Found
        </h3>
        <p className={styles['description']}>
          This page was not found. You may have mistyped the address or the page may have moved.
        </p>
        <Link
          to='/'
          title='Back to home'
          aria-label='Back to home'
          className={styles['link']}
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage