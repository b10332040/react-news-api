import PropTypes from 'prop-types'
import { stylesRadioTabList } from '/styles'


/**
 * 單選頁籤
 * @param {object} props - 屬性
 * @param {object} props.prefix - 前贅詞 (預設：'')
 * @param {string} props.name - 單選 name 屬性值
 * @param {array} props.radios - 資料
 * @param {string} props.inputValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @returns
 */
const RadioTabList = ({ prefix='', name, radios, inputValue, onChange, disabled=false }) => {
  const showList = (Array.isArray(radios) && radios.length !== 0) ? true : false

  if (showList) {
    let RadioTabItems = radios.map((radio) => {
      return (
        <li
          key={`radio-${radio.value}`}
          className={stylesRadioTabList['item']}
        >
          <input 
            type='radio'
            name={`${(prefix !== '') ? `${prefix}-` : ''}${name}`}
            value={radio.value}
            id={radio.value}
            checked={inputValue === radio.value}
            onChange={(event) => {
              onChange?.(event.target.value)
            }}
            className={stylesRadioTabList['input']}
            disabled={disabled}
          />
          <label
            htmlFor={radio.value}
            className={stylesRadioTabList['label']}
          >
            <span className={stylesRadioTabList['label-text']}>
              {radio.displayName}
            </span>
          </label>
        </li>
      )
    })

    return (
      <ul className={stylesRadioTabList['self']}>
        { RadioTabItems }
      </ul>
    )
  }
  return (
    <></>
  )
}
RadioTabList.propTypes = {
  prefix: PropTypes.string,
  name: PropTypes.string.isRequired,
  radios: PropTypes.array.isRequired,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default RadioTabList