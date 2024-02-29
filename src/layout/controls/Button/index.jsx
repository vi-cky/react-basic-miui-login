import React from "react";
import { Button } from "@mui/material";

export const SimpleButton = (props) => {
  const {
    id,
    name,
    block,
    type,
    classNames,
    danger,
    disabled,
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
        fullWidth={block} // Equivalent to Material-UI's fullWidth prop
        variant={type === "primary" ? "contained" : "outlined"} // Equivalent to Material-UI's variant prop
        className={classNames}
        color={danger ? "error" : "default"} // Equivalent to Material-UI's color prop
        disabled={disabled}
        href={href}
        startIcon={icon && React.cloneElement(icon, { fontSize: "inherit" })} // Equivalent to Material-UI's startIcon prop
        loading={loading} // No direct equivalent in Material-UI; consider using CircularProgress in combination with Button
        size={size} // Equivalent to Material-UI's size prop
        shape={shape === "round" ? "rounded" : undefined} // No direct equivalent; Material-UI's shape is limited to 'rounded', 'circular', or undefined
        style={styles}
        target={target}
        onClick={onClick}
        type={htmlType}
      >
        {label}
      </Button>
    </div>
  );
};
