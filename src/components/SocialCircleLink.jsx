import PropTypes from 'prop-types'
import { AiFillBehanceCircle, AiFillGithub, AiOutlineLink, AiTwotoneMail } from 'react-icons/ai'
import { stylesSocialCircleLink } from '/styles'

/**
 * 圓圈聯絡連結
 * @param {string} to 連結
 * @param {string} title - 連結文字
 * @param {string} icon 連結 icon
 */
const SocialCircleLink = ({to, title, icon}) => {
  const iconClassName = stylesSocialCircleLink['icon']
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
      className={stylesSocialCircleLink['self']}
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