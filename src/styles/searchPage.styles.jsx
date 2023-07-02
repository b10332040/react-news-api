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
    'row': clsx(
      'row',
      'items-end'
    ),
    'result-text-wrap': clsx(
      'col',
      'mb-2',
      'w-full'
    ),
    'search-bar-wrap': clsx(
      'col',
      'mb-6',
      'w-full',
      'md:w-2/3',
      'md:mb-0'
    ),
    'drop-down-menu-wrap': clsx(
      'col',
      'w-full',
      'md:w-1/3',
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
      'disabled:opacity-50',
      'md:text-lg'
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
      'md:text-2xl'
    ),
    'keyword-list': clsx(
      'absolute',
      'z-[1]',
      'top-full',
      'left-0',
      'min-w-full',
      'max-h-[360px]',
      'p-3',
      'rounded-b',
      'bg-white',
      'overflow-y-auto',
      'overflow-x-hidden',
      'has-scrollbar',
      'shadow-md'
    ),
    'keyword-tab': clsx(
      'inline-block',
      'mr-1',
      'my-1',
      'px-3',
      'py-1',
      'rounded-full',
      'text-sm',
      'text-[--theme-black]',
      'bg-[--theme-gray-200]',
      'enabled:hover:text-white',
      'enabled:hover:bg-[--theme-black]',
      'enabled:focus:text-white',
      'enabled:focus:bg-[--theme-black]',
      'disabled:opacity-50'
    )
  }
}

export default styles