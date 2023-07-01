import clsx from 'clsx'

/**
 * DropDownMenu 樣式
 */
const styles = {
  'drop-down-menu': {
    'self': clsx(
      'relative'
    )
  },
  'open-button': {
    'self': clsx(
      'relative',
      'z-[1]',
      'block',
      'w-full',
      'pr-4',
      'py-2',
      'text-left',
      'border-b-[1px]',
      'disabled:opacity-50'
    ),
    'self--light': clsx(
      'border-white',
      'border-opacity-30',
      'text-[--theme-gray-50]',
      'opacity-90'
    ),
    'self--dark': clsx(
      'border-[--theme-gray-200]',
      'text-[--theme-black]'
    ),
    'icon-wrap': clsx(
      'absolute',
      'z-[1]',
      'top-1/2',
      'right-1',
      '-translate-y-1/2'
    ),
    'icon': clsx(
      'text-xl'
    )
  },
  'menu': {
    'self': clsx(
      'absolute',
      'z-[1]',
      'top-full',
      'left-0',
      'min-w-full',
      'max-h-[360px]',
      'rounded-b',
      'bg-white',
      'overflow-y-auto',
      'overflow-x-hidden',
      'has-scrollbar',
      'shadow-md',
    )
  }
}

export default styles