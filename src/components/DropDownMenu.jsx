import PropTypes from 'prop-types'
import styles from '/styles/dropDownMenu.styles'
import { createContext, useContext, useEffect, useRef } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

const defaultContext = {
  open: false,
  menuId: '',
  setOpen: null
}
const DropDownMenuContext = createContext(defaultContext)
const useDropDownMenu = () => useContext(DropDownMenuContext)

/**
 * 下拉式
 * @param {object} props - 屬性
 * @param {object} props.selfRef - ref
 * @param {string} props.menuId - 選單 ID
 * @param {bool} props.open - 是否開啟 (預設：false)
 * @param {func} props.setOpen - 設定彈跳視窗是否關閉
 * @param {node} props.children - 內容
 * @returns
 */
const DropDownMenu = ({ menuId, open=false, setOpen, children }) => {
  const selfRef = useRef(null)

  // 當點擊非 Drop down 的地方，收起 drop down
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selfRef.current && !selfRef.current.contains(event.target)) {
        setOpen?.(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpen])
  
  return (
    <DropDownMenuContext.Provider
      value={{
        open,
        menuId,
        setOpen
      }}
    >
      <div
        ref={selfRef}
        className={`
          ${styles['drop-down-menu']['self']}
          ${(open) ? 'z-30' : 'z-[1]'}
        `}
      >
        { children }
      </div>
    </DropDownMenuContext.Provider>
  )
}
DropDownMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.node
}

/**
 * 開啟按鈕
 * @param {object} props - 屬性
 * @param {string} props.mode - 模式（預設：dark）
 * @param {string} props.title - title 屬性值
 * @param {bool} props.disabled - disabled 屬性值，按鈕是否不可點擊 (預設：false)
 * @param {node} props.children - 內容
 * @returns
 */
const OpenButton = ({ mode='dark', title, disabled, children }) => {
  const { open ,setOpen, menuId } = useDropDownMenu()

  return (
    <button
      type='button'
      title={title}
      aria-label={title}
      aria-controls={menuId}
      aria-expanded={(open) ? 'true' : 'false'}
      aria-haspopup='menu'
      onClick={() => {
        setOpen?.(!open)
      }}
      className={`
        ${styles['open-button']['self']}
        ${(mode === 'light') ? styles['open-button']['self--light'] : styles['open-button']['self--dark']}
        ${(open) ? 'focus:border-transparent' : ''}
      `}
      disabled={disabled}
    >
      { children }
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
  )
}
OpenButton.propTypes = {
  mode: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node
}

const Menu = ({ children }) => {
  const { menuId, open } = useDropDownMenu()
  return (
    <div
      id={menuId}
      className={`
        ${styles['menu']['self']}
        ${(open) ? '' : 'invisible' }
      `}
    >
      { children }
    </div>
  )
}
Menu.propTypes = {
  children: PropTypes.node
}


DropDownMenu.OpenButton = OpenButton
DropDownMenu.Menu = Menu
export default DropDownMenu