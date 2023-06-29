import PropTypes from 'prop-types'
import { createContext } from 'react'
import { categories, continents, countries, sortByOptions } from '/data'

const defaultContext = {
  keywordMaxLength: 0,
  categoryList: [],
  continentList: [],
  sortByList: [],
  countryList: [],
  categoryMap: {},
  continentMap: {},
  countryMap: {},
  sortByMap: {}
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
  const sortByList = sortByOptions
  const categoryMap = new Map(categoryList.map((item) => [item.value, item]))
  const continentMap = new Map(continentList.map((item) => [item.value, item]))
  const countryMap = new Map(countryList.map((item) => [item.value, item]))
  const sortByMap = new Map(sortByList.map((item) => [item.value, item]))

  return (
    <NewsContext.Provider
      value={{
        keywordMaxLength,
        categoryList,
        continentList,
        countryList,
        sortByList,
        categoryMap,
        continentMap,
        countryMap,
        sortByMap
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