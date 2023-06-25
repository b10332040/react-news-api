import clsx from 'clsx'

/**
 * NoResults 樣式
 */
const styles = {
  'self': clsx(
    'w-full',
    'px-3',
    'py-12'
  ),
  'content': clsx(
    'mx-auto',
    'w-full',
    'max-w-[320px]',
    'text-center',
    'text-[--theme-gray-400]'
  ),
  'icon': clsx(
    'block',
    'mx-auto',
    'text-9xl'
  ),
  'title': clsx(
    'mt-4',
    'text-2xl',
    'font-bold'
  ),
  'message': clsx(
    'mt-1',
    'opacity-80',
    'text-sm'
  )
}

export default styles