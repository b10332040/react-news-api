import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

const defaultContext = {
  country: 'tw',
  category: 'general',
  sources: '',
  keyword: '',
  page: 1,
  pageSize: 12,
  totalResults: 0,
  setCountry: null,
  setCategory: null,
  setSources: null,
  setKeyword: null,
  setPage: null
}
const NewsContext = createContext(defaultContext)

/**
 * 提供參數與參數設定
 * @param {object} props - 屬性
 * @param {node} props.children - 內容
 * @returns
 */
const NewsProvider = ({ children }) => {
  const [country, setCountry] = useState(defaultContext.country)
  const [category, setCategory] = useState(defaultContext.category)
  const [sources, setSources] = useState(defaultContext.sources)
  const [keyword, setKeyword] = useState(defaultContext.keyword)
  const [page, setPage] = useState(defaultContext.page)
  const [totalResults, setTotalResults] = useState(defaultContext.totalResults)
  const pageSize = defaultContext.pageSize

  return (
    <NewsContext.Provider
      value={{
        country,
        category,
        sources,
        keyword,
        page,
        pageSize,
        totalResults,
        setCountry,
        setCategory,
        setSources,
        setKeyword,
        setPage,
        setTotalResults
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