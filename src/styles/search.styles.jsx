import clsx from 'clsx'

/**
 * Search 樣式
 */
const stylesSearch = {
  'self': clsx(
    'relative',
    'z-[1]',
    'w-full'
  ),
  'input': clsx(
    'block',
    'w-full',
    'rounded-full',
    'pl-[36px]',
    'pr-4',
    'py-2',
    'bg-[--theme-gray-200]',
    'placeholder:opacity-80',
    'placeholder:text-sm',
    'transition-all',
    'duration-300',
    'focus-shadow-gray'
  ),
  'icon': clsx(
    'absolute',
    'top-1/2',
    'left-[24px]',
    '-translate-y-1/2',
    'text-[--theme-gray-400]'
  )
}

export default stylesSearch