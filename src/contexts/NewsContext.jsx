import PropTypes from 'prop-types'
import { createContext } from 'react'

const defaultContext = {
  keywordMaxLength: 500
}
const NewsContext = createContext(defaultContext)

/**
 * 提供 News Api 相關資訊 (呼叫 api 的參數、總資料筆數)
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const NewsProvider = ({ children }) => {
  return (
    <NewsContext.Provider
      value={{
        keywordMaxLength: defaultContext.keywordMaxLength
      }}
    >
      { children }
    </NewsContext.Provider>
  )
}
NewsProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  NewsContext,
  NewsProvider
}