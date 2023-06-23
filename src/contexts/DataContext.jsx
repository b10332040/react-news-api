import PropTypes from 'prop-types'
import { createContext } from 'react'
import { categories } from '/data'

const defaultContext = {
  categoryList: [],
  categoryMap: {}
}
const DataContext = createContext(defaultContext)

const categoryList = categories
const categoryMap = new Map(categoryList.map((item) => [item.value, item]))

console.log(categoryMap)

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
        categoryMap
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