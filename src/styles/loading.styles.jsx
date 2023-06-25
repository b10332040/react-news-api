import clsx from 'clsx'

const styles = {
  'self': clsx(
    'relative',
    'z-[1]',
    'top-0',
    'left-0',
    'w-full',
    'h-full'
  ),
  'loading': clsx(
    'absolute',
    'top-1/2',
    'left-1/2',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'block',
    'w-[36px]',
    'h-[36px]',
    'border-4',
    'border-[--theme-gray-200]',
    'border-b-[--theme-black]',
    'rounded-[50%]',
    'animate-[loadingRotation_0.6s_linear_infinite]'
  )
}

export default styles