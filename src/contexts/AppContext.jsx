import PropTypes from 'prop-types'
import { useState, useEffect, createContext } from 'react'
import { Popup } from '/layouts'
import { RiErrorWarningFill } from 'react-icons/ri'
import { AiFillCheckCircle, AiFillInfoCircle } from 'react-icons/ai'

const defaultContext = {
  pageTop: true,
  setBodyScroll: null,
  setPopupAlertOpen: null,
  setPopupAlertMessage: null
}
const AppContext = createContext(defaultContext)

/**
 * 提供基本邏輯（頁面是否滑動到頂端……）
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const AppProvider = ({ children }) => {
  const [pageTop, setPageTop] = useState(defaultContext.pageTop)
  const [bodyScroll, setBodyScroll] = useState(true)
  const [popupAlertOpen, setPopupAlertOpen] = useState(false)
  const [popupAlertMessage, setPopupAlertMessage] = useState({})
  let PopupAlertIcon = <></>
  let popupAlertTitleColorClassName = ''

  if (popupAlertMessage?.icon) {
    switch (popupAlertMessage.icon) {
      case 'success':
        PopupAlertIcon = <AiFillCheckCircle className='text-emerald-400'/>
        popupAlertTitleColorClassName = 'text-emerald-500'
        break
      case 'error': 
        PopupAlertIcon = <RiErrorWarningFill className='text-rose-500'/>
        popupAlertTitleColorClassName = 'text-rose-600'
        break
      default:
        PopupAlertIcon = <AiFillInfoCircle className='text-cyan-500'/>
        popupAlertTitleColorClassName = 'text-cyan-600'
    }
  }

  // 處理頁面滑動
  const handleScroll = () => {
    // 是否滾到頁面頂端
    (window.scrollY === 0) ? setPageTop(true) : setPageTop(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (bodyScroll) {
      document.body.classList.remove('overflow-y-hidden')
    } else {
      document.body.classList.add('overflow-y-hidden')
    }
  }, [bodyScroll])


  useEffect(() => {
    if (popupAlertOpen) {
      const timer = setTimeout(() => {
        setPopupAlertOpen(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [popupAlertOpen])

  return (
    <AppContext.Provider
      value={{
        pageTop,
        setBodyScroll,
        setPopupAlertOpen,
        setPopupAlertMessage
      }}
    >
      { children }
      
      {/* alert 彈跳視窗 */}
      <Popup
        popupId='alert'
        open={popupAlertOpen}
        setOpen={setPopupAlertOpen}
        backdropVisibleInMobile={true}
      >
        <Popup.Dialog
          size='sm'
        >
          <Popup.Body>
            <div className='text-center mt-6 mb-2 [&>svg]:inline-block [&>svg]:text-[5rem]'>
              { PopupAlertIcon }
            </div>
            <h2 className={`text-center text-[--theme-black] text-lg font-black ${popupAlertTitleColorClassName}`}>
              {(popupAlertMessage?.title) ? popupAlertMessage.title : ''}
            </h2>
            <div
              dangerouslySetInnerHTML={{__html: (popupAlertMessage?.html) ? popupAlertMessage.html : ''}}
              className='text-center mt-1 mb-6 text-[--theme-gray-400]'
            />
          </Popup.Body>
        </Popup.Dialog>
      </Popup>
    </AppContext.Provider>
  )
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  AppContext,
  AppProvider,
}