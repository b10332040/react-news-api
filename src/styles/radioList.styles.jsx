import clsx from 'clsx'

const styles = {
  'radio-list': {
    'self': clsx(
      'w-full'
    )
  },
  'item': {
    'self': clsx(
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
    )
  }
}

export default styles