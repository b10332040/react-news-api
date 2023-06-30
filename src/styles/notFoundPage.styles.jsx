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
    'h-[48px]'
  ),
  'icon': clsx(
    'absolute',
    'z-[1]',
    'top-0',
    'left-0',
    'block',
    'text-white',
    'text-[48px]',
    'animate-[ufo_1s_ease-in-out_infinite_alternate]'
  ),
  '404': clsx(
    'text-white',
    'font-black',
    'text-[92px]',
    'tracking-widest',
    'leading-none'
  ),
  'title': clsx(
    'my-1',
    'text-white',
    'font-black',
    'text-[24px]',
    'tracking-wide'
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
    'border-[--theme-gray-400]',
    'mx-auto',
    'max-w-[200px]',
    'py-2',
    'px-3',
    'text-[--theme-gray-300]',
    'text-opacity-70',
    'hover:text-[--theme-black]',
    'hover:border-[--theme-gray-50]',
    'hover:bg-[--theme-gray-50]'
  )
}

export default styles