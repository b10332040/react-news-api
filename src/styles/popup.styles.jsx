import clsx from 'clsx'

const styles = {
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
      'mx-auto',
      'w-[calc(100%-2.5rem)]',
      'h-auto',
      'py-5'
    ),
    'self--full-in-mobile': clsx(
      'w-full',
      'h-full',
      'max-h-full',
      'sm:inline-block',
      'sm:align-middle',
      'sm:mx-auto',
      'sm:h-auto',
      'sm:max-h-none',
      'sm:py-5'
    ),
    'content': clsx(
      'relative',
      'flex',
      'flex-col',
      'w-full',
      'h-full',
      'max-h-full',
      'bg-[--theme-gray-50]',
      'overflow-hidden'
    )
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
      'w-full'
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
      'overflow-y-auto',
      'has-scrollbar',
      '[&>hr]:border-[--theme-gray-200]'
    )
  },
  'title-in-body': {
    'self': clsx(
      'z-[1]',
      'py-2',
      'text-[--theme-black]',
      'text-sm',
      'font-semibold'
    )
  },
  'radio-tabs-in-body': {
    'self': clsx(
      'w-full',
      'text-[0px]'
    ),
    'tab': clsx(
      'relative',
      'z-[1]',
      'inline-block',
      'ml-2',
      'first:ml-0',
      'my-1',
      'text-sm'
    ),
    'radio': clsx(
      'invisible',
      'absolute',
      'top-0',
      'left-0',
      'peer'
    ),
    'label': clsx(
      'block',
      'px-3',
      'py-1',
      'rounded-full',
      'text-[--theme-black]',
      'bg-[--theme-gray-200]',
      'cursor-pointer',
      'transition-colors',
      'duration-300',
      'peer-enabled:hover:text-white',
      'peer-enabled:hover:bg-[--theme-black]',
      'peer-checked:text-white',
      'peer-checked:bg-[--theme-black]',
      'peer-disabled:cursor-default',
      'peer-disabled:opacity-50'
    ),
  },
  'radio-list-in-body': {
    'self': clsx(
      'w-full'
    ),
    'item': clsx(
      'relative',
      'z-[1]',
      'block'
    ),
    'radio': clsx(
      'invisible',
      'absolute',
      'top-0',
      'left-0',
      'peer'
    ),
    'label': clsx(
      'relative',
      'z-[1]',
      'rounded-full',
      'block',
      'pl-3',
      'pr-6',
      'py-2',
      'text-[--theme-black]',
      'cursor-pointer',
      'transition-colors',
      'duration-300',
      'before:content-[""]',
      'before:block',
      'before:absolute',
      'before:top-[calc(50%-4px)]',
      'before:right-[16px]',
      'before:rounded-full',
      'before:bg-transparent',
      'before:h-[8px]',
      'before:w-[8px]',
      'before:transition-colors',
      'before:duration-300',
      'after:content-[""]',
      'after:block',
      'after:absolute',
      'after:top-[calc(50%-8px)]',
      'after:right-3',
      'after:rounded-full',
      'after:border-[1px]',
      'after:border-[--theme-gray-300]',
      'after:w-[16px]',
      'after:h-[16px]',
      'after:transition-colors',
      'after:duration-300',
      'peer-checked:before:bg-[--theme-black]',
      'peer-checked:after:border-[--theme-black]',
      'peer-enabled:hover:after:border-[--theme-black]',
      'peer-enabled:hover:bg-[--theme-gray-200]',
      'peer-disabled:cursor-default',
      'peer-disabled:opacity-50',
    ),
  },
  'change-content-button': {
    'self': clsx(
      'block',
      'w-full',
      'text-left',
      'enabled:hover:pl-3',
      'enabled:focus:pl-3',
      'disabled:opacity-50',
      'transition-all'
    ),
    'children-wrap': clsx(
      'flex',
      'flex-wrap',
      'justify-between',
      'items-center'
    ),
    'note': clsx(
      'block',
      'w-1/2',
      'text-[--theme-gray-400]',
      'text-right',
      'line-clamp-1'
    )
  },
  'footer': {
    'self': clsx(
      'self-end',
      'w-full',
      'p-3'
    )
  }
}

export default styles