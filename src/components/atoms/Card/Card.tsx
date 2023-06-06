import React from "react";
import classNames from "classnames";

import Paper from "../Paper/Paper";

import './Card.scss'

type CardProps = {
  children: React.ReactNode;
  className?: string;
  theme?: string;
  display?: string
};

const Card = ({ theme, className, display, children }: CardProps) => {
  const classes = classNames(className, "Card", {
    [`Card_theme_${theme}`]: theme,
    [`Card_display_${display}`]: display,
  });

  return <div className={classes}>{children}</div>;
};

export default Card;
