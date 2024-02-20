import { Button, Form } from "antd";
import React from "react";

export const SimpleButton = (props) => {
  const {
    id,
    name,
    block,
    type,
    classNames,
    danger,
    disabled,
    ghost,
    href,
    icon,
    loading,
    size,
    shape,
    target,
    onClick,
    label,
    htmlType,
    styles,
  } = props;
  return (
    <div>
      <Button
        id={id}
        name={name}
        block={block}
        type={type}
        className={classNames}
        danger={danger}
        disabled={disabled}
        ghost={ghost}
        href={href}
        htmlType={htmlType}
        icon={icon}
        loading={loading}
        shape={shape}
        size={size}
        styles={styles}
        target={target}
        onClick={onClick}
      >{label}</Button>
    </div>
  );
};
