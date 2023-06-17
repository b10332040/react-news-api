import { useContext } from 'react'
import { NewsContext } from '/contexts'

/**
 * 取得 News Api 相關資訊 (呼叫 api 的參數、總資料筆數)
 */
const useNews = () => useContext(NewsContext)

export default useNews