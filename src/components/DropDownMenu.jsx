import PropTypes from 'prop-types'
import styles from '/styles/dropDownMenu.styles'
import { useEffect, useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

/**
 * 下拉式
 * @param {object} props - 屬性
 * @param {string} props.menuId - menu ID
 * @param {string} props.openButtonMode - 打開按鈕模式
 * @param {string} props.openButtonTitle - 打開按鈕 title 屬性值
 * @param {bool} props.openButtonDisabled - 打開按鈕 disabled 屬性值
 * @param {node} props.openButtonChildren - 打開按鈕的內容
 * @param {node} props.children - 選單的內容
 * @returns
 */
const DropDownMenu = ({
  menuId,
  openButtonMode='light',
  openButtonTitle='', 
  openButtonDisabled=false,
  openButtonChildren,
  children
}) => {
  const [open, setOpen] = useState(false)
  const selfRef = useRef(null)
  const menuRef = useRef(null)

  // 當點擊非 Drop down 的地方，收起 drop down
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selfRef.current
        && menuRef.current
        && !selfRef.current.contains(event.target)
        && !menuRef.current.contains(event.target)
      ) {
        setOpen?.(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpen])
  
  return (
    <div
      ref={selfRef}
      className={`
        ${styles['drop-down-menu']['self']}
        ${(open) ? 'z-30' : 'z-[1]'}
      `}
    >
      <button
        type='button'
        title={openButtonTitle}
        aria-label={openButtonTitle}
        aria-controls={menuId}
        aria-expanded={(open) ? 'true' : 'false'}
        aria-haspopup='menu'
        onClick={() => {
          setOpen?.(!open)
        }}
        className={`
          ${styles['open-button']['self']}
          ${(openButtonMode === 'light') ? styles['open-button']['self--light'] : styles['open-button']['self--dark']}
        `}
        disabled={openButtonDisabled}
      >
        { openButtonChildren }
        <div className={styles['open-button']['icon-wrap']}>
          <BiChevronDown
            className={`
              ${styles['open-button']['icon']}
              ${(open) ? 'hidden' : 'block'}
            `}
          />
          <BiChevronUp
            className={`
              ${styles['open-button']['icon']}
              ${(open) ? 'block' : 'hidden'}
            `}
          />
        </div>
      </button>
      <div
        id={menuId}
        ref={menuRef}
        className={`
          ${styles['menu']['self']}
          ${(open) ? '' : 'invisible'}
        `}
      >
        { children }
      </div>
    </div>
  )
}
DropDownMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  openButtonMode: PropTypes.string,
  openButtonTitle: PropTypes.string,
  openButtonDisabled: PropTypes.bool,
  openButtonChildren: PropTypes.node,
  children: PropTypes.node
}

export default DropDownMenu