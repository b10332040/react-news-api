import clsx from 'clsx'

/**
 * HomePage 樣式
 */
const stylesHomePage = {
  'main-banner': {
    'self': clsx(
      'main-banner',
      'ratio',
      'before:pt-[100vh]',
      'sm:before:pt-[66.6666666667%]',
      'lg:before:pt-[56.25%]'
    ),
    'picture': clsx(
      'overflow-hidden'
    ),
    'img': clsx(
      'h-full',
      'object-cover',
      'sm:w-full',
      'sm:h-auto'
    ),
    'mask': clsx(
      'z-[2]',
      'bg-black',
      'bg-opacity-30'
    ),
    'content': clsx(
      'absolute',
      'z-[3]',
      'top-1/2',
      'left-1/2',
      'l-0',
      'container',
      'mx-auto',
      'w-full',
      '-translate-y-1/2',
      '-translate-x-1/2'
    ),
    'title': clsx(
      'w-full',
      'sm:max-w-[50%]',
      'text-white',
      'font-medium',
      'text-[1.5rem]',
      'leading-normal',
      'drop-shadow-lg',
      'line-clamp-3',
      'xl:text-[2rem]',
      'xl:leading-snug'
    )
  },
  'main-banner-slider': {
    'self': clsx(
      'z-[3]',
      'text-white',
      '[&>*]:w-full',
      '[&>*]:h-full'
    ),
  },
  'main-banner-slide': {
    'self': clsx(
      'absolute',
      'z-[1]',
      'top-1/2',
      'l-0',
      'w-full',
      '-translate-y-1/2'
    ),
    'container': clsx(
      'w-full',
      'container',
      'mx-auto'
    ),
    'link': clsx(
      'block',
      'w-full',
      'sm:max-w-[50%]'
    ),
    'time': clsx(
      'drop-shadow-md',
      'mb-1'
    ),
    'title': clsx(
      'font-medium',
      'text-[1.5rem]',
      'leading-normal',
      'drop-shadow-lg',
      'line-clamp-3',
      'xl:text-[2rem]',
      'xl:leading-snug'
    ),
  },
  'main-banner-slider-arrow-button': {
    'self': clsx(
      'absolute',
      'z-[2]',
      'bottom-[calc(50%-137px)]',
      'xl:bottom-[calc(50%-160px)]',
      'group',
      'w-[48px]',
      'h-[48px]',
      'rounded-full',
      'border-[1px]',
      'border-[--theme-gray-400]',
      'text-center',
      'focus:bg-white',
      'hover:bg-white',
    ),
    'prev': clsx(
      'left-[12px]',
      'sm:left-[calc(50%-270px+12px)]',
      'md:left-[calc(50%-360px+12px)]',
      'lg:left-[calc(50%-480px+12px)]',
      'xl:left-[calc(50%-570px+12px)]',
      '2xl:left-[calc(50%-660px+12px)]'
    ),
    'next': clsx(
      'left-[72px]',
      'sm:left-[calc(50%-270px+24px+48px)]',
      'md:left-[calc(50%-360px+24px+48px)]',
      'lg:left-[calc(50%-480px+24px+48px)]',
      'xl:left-[calc(50%-570px+24px+48px)]',
      '2xl:left-[calc(50%-660px+24px+48px)]'
    ),
    'arrow': clsx(
      'absolute',
      'top-1/2',
      'left-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'transition-all',
      'group-hover:text-[--theme-black]',
      'group-focus:text-[--theme-black]'
    ),
    'arrow--left': clsx(
      'group-hover:left-[calc(50%-2px)]'
    ),
    'arrow--right': clsx(
      'group-hover:left-[calc(50%+2px)]'
    )
  }
}

export default stylesHomePage