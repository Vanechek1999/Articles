import { ReactNode, createElement } from 'react'
import classNames from 'classnames/dedupe'

import './Paper.scss'

// sizes: 0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120

type Padding = {
  desktop?: number
  mobile?: number
  all?: number
}

type PaperProps = {
  tag?: string
  children: ReactNode
  className?: string
  style?: string
  top?: Padding
  right?: Padding
  bottom?: Padding
  left?: Padding
  display?: string
  center?: boolean,
  align?: string,
  onClick?: () => void
}

const Paper = ({
  tag = 'div',
  children,
  className,
  style,
  top,
  right,
  bottom,
  left,
  display,
  align,
  ...rest
}: PaperProps) => {
  const classes = classNames(className, 'Paper', {
    [`Paper_topDesktop_${top?.desktop || top?.all}`]: top?.desktop || top?.all,
    [`Paper_rightDesktop_${right?.desktop || right?.all}`]: right?.desktop || right?.all,
    [`Paper_bottomDesktop_${bottom?.desktop || bottom?.all}`]: bottom?.desktop || bottom?.all,
    [`Paper_leftDesktop_${left?.desktop || left?.all}`]: left?.desktop || left?.all,
    [`Paper_topMobile_${top?.mobile || top?.all}`]: top?.mobile || top?.all,
    [`Paper_rightMobile_${right?.mobile || right?.all}`]: right?.mobile || right?.all,
    [`Paper_bottomMobile_${bottom?.mobile || bottom?.all}`]: bottom?.mobile || bottom?.all,
    [`Paper_leftMobile_${left?.mobile || left?.all}`]: left?.mobile || left?.all,
    [`Paper_${display}`]: display,
    [`Paper_${align}`]: align,
  })

  return createElement(
    tag,
    {
      className: classes,
      style,
      ...rest,
    },
    children,
  )
}

export default Paper
