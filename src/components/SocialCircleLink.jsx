import PropTypes from 'prop-types'
import styles from '/styles/socialCircleLink.styles'
import { AiFillBehanceCircle, AiFillGithub, AiOutlineLink, AiTwotoneMail } from 'react-icons/ai'

/**
 * 圓圈聯絡連結
 * @param {object} props - 屬性
 * @param {string} props.to - 連結
 * @param {string} props.title - 連結文字
 * @param {string} props.icon - 連結 icon
 * @returns
 */
const SocialCircleLink = ({to, title, icon}) => {
  const iconClassName = styles['icon']
  let Icon = <AiOutlineLink className={iconClassName} />

  switch (icon) {
    case 'behance':
      Icon = <AiFillBehanceCircle className={iconClassName} />
      break

    case 'github':
      Icon = <AiFillGithub className={iconClassName} />
      break

    case 'mail':
      Icon = <AiTwotoneMail className={iconClassName} />
      break
  }

  return (
    <a
      href={to}
      title={title}
      aria-label={title}
      target='_blank'
      rel='noreferrer noopener'
      className={styles['self']}
    >
      { Icon }
    </a>
  )
}
SocialCircleLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default SocialCircleLink