import PropTypes from 'prop-types'
import styles from '/styles/radioTabs.styles'
import { isExisted } from '/utils'

/**
 * 多個單選標籤外層
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const RadioTabs = ({ children }) => {
  return (
    <ul className={styles['radio-tabs']['self']}>
      { children }
    </ul>
  )
}
RadioTabs.propTypes = {
  children: PropTypes.node
}

/**
 * 單選標籤
 * @param {object} props - 屬性
 * @param {string} props.name - name 屬性值
 * @param {object} props.radio - 資料
 * @param {string} props.checkedValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @returns
 */
const Tab = ({
  name,
  radio,
  checkedValue,
  onChange,
  disabled=false
}) => {
  if (!isExisted(name) && !isExisted(radio.value) && !isExisted(radio.displayName)) {
    return <></>
  }
  
  return (
    <li className={styles['tab']['self']}>
      <input 
        type='radio'
        name={name}
        value={radio.value}
        id={radio.value}
        checked={checkedValue === radio.value}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
        className={styles['tab']['input']}
        disabled={disabled}
      />
      <label
        htmlFor={radio.value}
        className={styles['tab']['label']}
      >
        {radio.displayName}
      </label>
    </li>
  )
}
Tab.propTypes = {
  name: PropTypes.string.isRequired,
  radio: PropTypes.object.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

RadioTabs.Tab = Tab
export default RadioTabs