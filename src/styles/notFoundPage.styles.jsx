import clsx from 'clsx'

/**
 * NotFoundPage 樣式
 */
const styles = {
  'self': clsx(
    'flex',
    'justify-between',
    'items-center',
    'w-full',
    'h-screen',
    'bg-[--theme-black]'
  ),
  'container': clsx(
    'mx-auto',
    'w-full',
    'px-3',
    'max-w-[600px]',
    'text-center'
  ),
  'icon-wrap': clsx(
    'relative',
    'z-[1]',
    'mx-auto',
    'w-[240px]',
    'h-[52px]'
  ),
  'icon': clsx(
    'absolute',
    'z-[1]',
    '-top-[12px]',
    'left-[92px]',
    'block',
    'text-white',
    'text-[52px]',
    'animate-[ufo_1s_linear_infinite]'
  ),
  'header': clsx(
    'relative',
    'z-[1]',
    'max-w-[335px]',
    'mx-auto'
  ),
  '404': clsx(
    'text-white',
    'font-black',
    'text-[170px]',
    'tracking-widest',
    'leading-none',
    'opacity-5'
  ),
  'title': clsx(
    'absolute',
    'z-[2]',
    'bottom-[36px]',
    'left-[40px]',
    'my-1',
    'text-white',
    'font-black',
    'text-[32px]',
    'tracking-wide',
    'animate-[float_1s_linear_infinite]'
  ),
  'description': clsx(
    'mb-4',
    'mx-auto',
    'max-w-[360px]',
    'text-[--theme-gray-300]',
    'text-sm',
    'tracking-wide',
    'opacity-70'
  ),
  'link': clsx(
    'block',
    'rounded-full',
    'border-2',
    'border-[--theme-gray-300]',
    'mx-auto',
    'max-w-[200px]',
    'py-2',
    'px-3',
    'text-[--theme-gray-300]',
    'text-opacity-70',
    'opacity-70',
    'hover:text-[--theme-black]',
    'hover:border-[--theme-gray-50]',
    'hover:bg-[--theme-gray-50]',
    'hover:opacity-100'
  )
}

export default styles