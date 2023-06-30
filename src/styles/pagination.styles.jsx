import clsx from 'clsx'

/**
 * Pagination 樣式
 */
const styles = {
  'self': clsx(
    'flex',
    'flex-wrap',
    'justify-center',
    'items-center'
  ),
  'item': clsx(
    'mx-1',
    'first:ml-0',
    'last:mr-0'
  ),
  'ellipsis': clsx(
    'w-[24px]',
    'text-center'
  ),
  'button': clsx(
    'group',
    'relative',
    'z-[1]',
    'w-[40px]',
    'h-[40px]',
    'text-center',
    'text-[--theme-black]',
    'after:content-[""]',
    'after:block',
    'after:absolute',
    'after:-z-[1]',
    'after:rounded-full',
    'after:transition-colors',
    'after:duration-200'
  ),
  'button--current': clsx(
    'after:top-[4px]',
    'after:left-[4px]',
    'after:w-[32px]',
    'after:h-[32px]',
    'text-white',
    'after:bg-[--theme-black]'
  ),
  'button--not-current': clsx(
    'after:top-[2px]',
    'after:left-[2px]',
    'after:w-[34px]',
    'after:h-[34px]',
    'after:bg-transparent',
    'enabled:hover:after:bg-[--theme-gray-200]',
    'enabled:focus:after:bg-[--theme-gray-200]',
  ),
  'button-icon': clsx(
    'absolute',
    'z-[1]',
    'top-1/2',
    'left-1/2',
    'block',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'text-xs',
    'transition-[left]',
    'duration-200'
  ),
  'button-icon--left': clsx(
    'group-enabled:group-hover:left-[calc(50%-4px)]',
    'group-enabled:group-focus:left-[calc(50%-4px)]'
  ),
  'button-icon--right': clsx(
    'group-enabled:group-hover:left-[calc(50%+4px)]',
    'group-enabled:group-focus:left-[calc(50%+4px)]'
  )
}

export default styles