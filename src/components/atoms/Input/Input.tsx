import { ChangeEvent, useState, forwardRef, createElement } from "react";

import classNames from "classnames/dedupe";

import "./Input.scss";

type InputProps = {
  tag?: string;
  id?: string;
  type?: string;
  value?: string;
  className?: string;
  placeholder?: string;
  warning?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
};

const Input = forwardRef(
  (
    {
      tag = "input",
      className,
      warning,
      type = "text",
      value,
      placeholder,
      id,
      onChange,
      ...rest
    }: InputProps,
    ref
  ) => {
    const classes = classNames(className, "Input", {
      "Input-Warning": warning,
    });
    return createElement(tag, {
      id: id,
      className: classes,
      placeholder: placeholder,
      type: type,
      value: value,
      ref: ref,
      onChange: onChange,
      ...rest,
    });
  }
);

export default Input;
