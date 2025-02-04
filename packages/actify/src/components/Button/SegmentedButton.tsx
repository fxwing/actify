'use client'
import React, {
  forwardRef,
  Children,
  isValidElement,
  cloneElement
} from 'react'

import { tv, VariantProps } from 'tailwind-variants'

const variants = tv({
  base: 'flex',
  variants: {
    variant: {
      elevated: 'divide-x divide-surface',
      filled: 'divide-x divide-surface',
      tonal: 'divide-x divide-surface',
      outlined: '',
      text: 'divide-x divide-surface'
    },
    roundedRightNone: {
      true: 'rounded-r-none'
    },
    borderRightZero: {
      true: 'border-r-0'
    },
    roundedLeftNone: {
      true: 'rounded-l-none'
    }
  },
  defaultVariants: {
    variant: 'filled'
  }
})

interface SegmentedButtonProps
  extends VariantProps<typeof variants>,
    React.HTMLAttributes<HTMLDivElement> {
  ripple?: boolean
}

const SegmentedButton: React.FC<SegmentedButtonProps> = forwardRef(
  (props, ref?: React.Ref<HTMLDivElement>) => {
    const {
      color,
      style,
      variant,
      className,
      children,
      ripple = true,
      ...rest
    } = props

    return (
      <div ref={ref} {...rest} style={style} className={variants({ variant })}>
        {Children.map(
          children,
          (child, index) =>
            isValidElement(child) &&
            // @ts-expect-error
            cloneElement<SegmentedButtonProps>(child, {
              color,
              ripple,
              variant,
              className: variants({
                roundedRightNone: index !== Children.count(children) - 1,
                borderRightZero: index !== Children.count(children) - 1,
                roundedLeftNone: index !== 0,
                className: child.props.className
              })
            })
        )}
      </div>
    )
  }
)

SegmentedButton.displayName = 'Actify.SegmentedButton'

export { SegmentedButton }
