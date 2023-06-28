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
      'from-slate-900',
      'to-slate-800'
    ),
    'container': clsx(
      'container',
      'pt-32',
      'pb-14'
    ),
    'result-text': clsx(
      'col',
      'mb-1',
      'w-full',
      'text-[--theme-gray-50]',
      'opacity-70',
      'text-sm',
    ),
    'search-bar-wrap': clsx(
      'relative',
      'col',
      'w-full',
      'md:w-1/2',
      'xl:w-8/12'
    ),
    'search-bar': clsx(

    ),
    'search-bar-icon-wrap': clsx(

    ),
    'search-bar-icon': clsx(

    ),
    'sort-by-select-wrap': clsx(
      'col',
      'w-full',
      'md:w-1/2',
      'xl:4/12'
    )
  }
}

export default styles