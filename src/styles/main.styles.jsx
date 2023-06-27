import clsx from 'clsx'

/**
 * Main 樣式
 */
const styles = {
  'main': {
    'self': clsx(
      'my-[80px]',
      'xl:my-[100px]',
      'container'
    )
  },
  'left-side': {
    'self': clsx(
      'col',
      'mb-[60px]',
      'md:mb-[80px]',
      'lg:mb-0',
      'w-full',
      'lg:w-8/12'
    ),
    'container': clsx(
      'h-full',
      'min-h-[160px]'
    ),
  },
  'right-side': {
    'self': clsx(
      'col',
      'w-full',
      'lg:w-4/12'
    ),
    'container': clsx(
      'h-full',
      'lg:border-l-2',
      'lg:border-[--theme-gray-200]'
    ),
    'stickyWrap': clsx(
      '[&>section]:border-t-2',
      '[&>section]:border-[--theme-gray-200]',
      'lg:[&>section:first-child]:border-t-0'
    ),
    'stickyWrap--sticky': clsx(
      'lg:sticky',
      'lg:top-[105px]'
    ),
  },
  'right-side-section': {
    'connect-list': clsx(
      '[&>li:not(:first-child)]:ml-2',
      '[&>li]:inline-block'
    )
  }
}

export default styles