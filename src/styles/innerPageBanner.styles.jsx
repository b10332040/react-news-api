import clsx from 'clsx'

const styles = {
  'inner-page-banner': {
    'self': clsx(
      'relative',
      'z-[1]',
      'w-full',
      'h-[400px]',
      'after:content-[""]',
      'after:block',
      'after:absolute',
      'after:z-[2]',
      'after:top-0',
      'after:left-0',
      'after:w-full',
      'after:h-full',
      'after:bg-black',
      'after:bg-opacity-30'
    ),
    'picture-wrap': clsx(
      'absolute',
      'z-[1]',
      'top-0',
      'left-0',
      'right-0',
      'bottom-0'
    ),
    'picture': clsx(
      'w-full',
      'h-full'
    ),
    'img': clsx(
      'w-full',
      'h-full',
      'object-cover'
    )
  },
  'title': {
    'self-wrap': clsx(
      'absolute',
      'z-[3]',
      'bottom-1/3',
      'left-1/2',
      'container',
      'mx-auto',
      'w-full',
      '-translate-x-1/2'
    ),
    'self': clsx(
      'w-full',
      'sm:max-w-[50%]',
      'text-white',
      'font-medium',
      'text-2xl',
      'leading-normal',
      'drop-shadow-lg',
      'xl:text-3xl',
      'xl:leading-snug'
    )
  },
  'radio-tabs-wrap': {
    'self': clsx(
      'absolute',
      'left-0',
      'bottom-0',
      'z-[3]',
      'w-full'
    ),
    'form': clsx(
      'container',
      'relative'
    )
  },
  'radio-tabs': {
    'self': clsx(
      'whitespace-nowrap',
      'overflow-x-auto',
      'overflow-y-hidden',
      'text-[0rem]',
      'has-scrollbar',
      'last:absolute',
      'last:left-0',
      'last:top-full',
      'last:w-full'
    ),
    'item': clsx(
      'relative',
      'z-[1]',
      'inline-block',
      'text-sm'
    ),
    'input': clsx(
      'invisible',
      'absolute',
      'top-0',
      'left-0',
      'peer'
    ),
    'label': clsx(
      'relative',
      'p-3',
      'font-bold',
      'text-[--theme-gray-400]',
      'cursor-pointer',
      'transition-colors',
      'duration-300',
      'peer-disabled:cursor-default',
      'peer-disabled:opacity-50'
    ),
    'label--light': clsx(
      'peer-enabled:hover:text-[--theme-gray-50]',
      'peer-checked:text-[--theme-gray-50]',
      'peer-checked:[&>span]:after:border-white',
      'peer-checked:peer-disabled:[&>span]:after:opacity-50'
    ),
    'label--dark': clsx(
      'peer-enabled:hover:text-[--theme-black]',
      'peer-checked:text-[--theme-black]',
    ),
    'label-text': clsx(
      'relative',
      'inline-block',
      'py-3',
      'after:content-[""]',
      'after:block',
      'after:absolute',
      'after:left-0',
      'after:bottom-0',
      'after:w-full',
      'after:border-b-2',
      'after:border-transparent',
      'after:transition-color',
      'after:duration-300'
    )
  }
}

export default styles