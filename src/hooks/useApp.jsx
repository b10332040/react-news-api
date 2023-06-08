import { useContext } from "react";
import { AppContext } from "contexts/AppContext";

/**
 * 取得基本邏輯（頁面是否滑動到頂端……）
 * @returns 
 */
const useApp = () => useContext(AppContext)

export default useApp