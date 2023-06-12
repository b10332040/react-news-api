import clsx from 'clsx'

/**
 * Footer 樣式
 */
const stylesFooter = {
  'footer': clsx(
    'bg-[--theme-black]',
    'py-10'
  ),
  'col-2/4': clsx(
    'col',
    'w-full',
    'lg:w-6/12'
  ),
  'logo': clsx(
    'inline-block',
    'rounded-md',
    'focus-shadow-white'
  ),
  'copyright': clsx(
    'mt-1',
    'text-sm',
    'text-[--theme-gray-400]'
  ),
  'col-1/4': clsx(
    'col',
    'mt-8',
    'w-full',
    'md:w-6/12',
    'lg:mt-0',
    'lg:w-3/12'
  ),
  'link-list-title': clsx(
    'mb-1',
    'py-1',
    'text-white',
    'font-bold'
  ),
  'link-list-item': clsx(
    'mb-1',
    'last:mb-0'
  ),
  'link': clsx(
    'inline-block',
    'rounded-lg',
    'text-sm',
    'hover:text-white',
    'transition',
    'duration-300',
    'rounded-md',
    'focus-shadow-white'
  ),
  'link--active': clsx(
    'text-white'
  ),
  'link--inactive': clsx(
    'text-[--theme-gray-400]'
  ),
  'contact-link': clsx(
    'relative',
    'pl-6',
    'pr-3',
    'text-[--theme-gray-400]'
  ),
  'link-icon': clsx(
    'absolute',
    'top-[50%]',
    'left-0',
    '-translate-y-[50%]'
  )
}

export default stylesFooter