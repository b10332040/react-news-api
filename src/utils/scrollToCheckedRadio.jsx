import { isExisted } from "."

/**
 * <input value = {value} ...> 該選項在容器中自動滾到指定方向
 * @param {object} obj
 * @param {string} obj.direction - 滾動的指定方向（預設：'left'）
 * @param {object} obj.radiosWrap - 有滾動卷軸的容器
 * @param {string} obj.value - 值
 */
const scrollToCheckedRadio = ({
  direction='left',
  radiosWrap,
  value
}) => {
  if (isExisted(value) && value !== '' && isExisted(radiosWrap.current)) {
    const selectedRadio = radiosWrap.current.querySelector(`input[value="${value}"]`)
    let radiosWrapDirection = 0
    let radiosWrapScrollDirection = 0
    let checkRadioDirection = 0

    if (direction === 'top') {
      if (selectedRadio) {
        radiosWrapDirection = radiosWrap.current.getBoundingClientRect().top
        radiosWrapScrollDirection = radiosWrap.current.scrollTop
        checkRadioDirection = selectedRadio.getBoundingClientRect().top
      }
      radiosWrap.current.scrollTo({
        top: checkRadioDirection - radiosWrapDirection + radiosWrapScrollDirection,
        behavior: 'smooth'
      })

    } else {
      if (selectedRadio) {
        radiosWrapDirection = radiosWrap.current.getBoundingClientRect().left
        radiosWrapScrollDirection = radiosWrap.current.scrollLeft
        checkRadioDirection = selectedRadio.getBoundingClientRect().left
      }
      radiosWrap.current.scrollTo({
        left: checkRadioDirection - radiosWrapDirection + radiosWrapScrollDirection,
        behavior: 'smooth'
      })
    }

    // 選到的單選按鈕相對於整個頁面指定方向的偏移量 - 容器相對於整個頁面指定方向的偏移量 + 容器指定方向滾動位置
    // console.log(`checkRadioDirection(${checkRadioDirection}) - radiosWrapDirection(${radiosWrapDirection}) + radiosWrapScrollDirection(${radiosWrapScrollDirection}) = ${checkRadioDirection - radiosWrapDirection + radiosWrapScrollDirection}`)
  }
}

export default scrollToCheckedRadio