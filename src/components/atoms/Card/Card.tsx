import React from "react";
import classNames from "classnames";

import Paper from "../Paper/Paper";

import './Card.scss'

type Space = {
  desktop?: number;
  mobile?: number;
  all?: number;
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
  theme?: string;
};

const Card = ({ theme, className, children }: CardProps) => {
  const classes = classNames(className, "Card", {
    [`Card_theme_${theme}`]: theme,
  });

  return <div className={classes}>{children}</div>;
};

export default Card;
