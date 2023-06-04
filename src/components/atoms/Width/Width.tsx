import classNames from 'classnames/dedupe'

import './Width.scss'

type WidhtProps = {
  className?: string,
  size: number,
  align?: string,
  mobileFullWidth?: boolean,
  children: React.ReactNode,
}

const Width = ({ className, size, align, mobileFullWidth, children}: WidhtProps) => (
  <div
    className={classNames(className, "Width", {
      [`Width_${align}`]: align,
      Width_mobileFullWidth: mobileFullWidth,
    })}
    style={{ width: `${size}em`}}
  >
    {children}
  </div>
)

export default Width