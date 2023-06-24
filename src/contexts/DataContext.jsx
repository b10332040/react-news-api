import PropTypes from 'prop-types'
import { createContext } from 'react'
import { categories, continents, countries } from '/data'

const defaultContext = {
  categoryList: [],
  continentList: [],
  countryList: [],
  categoryMap: {},
  continentMap: {},
  countryMap: {}
}
const DataContext = createContext(defaultContext)

const categoryList = categories
const continentList = continents
const countryList = countries
const categoryMap = new Map(categoryList.map((item) => [item.value, item]))
const continentMap = new Map(continentList.map((item) => [item.value, item]))
const countryMap = new Map(countryList.map((item) => [item.value, item]))

/**
 * 提供資料
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns 
 */
const DataProvider = ({ children }) => {

  return (
    <DataContext.Provider
      value={{
        categoryList,
        continentList,
        countryList,
        categoryMap,
        continentMap,
        countryMap
      }}
    >
      { children }
    </DataContext.Provider>
  )
}
DataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  DataContext,
  DataProvider
}