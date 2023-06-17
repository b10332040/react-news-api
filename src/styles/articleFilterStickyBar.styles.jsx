import clsx from 'clsx'

const stylesArticleFilterStickyBar = {
  'self': clsx(
    'fixed',
    'z-30',
    'left-0',
    'w-full',
    'bg-[--theme-gray-50]',
    'transition-all',
    'duration-300'
  ),
  'container': clsx(
    'container',
    'flex',
    'flex-wrap',
    'justify-between',
    'items-center',
    'w-full'
  ),
  'open-button': clsx(
    'block',
    'ml-auto',
    'border-[1px]',
    'rounded-sm',
    'border-[--theme-gray-400]',
    'w-[48px]',
    'h-[48px]'
  )
}

export default stylesArticleFilterStickyBar