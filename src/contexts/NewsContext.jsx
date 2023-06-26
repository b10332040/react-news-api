import PropTypes from 'prop-types'
import { createContext } from 'react'
import { categories, continents, countries } from '/data'

const defaultContext = {
  keywordMaxLength: 0,
  categoryList: [],
  continentList: [],
  countryList: [],
  categoryMap: {},
  continentMap: {},
  countryMap: {},
  getTotalPage: null
}
const NewsContext = createContext(defaultContext)



/**
 * 提供 News Api 相關資訊 (呼叫 api 的參數、總資料筆數)
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const NewsProvider = ({ children }) => {
  const keywordMaxLength = 500
  const categoryList = categories
  const continentList = continents
  const countryList = countries
  const categoryMap = new Map(categoryList.map((item) => [item.value, item]))
  const continentMap = new Map(continentList.map((item) => [item.value, item]))
  const countryMap = new Map(countryList.map((item) => [item.value, item]))
  const getTotalPage = ({ totalResults, pageSize }) => {
    if (totalResults / pageSize > 0 && totalResults % pageSize === 0) {
      return totalResults / pageSize
    } else {
      return Math.floor(totalResults / pageSize) + 1
    }
  }

  return (
    <NewsContext.Provider
      value={{
        keywordMaxLength,
        categoryList,
        continentList,
        countryList,
        categoryMap,
        continentMap,
        countryMap,
        getTotalPage
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