import React from 'react'
import { Button } from 'actify'
import MenuContext from './MenuContext'
import { useListItem, useFloatingTree, useMergeRefs } from '@floating-ui/react'

const MenuItem = React.forwardRef((props, ref) => {
  const { label, disabled, ...rest } = props

  const menu = React.useContext(MenuContext)
  const item = useListItem({ label: disabled ? null : label })
  const tree = useFloatingTree()
  const isActive = item.index === menu.activeIndex

  return (
    <li
      {...rest}
      ref={useMergeRefs([item.ref, ref])}
      type="button"
      role="menuitem"
      className="MenuItem cursor-pointer hover:bg-surface p-1 rounded-md list-none"
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...menu.getItemProps({
        onClick(event) {
          rest.onClick?.(event)
          tree?.events.emit('click')
        },
        onFocus(event) {
          rest.onFocus?.(event)
          menu.setHasFocusInside(true)
        }
      })}
    >
      {label}
    </li>
  )
})

MenuItem.displayName = 'Actify.MenuItem'

export default MenuItem
