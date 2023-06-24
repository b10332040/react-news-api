import { memo } from "react"

/**
 * 當 component 的 prop 有變更時才 re-render
 * @param {func} Component 
 * @returns 
 */
const memoize = ( Component ) => {
  const MemoizedComponent = memo(Component)
  MemoizedComponent.displayName = `Memoized${Component.displayName || Component.name}`;

  console.log(MemoizedComponent.displayName)
  
  return MemoizedComponent
}

export default memoize