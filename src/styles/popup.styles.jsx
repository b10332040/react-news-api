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
      'delay-100',
      'shadow-lg',
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
      'h-auto',
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
      'sm:h-auto',
      'sm:max-h-none'
    ),
    'content': clsx(
      'flex',
      'flex-col',
      'w-full',
      'h-full',
      'bg-[--theme-gray-50]',
      'overflow-hidden',
    ),
  },
  'header': {
    'self': clsx(
      'flex',
      'justify-between',
      'items-center',
      'w-full',
    ),
    'close-button': clsx(
      'group',
      'relative',
      'w-[48px]',
      'h-[48px]',
    ),
    'close-button-icon': clsx(
      'absolute',
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
      'px-3',
      'py-2',
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
      'has-scrollbar'
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