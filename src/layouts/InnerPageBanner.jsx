import PropTypes from 'prop-types'
import styles from '/styles/innerPageBanner.styles'
import { 
  srcJpgSearchBanner1x,
  srcJpgSearchBanner2x,
  srcJpgSearchBannerLg1x,
  srcJpgSearchBannerLg2x,
  srcJpgSearchBannerMd1x,
  srcJpgSearchBannerMd2x,
  srcWebpSearchBanner1x,
  srcWebpSearchBanner2x,
  srcWebpSearchBannerLg1x,
  srcWebpSearchBannerLg2x,
  srcWebpSearchBannerMd1x,
  srcWebpSearchBannerMd2x,
  srcJpgSourcesBanner1x,
  srcJpgSourcesBanner2x,
  srcJpgSourcesBannerLg1x,
  srcJpgSourcesBannerLg2x,
  srcJpgSourcesBannerMd1x,
  srcJpgSourcesBannerMd2x,
  srcWebpSourcesBanner1x,
  srcWebpSourcesBanner2x,
  srcWebpSourcesBannerLg1x,
  srcWebpSourcesBannerLg2x,
  srcWebpSourcesBannerMd1x,
  srcWebpSourcesBannerMd2x,
  srcJpgWorldBanner1x,
  srcJpgWorldBanner2x,
  srcJpgWorldBannerLg1x,
  srcJpgWorldBannerLg2x,
  srcJpgWorldBannerMd1x,
  srcJpgWorldBannerMd2x,
  srcWebpWorldBanner1x,
  srcWebpWorldBanner2x,
  srcWebpWorldBannerLg1x,
  srcWebpWorldBannerLg2x,
  srcWebpWorldBannerMd1x,
  srcWebpWorldBannerMd2x
} from '/assets/images'
import { isExisted } from '/utils'
import { FormArea } from '/components'

/**
 * 內頁橫幅
 * @param {object} props - 屬性
 * @param {string} props.bannerType - banner 類型 (預設：'source')
 * @param {node} props.children - 內容
 * @returns 
 */
const InnerPageBanner = ({
  bannerType='source',
  children
}) => {
  const srcBannerTypesMap = {
    'source': {
      'lg': {
        'webp': {
          '1x': srcWebpSourcesBannerLg1x,
          '2x': srcWebpSourcesBannerLg2x
        },
        'jpg': {
          '1x': srcJpgSourcesBannerLg1x,
          '2x': srcJpgSourcesBannerLg2x
        }
      },
      'md': {
        'webp': {
          '1x': srcWebpSourcesBannerMd1x,
          '2x': srcWebpSourcesBannerMd2x
        },
        'jpg': {
          '1x': srcJpgSourcesBannerMd1x,
          '2x': srcJpgSourcesBannerMd2x
        }
      },
      'sm': {
        'webp': {
          '1x': srcWebpSourcesBanner1x,
          '2x': srcWebpSourcesBanner2x
        },
        'jpg': {
          '1x': srcJpgSourcesBanner1x,
          '2x': srcJpgSourcesBanner2x
        }
      }
    },
    'world': {
      'lg': {
        'webp': {
          '1x': srcWebpWorldBannerLg1x,
          '2x': srcWebpWorldBannerLg2x
        },
        'jpg': {
          '1x': srcJpgWorldBannerLg1x,
          '2x': srcJpgWorldBannerLg2x
        }
      },
      'md': {
        'webp': {
          '1x': srcWebpWorldBannerMd1x,
          '2x': srcWebpWorldBannerMd2x
        },
        'jpg': {
          '1x': srcJpgWorldBannerMd1x,
          '2x': srcJpgWorldBannerMd2x
        }
      },
      'sm': {
        'webp': {
          '1x': srcWebpWorldBanner1x,
          '2x': srcWebpWorldBanner2x
        },
        'jpg': {
          '1x': srcJpgWorldBanner1x,
          '2x': srcJpgWorldBanner2x
        }
      }
    },
    'search': {
      'lg': {
        'webp': {
          '1x': srcWebpSearchBannerLg1x,
          '2x': srcWebpSearchBannerLg2x
        },
        'jpg': {
          '1x': srcJpgSearchBannerLg1x,
          '2x': srcJpgSearchBannerLg2x
        }
      },
      'md': {
        'webp': {
          '1x': srcWebpSearchBannerMd1x,
          '2x': srcWebpSearchBannerMd2x
        },
        'jpg': {
          '1x': srcJpgSearchBannerMd1x,
          '2x': srcJpgSearchBannerMd2x
        }
      },
      'sm': {
        'webp': {
          '1x': srcWebpSearchBanner1x,
          '2x': srcWebpSearchBanner2x
        },
        'jpg': {
          '1x': srcJpgSearchBanner1x,
          '2x': srcJpgSearchBanner2x
        }
      }
    }
  }

  const srcBannerMap = (isExisted(srcBannerTypesMap[bannerType])) ? srcBannerTypesMap[bannerType] : srcBannerTypesMap['source']

  return (
    <div className={styles['inner-page-banner']['self']}>
      <div className={styles['inner-page-banner']['picture-wrap']}>
        <picture className={styles['inner-page-banner']['picture']}>
          <source
            media='(min-width: 992px)'
            srcSet={`
              ${srcBannerMap['lg']['webp']['1x']} 1x, 
              ${srcBannerMap['lg']['webp']['2x']} 2x
            `}
            type='image/webp'
          />
          <source
            media='(min-width: 992px)'
            srcSet={`
              ${srcBannerMap['lg']['jpg']['1x']} 1x, 
              ${srcBannerMap['lg']['jpg']['2x']} 2x
            `}
            type='image/jpge'
          />
          <source
            media='(min-width: 768px)'
            srcSet={`
              ${srcBannerMap['md']['webp']['1x']} 1x, 
              ${srcBannerMap['md']['webp']['2x']} 2x
            `}
            type='image/webp'
          />
          <source
            media='(min-width: 768px)'
            srcSet={`
              ${srcBannerMap['md']['jpg']['1x']} 1x, 
              ${srcBannerMap['md']['jpg']['2x']} 2x
            `}
            type='image/jpge'
          />
          <source
            srcSet={`
              ${srcBannerMap['sm']['webp']['1x']} 1x, 
              ${srcBannerMap['sm']['webp']['2x']} 2x
            `}
            type='image/webp'
          />
          <img
            src={srcBannerMap['sm']['jpg']['1x']}
            srcSet={`${srcBannerMap['sm']['jpg']['2x']} 2x`}
            alt='Main banner'
            aria-label='Main banner'
            loading='true'
            className={styles['inner-page-banner']['img']}
          />
        </picture>
      </div>
      { children }
    </div>
  )
}
InnerPageBanner.propTypes = {
  bannerType: PropTypes.string,
  children: PropTypes.node
}

/**
 * 標題
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const Title = ({ children }) => {
  if (!isExisted(children)) {
    return <></>
  }

  return (
    <div className={styles['title']['self-wrap']}>
      <h2 className={styles['title']['self']}>
        { children }
      </h2>
    </div>
  )
}
Title.propTypes = {
  children: PropTypes.node
}

/**
 * 單選列表外層
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const RadioTabsWrap = ({ children }) => {
  return (
    <div className={styles['radio-tabs-wrap']['self']}>
      <FormArea className={styles['radio-tabs-wrap']['form']}>
        { children }
      </FormArea>
    </div>
  )
}
RadioTabsWrap.propTypes = {
  children: PropTypes.node
}

/**
 * 多個單選標籤外層
 * @param {object} props - 屬性
 * @param {object} props.selfRef - ref
 * @param {node} props.children - 內容
 */
const RadioTabs = ({
  selfRef,
  children
}) => {  
  return (
    <ul ref={selfRef} className={styles['radio-tabs']['self']}>
      { children }
    </ul>
  )
}
RadioTabs.propTypes = {
  selfRef: PropTypes.object,
  children: PropTypes.node
}

/**
 * 單選標籤
 * @param {object} props - 屬性
 * @param {string} props.mode - 模式
 * @param {string} props.name - name 屬性值
 * @param {object} props.radio - 資料
 * @param {string} props.checkedValue - 被選到的值
 * @param {func} props.onChange - 處理 change 事件
 * @param {bool} props.disabled - disabled 屬性值，選項是否不可點擊 (預設：false)
 * @returns
 */
const RadioTab = ({
  mode='',
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
    <li
      key={`radio-${radio.value}`}
      className={styles['radio-tab']['self']}
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
        className={styles['radio-tab']['input']}
        disabled={disabled}
      />
      <label
        htmlFor={radio.value}
        className={`
          ${styles['radio-tab']['label']}
          ${(mode === 'light') ? styles['radio-tab']['label--light'] : styles['radio-tab']['label--dark']}
        `}
      >
        <span className={styles['radio-tab']['label-text']}>
          {radio.displayName}
        </span>
      </label>
    </li>
  )
}
RadioTab.propTypes = {
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  radio: PropTypes.object.isRequired,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

InnerPageBanner.Title = Title
InnerPageBanner.RadioTabsWrap = RadioTabsWrap
InnerPageBanner.RadioTabs = RadioTabs
InnerPageBanner.RadioTab = RadioTab
export default InnerPageBanner