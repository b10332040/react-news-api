import PropTypes from 'prop-types'
import { stylesRadioTabList } from '/styles'


/**
 * 單選頁籤
 * @param {string} name 單選 name 屬性值
 * @param {array} tabs 資料
 * @param {string} checkedValue 被選到的值
 * @param {func} onChange 處理當選到的值改變
 * @returns 
 */
const RadioTabList = ({ name, tabs, checkedValue, onChange }) => {
  const showList = (Array.isArray(tabs) && tabs.length !== 0) ? true : false

  if (showList) {
    let RadioTabItems = tabs.map((tab) => {
      return (
        <li
          key={`radio-${tab.id}`}
          className={stylesRadioTabList['item']}
        >
          <input 
            type='radio'
            name={name}
            value={tab.value}
            id={tab.id}
            checked={checkedValue === tab.value}
            onChange={(event) => {
              onChange?.(event.target.value)
            }}
            className={stylesRadioTabList['input']}
          />
          <label
            htmlFor={tab.id}
            className={stylesRadioTabList['label']}
          >
            <span className={stylesRadioTabList['label-text']}>
              {tab.displayName}
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
  name: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func
}

export default RadioTabList