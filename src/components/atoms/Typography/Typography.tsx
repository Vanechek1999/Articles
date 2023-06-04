import React,  { createElement } from 'react'

import classNames from 'classnames/dedupe'

import './Typography.scss' 

type TypographyProps = {
  align?: string
  alignDesktop?: string
  alignMobile?: string
  children: React.ReactNode,
  className?: string
  color?: string,
  display?: string,
  displayDesktop?: string,
  displayMobile?: string,
  fontFamily?: string,
  lineHeight?: string | number,
  lineHeightDesktop?: string | number,
  lineHeightMobile?: string | number,
  muted?: string,
  size?: number,
  sizeDesktop?: number,
  sizeMobile?: number,
  tag?: string,
  textStyle?: string,
  weight?: number,
  weightDesktop?: number,
  weightMobile?: number,
  link?: boolean
}

const Typography = 
  ({
    align,
    alignDesktop,
    alignMobile,
    children,
    className,
    color,
    display,
    displayDesktop,
    displayMobile,
    fontFamily,
    lineHeight,
    lineHeightDesktop,
    lineHeightMobile,
    muted,
    size,
    sizeDesktop,
    sizeMobile,
    tag,
    textStyle,
    weight,
    weightDesktop,
    weightMobile,
    link,
    ...rest
  }: TypographyProps) => {
  const Tag = tag ?? 'span'

  const classes = classNames(className, {
    [`Typography_alignDesktop_${align || alignDesktop}`]: align || alignDesktop,
    [`Typography_alignMobile_${align || alignMobile}`]: align || alignMobile,
    [`Typography_color_${color}`]: color,
    [`Typography_displayDesktop_${display || displayDesktop}`]: display || displayDesktop,
    [`Typography_displayMobile_${display || displayMobile}`]: display || displayMobile,
    [`Typography_fontFamily_${fontFamily}`]: fontFamily,
    [`Typography_lineHeight_${lineHeight}`]: lineHeight,
    [`Typography_lineHeightDesktop_${lineHeight || lineHeightDesktop}`]: lineHeight || lineHeightDesktop,
    [`Typography_lineHeightMobile_${lineHeight || lineHeightMobile}`]: lineHeight || lineHeightMobile,
    [`Typography_muted_${muted}`]: muted,
    [`Typography_sizeDesktop_${size || sizeDesktop}`]: size || sizeDesktop,
    [`Typography_sizeMobile_${size || sizeMobile}`]: size || sizeMobile,
    [`Typography_textStyle_${textStyle}`]: textStyle,
    [`Typography_weightDesktop_${weight || weightDesktop}`]: weight || weightDesktop,
    [`Typography_weightMobile_${weight || weightMobile}`]: weight || weightMobile,
    'Typography_link': link,
  })

  return createElement(
    Tag,
    {className: classes},
    children
  )

}

export default Typography