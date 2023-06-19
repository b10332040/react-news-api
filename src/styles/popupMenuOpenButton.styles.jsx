import clsx from 'clsx'

/**
 * PopupMenuOpenButton 樣式
 */
const stylesPopupMenuOpenButton = {
  'self': clsx(
    'group',
    'relative',
    'z-[1]',
    'block',
    'w-[44px]',
    'h-[44px]'
  ),
  'icon': clsx(
    'relative',
    'z-[2]',
    'inline-block',
    'text-[--theme-gray-400]',
    'transition-colors',
    'duration-300',
    'group-hover:text-[--theme-black]',
    'group-focus:text-[--theme-black]',
  )
}

export default stylesPopupMenuOpenButton