import PropTypes from 'prop-types'
import styles from '/styles/radioTabs.styles'
import { isArrayEmpty } from '/utils'

/**
 * 單選頁籤
 * @param {object} props - 屬性
 * @param {object} props.selfRef - ref
 * @param {array} props.radios - 資料
 * @param {string} props.checkedValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @returns
 */
const RadioTabs = ({ selfRef, name, radios, checkedValue, onChange, disabled=false }) => {

  if (isArrayEmpty(radios)) {
    return <></>
  }

  let RadioTab = <></>
  RadioTab = radios.map((radio) => {
    if (radio?.value && radio?.displayName) {
      return (
        <li
          key={`radio-${radio.value}`}
          className={styles['item']}
        >
          <input 
            type='radio'
            name={name}
            value={radio.value}
            id={radio.value}
            checked={checkedValue === radio.value}
            onChange={(event) => {
              onChange?.(event.target.value)
            }}
            className={styles['input']}
            disabled={disabled}
          />
          <label
            htmlFor={radio.value}
            className={styles['label']}
          >
            <span className={styles['label-text']}>
              {radio.displayName}
            </span>
          </label>
        </li>
      )
    }
  })

  return (
    <ul ref={selfRef} className={styles['self']}>
      { RadioTab }
    </ul>
  )
}
RadioTabs.propTypes = {
  selfRef: PropTypes.object,
  name: PropTypes.string.isRequired,
  radios: PropTypes.array.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default RadioTabs