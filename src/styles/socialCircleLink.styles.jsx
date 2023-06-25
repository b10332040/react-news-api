import clsx from 'clsx'

/**
 * SocialCircleLink 樣式
 */
const styles = {
  'self': clsx(
    'group',
    'flex',
    'items-center',
    'justify-center',
    'block',
    'w-[48px]',
    'h-[48px]',
    'rounded-full',
    'border-2',
    'border-[--theme-gray-200]',
    'hover:bg-[--theme-gray-200]',
    'focus:bg-[--theme-gray-200]',
  ),
  'icon': clsx(
    'text-[--theme-gray-400]',
    'group-hover:text-[--theme-black]',
    'group-focus:text-[--theme-black]'
  )
}

export default styles