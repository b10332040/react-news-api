import PropTypes from 'prop-types'
import { AiFillBehanceCircle, AiFillGithub, AiOutlineLink, AiTwotoneMail } from 'react-icons/ai'

/**
 * 圓圈聯絡連結
 * @param {string} to 連結
 * @param {string} title - 連結文字
 * @param {string} icon 連結 icon
 */
const SocialCircleLink = ({to, title, icon}) => {
  let Icon = <AiOutlineLink />

  switch (icon) {
    case 'behance':
      Icon = <AiFillBehanceCircle />
      break

    case 'github':
      Icon = <AiFillGithub />
      break

    case 'mail':
      Icon = <AiTwotoneMail />
      break
  }

  return (
    <a
      href={to}
      title={title}
      aria-label={title}
      target='_blank'
      rel='noreferrer noopener'
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