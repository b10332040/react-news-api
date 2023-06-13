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
    '[&>section]:border-t-2',
    '[&>section]:border-[--theme-gray-200]',
    'lg:border-l-2',
    'lg:border-[--theme-gray-200]',
    'lg:[&>section:first-child]:border-t-0'
  )
}

export default stylesMainRightSide