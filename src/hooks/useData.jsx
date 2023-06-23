import { useContext } from 'react'
import { DataContext } from '/contexts'

const useData = () => useContext(DataContext)

export default useData