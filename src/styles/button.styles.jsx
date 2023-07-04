import clsx from 'clsx'

const styles = {
  'self': clsx(
    'border-2',
    'border-[--theme-gray-200]',
    'rounded-full',
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
    'text-[--theme-gray-400]',
    'enabled:hover:bg-[--theme-gray-200]',
    'enabled:hover:text-[--theme-black]',
    'enabled:focus:bg-[--theme-gray-200]',
    'enabled:focus:text-[--theme-black]'
  ),
  'self--filled': clsx(
    'text-[--theme-black]',
    'bg-[--theme-gray-200]',
    'enabled:hover:bg-[--theme-black]',
    'enabled:hover:border-[--theme-black]',
    'enabled:hover:text-white',
    'enabled:focus:bg-[--theme-black]',
    'enabled:focus:border-[--theme-black]',
    'enabled:focus:text-white'
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

export default styles