import clsx from 'clsx'

/**
 * ArticleCard 樣式
 */
const styles = {
  'self': clsx(
    'relative',
    'z-[1]',
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
  'top-img': clsx(
    'ratio',
    'ratio-16x9'
  ),
  'bg-img': clsx(
    'absolute',
    'z-[1]',
    'top-0',
    'left-0',
    'w-full',
    'h-full',
    'after:content-[""]',
    'after:block',
    'after:absolute',
    'after:top-0',
    'after:left-0',
    'after:w-full',
    'after:h-full',
    'after:bg-[--theme-black]',
    'after:opacity-70'
  ),
  'img': clsx(
    'absolute',
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
  'body': clsx(
    'relative',
    'z-[2]',
    'px-4',
    'py-5'
  ),
  'title': clsx(
    'text-base',
    'font-bold',
    'transition',
    'group-hover:opacity-70',
    'group-hover:cursor-pointer'
  ),
  'title--cover': clsx(
    'text-white',
    'drop-shadow-lg'
  ),
  'title--no-cover': clsx(
    'text-[--theme-black]',
  ),
  'note':clsx(
    'mt-3',
    'text-xs',
  ),
  'note--cover': clsx(
    'text-white',
    'drop-shadow',
    'opacity-70'
  ),
  'note--no-cover': clsx(
    'text-[--theme-gray-400]'
  )
}

export default styles