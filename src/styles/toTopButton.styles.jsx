import clsx from 'clsx'

/**
 * ToTopButton 樣式
 */
const stylesToTopButton = {
  'self': clsx(
    'group',
    'fixed',
    'z-30',
    'bottom-6',
    'right-4',
    'md:bottom-5',
    'md:right-5',
    'rounded-full',
    'w-[48px]',
    'h-[48px]',
    'bg-[--theme-black]',
    'transition-all',
    'duration-300',
    'shadow',
    'hover:bg-[--theme-gray-400]',
    'focus:bg-[--theme-gray-400]'
  ),
  'self--hidden': clsx(
    'opacity-0',
    'invisible'
  ),
  'self--show': clsx(
    'opacity-100',
    'visible'
  ),
  'icon-wrap': clsx(
    'relative',
    'w-full',
    'h-full',
  ),
  'icon': clsx(
    'absolute',
    'top-1/2',
    'left-1/2',
    'text-white',
    'text-xs',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'transition-all',
    'duration-300',
    'group-hover:top-[calc(50%-2px)]'
  )
}

export default stylesToTopButton