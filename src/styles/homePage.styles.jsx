import clsx from 'clsx'

const stylesHomePage = {
  'main-banner': clsx(
    'main-banner',
    'ratio',
    'before:pt-[100vh]',
    'sm:before:pt-[66.6666666667%]',
    'lg:before:pt-[56.25%]'
  ),
  'main-banner-picture': clsx(
    'h-full',
    'overflow-hidden'
  ),
  'main-banner-img': clsx(
    'h-full',
    'object-cover',
    'sm:w-full',
    'sm:h-auto'
  ),
  'main-banner-mask': clsx(
    'z-[2]',
    'h-full',
    'bg-black',
    'bg-opacity-30'
  ),
  'main-banner-slider': clsx(
    'z-[3]',
    'h-full',
    'text-white',
    '[&>*]:w-full',
    '[&>*]:h-full'
  ),
  'main-banner-slide-button': clsx(
    'group',
    'w-[48px]',
    'h-[48px]',
    'rounded-full',
    'border-[1px]',
    'border-[--theme-gray]',
    'text-center',
    'focus:outline-none',
    'focus:bg-white',
    'hover:bg-white',
    'transition-color',
    'duration-300',
    'absolute',
    'z-[2]',
    'bottom-[calc(50%-137px)]',
    'xl:bottom-[calc(50%-160px)]'
  ),
  'main-banner-slide-prev-button': clsx(
    'left-[12px]',
    'sm:left-[calc(50%-270px+12px)]',
    'md:left-[calc(50%-360px+12px)]',
    'lg:left-[calc(50%-480px+12px)]',
    'xl:left-[calc(50%-570px+12px)]',
    '2xl:left-[calc(50%-660px+12px)]'
  ),
  'main-banner-slide-next-button': clsx(
    'left-[72px]',
    'sm:left-[calc(50%-270px+24px+48px)]',
    'md:left-[calc(50%-360px+24px+48px)]',
    'lg:left-[calc(50%-480px+24px+48px)]',
    'xl:left-[calc(50%-570px+24px+48px)]',
    '2xl:left-[calc(50%-660px+24px+48px)]'
  ),
  'main-banner-slide-arrow': clsx(
    'transition-color',
    'duration-300',
    'group-hover:text-[--theme-black]',
    'group-focus:text-[--theme-black]',
    'inline-block'
  ),
  'main-banner-slide': clsx(
    'absolute',
    'z-[1]',
    'top-1/2',
    'l-0',
    'w-full',
    '-translate-y-1/2'
  ),
  'main-banner-slide-container': clsx(
    'w-full',
    'container',
    'mx-auto'
  ),
  'main-banner-slide-link': clsx(
    'block',
    'w-full',
    'sm:max-w-[50%]'
  ),
  'main-banner-slide-time': clsx(
    'drop-shadow-md',
    'mb-1'
  ),
  'main-banner-slide-title': clsx(
    'font-medium',
    'text-[1.5rem]',
    'leading-normal',
    'drop-shadow-lg',
    'line-clamp-3',
    'xl:text-[2rem]',
    'xl:leading-snug'
  )
}

export default stylesHomePage