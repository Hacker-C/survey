import type { IconProps } from '@iconify/react'
import { Icon } from '@iconify/react'
import React from 'react'

export const IIcon: React.FC<IconProps> = (props) => {
  return <Icon width={'20px'} { ...props }/>
}
