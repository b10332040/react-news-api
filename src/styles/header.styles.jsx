import clsx from 'clsx'

/**
 * Header 樣式
 */
const styles = {
  'self': clsx(
    'relative',
    'flex',
    'flex-wrap',
    'items-center',
    'w-full',
    'min-h-[44px]',
    'after:content-[""]',
    'after:block',
    'after:absolute',
    'after:left-0',
    'after:bottom-0',
    'after:w-full',
    'after:border-b-2',
    'after:border-[--theme-gray-200]'
  ),
  'title': clsx(
    'w-full',
    'px-3',
    'font-bold',
    'text-lg',
    'text-[--theme-black]'
  ),
  'title--has-right': clsx(
    'md:w-4/12',
    'lg:w-3/12'
  ),
  'right-side': clsx(
    'flex',
    'flex-wrap',
    'md:justify-end',
    'w-full',
    'md:w-8/12',
    'lg:w-9/12'
  )
}

export default styles