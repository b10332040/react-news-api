import clsx from 'clsx'

const styles = {
  'container-inner': clsx(
    'col',
    'mx-auto',
    'w-full',
    'max-w-[848px]'
  ),
  'main-header': {
    'self': clsx(
      'w-full',
      'bg-gradient-to-t',
      'from-cyan-950',
      'to-slate-900'
    ),
    'container': clsx(
      'container',
      'pt-36',
      'pb-20'
    ),
    'result-text-wrap': clsx(
      'col',
      'mb-2',
      'w-full'
    ),
    'search-bar-wrap': clsx(
      'col',
      'mb-6',
      'w-full'
    ),
    'drop-down-menu-wrap': clsx(
      'col',
      'w-full',
      'md:w-1/2',
    )
  },
  'main-result-text': {
    'self': clsx(
      'opacity-90',
      'text-[--theme-gray-50]',
      'text-sm'
    )
  },
  'main-search': {
    'self-wrap': clsx(
      'relative',
      'z-[1]',
      'w-full',
    ),
    'self': clsx(
      'peer',
      'block',
      'rounded-none',
      'w-full',
      'pr-[56px]',
      'py-2',
      'text-3xl',
      'text-white',
      'placeholder:opacity-50',
      'border-b-[1px]',
      'border-white',
      'border-opacity-30',
      'bg-transparent',
      'enabled:focus:border-opacity-50',
      'enabled:hover:border-opacity-50',
      'disabled:opacity-50'
    ),
    'submit-button': clsx(
      'absolute',
      'z-[1]',
      'top-1/2',
      'right-0',
      'w-[48px]',
      'h-[48px]',
      '-translate-y-1/2',
      'opacity-50',
      'peer-enabled:peer-focus:opacity-100',
      'enabled:hover:opacity-100',
      'enabled:focus:opacity-100'
    ),
    'submit-button-icon': clsx(
      'block',
      'ml-auto',
      'text-white',
      'text-3xl',
    )
  }
}

export default styles