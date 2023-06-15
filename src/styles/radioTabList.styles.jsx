import clsx from 'clsx'

/**
 * RadioTabList 樣式
 */
const stylesRadioTabList = {
  'self': clsx(
    'whitespace-nowrap',
    'overflow-x-auto',
    'overflow-y-hidden',
    'text-[0rem]',
    'no-scrollbar',
    'no-scrollbar::-webkit-scrollbar'
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
    'hover:enabled:text-[--theme-black]',
    'peer-checked:text-[--theme-black]',
    'peer-checked:[&>span]:after:border-[--theme-black]',
    'peer-disabled:cursor-default',
    'peer-disabled:opacity-50',
    'peer-checked:peer-disabled:[&>span]:after:opacity-50'
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

export default stylesRadioTabList