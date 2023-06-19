import clsx from 'clsx'

/**
 * PopupMenu 樣式
 */
const stylesPopupMenu = {
  'self': clsx(
    'fixed',
    'z-[50]',
    'top-0',
    'right-0',
    'transition-transform',
    'duration-300',
    'w-[calc(100%-48px)]',
    'h-full',
    'max-h-screen',
    'sm:max-h-none',
    'sm:top-1/2',
    'sm:left-1/2',
    'sm:right-auto',
    'sm:bottom-auto',
    'sm:mx-auto',
    'sm:-translate-x-1/2',
    'sm:-translate-y-1/2',
    'sm:my-5',
    'sm:w-[500px]',
    'sm:max-w-[500px]',
    'sm:h-auto',
    'sm:mx-auto',
  ),
  'self--hide': clsx(

  ),
  'content': clsx(
    'w-full',
    'h-full',
    'bg-[--theme-gray-50]'
  ),
  'backdrop': clsx(
    'fixed',
    'z-[49]',
    'top-0',
    'left-0',
    'right-0',
    'bottom-0',
    'bg-[--theme-black]',
    'opacity-50'
  )
}

export default stylesPopupMenu