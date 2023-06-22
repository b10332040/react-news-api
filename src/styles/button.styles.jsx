import clsx from 'clsx'

const stylesButton = {
  'self': clsx(
    'border-2',
    'border-[--theme-gray-200]',
    'rounded-full',
    'text-[--theme-gray-400]',
    'transition-colors',
    'disabled:opacity-60',
    'disabled:cursor-default'
  ),
  'self--base': clsx(
    'px-5',
    'py-2',
    'text-sm'
  ),
  'self--lg': clsx(
    'px-6',
    'py-3',
    'text-base'
  ),
  'self--inline-block': clsx(
    'inline-block'
  ),
  'self--block': clsx(
    'block',
    'w-full'
  ),
  'self--outlined': clsx(
    'hover:enabled:bg-[--theme-gray-200]',
    'hover:enabled:text-[--theme-black]',
    'focus:enabled:bg-[--theme-gray-200]',
    'focus:enabled:text-[--theme-black]'
  ),
  'self--filled': clsx(
    'text-[--theme-black]',
    'bg-[--theme-gray-200]',
    'hover:enabled:bg-[--theme-black]',
    'hover:enabled:border-[--theme-black]',
    'hover:enabled:text-white',
    'focus:enabled:bg-[--theme-black]',
    'focus:enabled:border-[--theme-black]',
    'focus:enabled:text-white'
  ),
  'self--processing': clsx(
    '[&>span]:relative',
    '[&>span]:w-1',
    '[&>span]:ml-1',
    '[&>span]:after:content-["."]',
    '[&>span]:after:block',
    '[&>span]:after:absolute',
    '[&>span]:after:bottom-0',
    '[&>span]:after:left-0',
    '[&>span:nth-child(1)]:after:animate-[loadingDot1_0.9s_linear_infinite]',
    '[&>span:nth-child(2)]:after:animate-[loadingDot2_0.9s_linear_infinite]',
    '[&>span:nth-child(3)]:after:animate-[loadingDot3_0.9s_linear_infinite]',
  ),
  'self--done': clsx(
    '[&>span]:invisible'
  )
}

export default stylesButton