import clsx from 'clsx'

/**
 * ArticleCardListMode 樣式
 */
const styles = {
  'self': clsx(
    'relative',
    'flex',
    'flex-wrap',
    'rounded-md',
    'bg-white',
    'overflow-hidden',
    'shadow-lg'
  ),
  'self--has-link': clsx(
    'group',
    'transition-shadow',
    'hover:shadow-sm',
    'hover:shadow-[rgba(0,0,0,0.2)]'
  ),
  'link-cover': clsx(
    'absolute',
    'z-[3]',
    'top-0',
    'left-0',
    'w-full',
    'h-full'
  ),
  'body': clsx(
    'w-7/12',
    'p-2',
    'md:w-8/12',
    'md:px-3',
    'mb:py-2'
  ),
  'date-diff': clsx(
    'hidden',
    'w-full',
    'text-[--theme-gray-400]',
    'text-sm',
  ),
  'content': clsx(
    'relative',
    'z-[1]',
    'w-full',
    'h-full'
  ),
  'title': clsx(
    'w-full',
    'min-h-[48px]',
    'text-[--theme-black]',
    'text-base',
    'font-bold',
    'line-clamp-2',
    'transition',
    'group-hover:opacity-70',
    'group-hover:cursor-pointer',
    'sm:mb-2',
  ),
  'description': clsx(
    'hidden',
    'text-[--theme-black]',
    'md:line-clamp-2',
    'md:mb-4',
    'md:min-h-[48px]'
  ),
  'note': clsx(
    'relative',
    'z-[1]',
    'mt-3',
    'pt-[6px]',
    'text-xs',
    'before:content-[""]',
    'before:block',
    'before:absolute',
    'before:top-0',
    'before:left-0',
    'before:w-3',
    'before:border-t-2',
    'before:border-[--theme-gray-300]'
  ),
  'img-wrap': clsx(
    'relative',
    'z-[1]',
    'w-5/12',
    'overflow-hidden',
    'md:w-4/12'
  ),
  'img': clsx(
    'absolute',
    'z-[1]',
    'top-1/2',
    'left-1/2',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'object-cover',
    'min-w-full',
    'min-h-full',
    'block',
    'transition-transform',
    'group-hover:scale-[1.1]'
  ),
}

export default styles