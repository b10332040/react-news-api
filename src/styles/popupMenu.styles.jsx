import clsx from 'clsx'

/**
 * PopupMenu 樣式
 */
const stylesPopupMenu = {
  'popup-menu': {
    'self': clsx(
      'fixed',
      'z-[50]',
      'top-0',
      'left-0',
      'right-0',
      'bottom-0',
      'transition-all',
      'duration-300',
      'text-center',
      'overflow-x-hidden',
      'overflow-y-auto',
      'sm:after:content-[""]',
      'sm:after:inline-block',
      'sm:after:align-middle',
      'sm:after:h-full'
    ),
    'dialog': clsx(
      'relative',
      'z-[2]',
      'ml-auto',
      'h-full',
      'max-h-full',
      'text-left',
      'transition-transform',
      'duration-300',
      'delay-100',
      'overflow-hidden',
      'sm:inline-block',
      'sm:align-middle',
      'sm:my-5',
      'sm:mx-auto',
      'sm:max-w-[500px]',
      'sm:h-auto',
      'sm:max-h-none',
      'sm:rounded-lg'
    ),
    'content': clsx(
      'w-full',
      'h-full',
      'bg-[--theme-gray-50]'
    ),
    'backdrop': clsx(
      'fixed',
      'z-[1]',
      'top-0',
      'left-0',
      'right-0',
      'bottom-0',
      'bg-[--theme-black]',
      'opacity-50'
    )
  },
  'self': clsx(
    'fixed',
    'z-[50]',
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'transition-all',
    'duration-300',
    'text-center',
    'overflow-x-hidden',
    'overflow-y-auto',
    'sm:after:content-[""]',
    'sm:after:inline-block',
    'sm:after:align-middle',
    'sm:after:h-full'
  ),
  'open-button': {
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
}

export default stylesPopupMenu