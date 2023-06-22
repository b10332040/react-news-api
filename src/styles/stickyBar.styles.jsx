import clsx from 'clsx'

const stylesStickyBar = {
  'sticky-bar': {
    'self': clsx(
      'fixed',
      'z-30',
      'left-0',
      'w-full',
      'bg-[--theme-gray-50]',
      'transition-all',
      'duration-300'
    ),
    'container': clsx(
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
  },
  'icon-button': {
    'self': clsx(
      'group',
      'relative',
      'z-[1]',
      'block',
      'w-[44px]',
      'h-[44px]'
    ),
    'icon': clsx(
      'relative',
      'z-[2]',
      'inline-block',
      'text-[--theme-gray-400]',
      'group-hover:text-[--theme-black]',
      'group-focus:text-[--theme-black]',
    )
  }
}

export default stylesStickyBar