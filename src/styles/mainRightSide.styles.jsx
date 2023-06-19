import clsx from 'clsx'

/**
 * MainRightSide 樣式
 */
const stylesMainRightSide = {
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
  )
}

export default stylesMainRightSide