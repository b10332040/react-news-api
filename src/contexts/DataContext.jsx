import PropTypes from 'prop-types'
import { createContext } from 'react'
import { category } from '/data'

const { categoryValueList, categoryValueMap } = category

const defaultContext = {
  categoryList: [],
  categoryValueMap: categoryValueMap
}
const DataContext = createContext(defaultContext)

let categoryList = defaultContext.categoryList
categoryValueList.forEach((categoryValue) => {
  categoryList.push({
    'id': categoryValue,
    'value': categoryValue,
    'displayName': categoryValueMap[categoryValue]['displayName']
  })
})

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
        categoryValueMap
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