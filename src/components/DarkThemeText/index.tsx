import type { PropsWithChildren } from 'react'

export function DarkThemeText({ children }: PropsWithChildren<{}>) {
  return <span className='theme-duration text-gray-800 dark:(text-darktext)'>{children}</span>
}
