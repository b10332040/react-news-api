import clsx from 'clsx'

/**
 * NavBar 樣式
 */
const stylesNavbar = {
  'self': clsx(
    'fixed',
    'z-40',
    't-0',
    'l-0',
    'w-full',
    'transition-all',
    'duration-300'
  ),
  'self--top': clsx(
    'bg-transparent',
    'md:pt-4'
  ),
  'self--non-top': clsx(
    'bg-[--theme-black]',
    'md:pt-0'
  ),
  'nav': clsx(
    'relative',
    'flex',
    'flex-wrap',
    'justify-between',
    'items-center',
    'container',
    'h-[55px]',
    'after:content-[""]',
    'after:absolute',
    'after:bottom-0',
    'after:left-3',
    'after:block',
    'after:border-b-[1px]',
    'after:border-white',
    'after:w-[calc(100%-1.5rem)]',
    'after:transition',
    'after:duration-300',
    'md:after:left-0',
    'md:after:w-full'
  ),
  'nav--top': clsx(
    'after:opacity-100'
  ),
  'nav--non-top': clsx(
    'after:opacity-0'
  ),
  'logo-wrap': clsx(
    'relative',
    'z-[2]',
    'rounded-md',
    'focus-shadow-white'
  ),
  'hamburger': clsx(
    'relative',
    'z-[2]',
    'flex',
    'items-center',
    'rounded-md',
    'h-[40px]',
    'w-[48px]',
    'border-[1px]',
    'border-transparent',
    'focus-shadow-white',
    'md:hidden'
  ),
  'hamburger-icon': clsx(
    'relative',
    'block',
    'mx-auto',
    'rounded-[2px]',
    'w-[24px]',
    'h-[2px]',
    'bg-white',
    'before:content-[""]',
    'before:absolute',
    'before:left-0',
    'before:block',
    'before:rounded-[2px]',
    'before:w-full',
    'before:h-[2px]',
    'before:overflow-hidden',
    'before:bg-white',
    'before:transition-all',
    'after:content-[""]',
    'after:absolute',
    'after:left-0',
    'after:block',
    'after:rounded-[2px]',
    'after:w-full',
    'after:h-[2px]',
    'after:overflow-hidden',
    'after:bg-white',
    'after:transition-all'
  ),
  'hamburger-icon--active': clsx(
    'before:top-0',
    'after:top-0'
  ),
  'hamburger-icon--inactive': clsx(
    'before:-top-2',
    'after:top-2'
  ),
  'logo': clsx(
    'max-w-[135px]'
  ),
  'menu': clsx(
    'fixed',
    'z-[1]',
    'top-0',
    'flex',
    'flex-wrap',
    'flex-col',
    'pt-[60px]',
    'w-full',
    'h-[100vh]',
    'max-h-[100vh]',
    'bg-[--theme-black]',
    'overflow-y-auto',
    'transition-all',
    'duration-300',
    'md:relative',
    'md:right-0',
    'md:flex-row',
    'md:items-center',
    'md:p-0',
    'md:w-auto',
    'md:h-auto',
    'md:bg-transparent',
    'md:overflow-y-visible'
  ),
  'menu--open': clsx(
    'right-0',
  ),
  'menu--close': clsx(
    '-right-full',
  ),
  'item': clsx(
    'md:inline-block'
  ),
  'link': clsx(
    'block',
    'rounded-md',
    'w-full',
    'px-[1.75rem]',
    'py-2',
    'focus-shadow-white',
    'md:w-auto',
    'md:px-3'
  ),
  'link--active': clsx(
    'text-white',
  ),
  'link--inactive': clsx(
    'text-[--theme-gray-400]',
    'hover:text-white'
  ),
  'search': clsx(
    'order-first',
    'p-3',
    'md:relative',
    'md:order-last',
    'md:p-0',
    'md:mx-3',
    'md:my-1',
    'md:after:content-[""]',
    'md:after:block',
    'md:after:absolute',
    'md:after:-right-[6px]',
    'md:after:bottom-[2px]',
    'md:after:w-[12px]',
    'md:after:h-[2px]',
    'md:after:rounded-[1px]',
    'md:after:bg-[--theme-gray-400]',
    'md:after:rotate-45',
    'md:after:transition-all',
    'md:after:duration-500',
    'md:after:origin-[0_50%]'
  ),
  'search--open': clsx(
    'md:after:scale-0',
  ),
  'search--close': clsx(
    'md:after:scale-1',
  ),
  'search-input': clsx(
    'block',
    'rounded-3xl',
    'border-2',
    'border-[--theme-gray-400]',
    'px-4',
    'py-2',
    'w-full',
    'text-white',
    'bg-transparent',
    'placeholder:opacity-80',
    'placeholder:text-base',
    'transition-all',
    'duration-300',
    'md:delay-500',
    'focus-shadow-white',
    'md:placeholder:text-sm'
  ),
  'search-input--close': clsx(
    'md:w-0',
    'md:px-[12px]',
    'md:py-0'
  ),
  'search-input--open': clsx(
    'md:border-white',
    'md:pl-4',
    'md:pr-10',
    'md:py-1',
    'md:w-[240px]',
    'md:max-w-[240px]'
  ),
  'search-close-btn': clsx(
    'invisible',
    'absolute',
    'top-0',
    'right-0',
    'w-[48px]',
    'h-full',
    'opacity-60',
    'hover:opacity-100',
    'focus:opacity-100', 
    'before:content-[""]',
    'before:block',
    'before:absolute',
    'before:top-[calc(50%-1px)]',
    'before:left-[calc(50%-8px)]',
    'before:rounded-[1px]',
    'before:w-[16px]',
    'before:h-[2px]',
    'before:bg-white',
    'before:origin-center',
    'before:rotate-45',
    'before:transition-all',
    'before:delay-500',
    'after:content-[""]',
    'after:block',
    'after:absolute',
    'after:top-[calc(50%-1px)]',
    'after:left-[calc(50%-8px)]',
    'after:rounded-[1px]',
    'after:w-[16px]',
    'after:h-[2px]',
    'after:bg-white',
    'after:origin-center',
    'after:rotate-[315deg]',
    'after:transition-all',
    'after:delay-500',
  ),
  'search-close-btn--show': clsx(
    'md:visible',
    'before:scale-100',
    'after:scale-100'
  ),
  'search-close-btn--hidden': clsx(
    'md:invisible',
    'before:scale-0',
    'after:scale-0'
  ),
  'search-icon': clsx(
    'absolute',
    'top-[50%]',
    'right-3',
    '-translate-y-[50%]',
    'fill-white',
    'opacity-70',
    'text-xl',
    'md:hidden'
  )
}

export default stylesNavbar