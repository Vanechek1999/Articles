import classNames from "classnames/dedupe";

import Paper from "../Paper/Paper";

import "./Button.scss";
import { ReactNode } from "react";

type Space = {
  desktop?: number;
  mobile?: number;
  all?: number;
};

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  backGround?: string;
  xSpace?: Space;
  ySpace?: Space;
  textSize?: number;
  display?: string;
  fullWidth?: boolean;
  align?: string;
  justify?: string,
  disabled?: boolean,
  borderColor?: string
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  type = "button",
  color,
  xSpace,
  ySpace,
  backGround,
  display,
  fullWidth,
  align,
  disabled,
  borderColor,
  onClick,
}: ButtonProps) => {
  const classes = classNames(className, "Button", {
    [`Button_color_${color}`]: color,
    [`Button_backGround_${backGround}`]: backGround,
    [`Button_borderColor_${borderColor}`]: borderColor,
    [`Button_display_${display}`]: display,
    [`Button_align_${align}`]: align,
    Button_fullWidth: fullWidth,
  });

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      <Paper
        top={ySpace}
        right={xSpace}
        bottom={ySpace}
        left={xSpace}
      >
        {children}
      </Paper>
    </button>
  );
};

export default Button;
