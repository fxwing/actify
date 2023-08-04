import React, { forwardRef } from 'react'
import { icons } from 'lucide-react'
import { setColor } from '@/packages/utils'

const Icon = forwardRef((props, ref) => {
  const { name, color, size, className, ...rest } = props
  const LucideIcon = icons[name]

  return (
    <i className={className}>
      <LucideIcon ref={ref} {...rest} color={setColor(color)} size={size} />
    </i>
  )
})

Icon.displayName = 'Actify.Icon'

export default Icon
