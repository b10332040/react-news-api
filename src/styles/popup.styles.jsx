import clsx from 'clsx'

const stylesPopup = {
  'popup': {
    'self': clsx(
      'fixed',
      'z-[50]',
      'top-0',
      'left-0',
      'right-0',
      'bottom-0',
      'transition-all',
      'duration-300',
      'text-center',
      'overflow-x-hidden',
      'overflow-y-auto'
    ),
    'self--normal-in-mobile': clsx(
      'after:content-[""]',
      'after:inline-block',
      'after:align-middle',
      'after:h-full'
    ),
    'self--full-in-mobile': clsx(
      'sm:after:content-[""]',
      'sm:after:inline-block',
      'sm:after:align-middle',
      'sm:after:h-full'
    ),
    'backdrop': clsx(
      'fixed',
      'z-[1]',
      'top-0',
      'left-0',
      'right-0',
      'bottom-0',
      'bg-[--theme-black]',
      'opacity-50'
    )
  },
  'dialog': {
    'self': clsx(
      'relative',
      'z-[2]',
      'text-left',
      'transition-transform',
      'duration-300',
      'delay-100'
    ),
    'self--base': clsx(
      'sm:max-w-[500px]'
    ),
    'self--sm': clsx(
      'sm:max-w-[300px]'
    ),
    'self--lg': clsx(
      'sm:max-w-[800px]'
    ),
    'self--normal-in-mobile': clsx(
      'inline-block',
      'align-middle',
      'py-5',
      'mx-auto',
      'w-[calc(100%-2.5rem)]',
      'max-h-none'
    ),
    'self--full-in-mobile': clsx(
      'w-full',
      'h-full',
      'max-h-full',
      'sm:inline-block',
      'sm:align-middle',
      'sm:py-5',
      'sm:mx-auto',
      'sm:max-h-none'
    ),
    'children-wrap': clsx(
      'relative',
      'z-[1]',
      'flex',
      '[&>*]:shrink-0',
      'w-full',
      'h-full',
      'bg-[--theme-gray-50]',
      'overflow-hidden'
    ),
  },
  'content': {
    'self': clsx(
      'flex',
      'flex-col',
      'w-full',
      'h-full',
      'max-h-full',
      'overflow-hidden',
    )
  },
  'header': {
    'self': clsx(
      'relative',
      'z-[1]',
      'flex',
      'flex-wrap',
      'items-center',
      'w-full',
      'pl-3'
    ),
    'close-button': clsx(
      'group',
      'relative',
      'z-[1]',
      'top-0',
      'right-0',
      'w-[48px]',
      'h-[48px]',
    ),
    'close-button-icon': clsx(
      'absolute',
      'z-[1]',
      'top-1/2',
      'left-1/2',
      'text-[--theme-black]',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'group-hover:text-[--theme-gray-400]',
      'group-focus:text-[--theme-gray-400]'
    ),
  },
  'title': {
    'self': clsx(
      'text-[--theme-black]',
      'text-xl',
      'font-semibold',
      'line-clamp-1'
    )
  },
  'body': {
    'self': clsx(
      'grow',
      'w-full',
      'px-3',
      'py-2',
      'overflow-y-auto',
      'has-scrollbar',
      '[&>hr]:border-[--theme-gray-200]'
    )
  },
  'title-in-body': {
    'self': clsx(
      'py-2',
      'text-[--theme-black]',
      'text-sm'
    )
  },
  'inner-content-open-button': {
    'self': clsx(
      'block',
      'w-full',
      'text-left',
      'enabled:hover:pl-3',
      'enabled:focus:pl-3',
      'disabled:opacity-50',
      'transition-all'
    ),
    'title': clsx(
      '[&>span]:block',
      '[&>span]:float-right',
      '[&>span]:text-[--theme-gray-400]',
      '[&>span]:text-right'
    )
  },
  'inner-content': {
    'self': clsx(
      'flex',
      'w-full',
      'h-full',
      'overflow-hidden',
      'transition-all',
      'duration-300'
    )
  },
  'inner-content-header': {
    'prev-button': clsx(
      'group',
      'absolute',
      'z-[1]',
      'top-0',
      'left-0',
      'block',
      'w-[48px]',
      'h-[48px]'
    ),
    'prev-button-icon': clsx(
      'absolute',
      'z-[1]',
      'top-1/2',
      'left-1/2',
      'text-[--theme-black]',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'group-hover:text-[--theme-gray-400]',
      'group-focus:text-[--theme-gray-400]'
    ),
    'children-wrap': clsx(
      'ml-[36px]'
    )
  },
  'footer': {
    'self': clsx(
      'self-end',
      'w-full',
      'px-3',
      'py-2'
    )
  }
}

export default stylesPopup