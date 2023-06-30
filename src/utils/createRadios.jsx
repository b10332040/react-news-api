/**
 * 產生單選項目或標籤
 * @param {obj} obj - 物件
 * @param {any} obj.RadioComponent - Component
 * @param {array} obj.radios - 資料
 * @param {string} obj.mode - 模式
 * @param {string} obj.name - name 屬性值
 * @param {string} obj.checkedValue - 被選到的值
 * @param {func} obj.onChange - 處理 change 事件
 * @param {bool} obj.disabled - disabled 屬性值
 * @returns 
 */
const createRadios = ({
  RadioComponent,
  radios,
  mode='',
  name,
  checkedValue,
  onChange,
  disabled=false
}) => {
  return radios.map((radio) => {
    return (
      <RadioComponent
        key={radio.value}
        mode={mode}
        name={name}
        radio={radio}
        checkedValue={checkedValue}
        onChange={(inputValue) => {
          onChange?.(inputValue)
        }}
        disabled={disabled}
      />
    )
  })
}

export default createRadios