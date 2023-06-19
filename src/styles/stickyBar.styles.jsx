import clsx from 'clsx'

const stylesStickyBar = {
  'self': clsx(
    'fixed',
    'z-30',
    'left-0',
    'w-full',
    'bg-[--theme-gray-50]',
    'transition-all',
    'duration-300'
  ),
  'children-wrap': clsx(
    'container',
    'w-full',
    'after:content-[""]',
    'after:block',
    'after:absolute',
    'after:left-0',
    'after:bottom-0',
    'after:w-full',
    'after:border-b-2',
    'after:border-[--theme-gray-200]'
  )
}

export default stylesStickyBar