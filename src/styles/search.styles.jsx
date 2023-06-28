import clsx from 'clsx'

/**
 * Search 樣式
 */
const styles = {
  'self': clsx(
    'relative',
    'z-[1]',
    'w-full'
  ),
  'input': clsx(
    'peer',
    'block',
    'w-full',
    'rounded-[20px]',
    'pl-[40px]',
    'pr-4',
    'py-2',
    'bg-[--theme-gray-200]',
    'placeholder:opacity-80',
    'placeholder:text-sm',
    'transition-all',
    'duration-300',
    'focus-shadow-gray',
    'disabled:opacity-70'
  ),
  'icon-wrap': clsx(
    'absolute',
    'z-[1]',
    'top-0',
    'left-0',
    'w-[40px]',
    'h-full',
    'peer-disabled:opacity-50'
  ),
  'icon': clsx(
    'absolute',
    'z-[1]',
    'top-1/2',
    'left-1/2',
    'block',
    '-translate-y-1/2',
    '-translate-x-1/2',
    'text-[--theme-gray-400]'
  )
}

export default styles