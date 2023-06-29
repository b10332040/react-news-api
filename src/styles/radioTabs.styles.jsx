import clsx from 'clsx'

/**
 * RadioTabList 樣式
 */
const styles = {
  'radio-tabs': {
    'self': clsx(
      'w-full'
    )
  },
  'tab': {
    'self': clsx(
      'relative',
      'z-[1]',
      'inline-block',
      'ml-2',
      'first:ml-0',
      'my-1',
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
    )
  }
}

export default styles