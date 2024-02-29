import React, { useState } from "react";
import { TextField, FormControl, InputAdornment } from "@mui/material";

export const SimpleInput = ({
  name,
  label,
  required,
  tooltip,
  placeholder,
  validationOn,
  email,
  ipPool,
  onSimpleChange,
  addOnBeforeValue,
  addonAfter,
  defaultValue,
  disabled,
  minLength,
  maxLength,
  Focus,
  tabIndex,
  type,
  noofDecimal,
  form,
  customMessageRule,
  size,
  rulesBit,
  id,
  style,
  inputStyle,
  min,
  restrictSpace,
  className,
  removeRequiredLabel,
  isUppercase,
  restrictRegex,
  isCopyPaste,
  validateRegex,
  prefix,
}) => {
  isUppercase = isUppercase ? isUppercase : false;
  isCopyPaste = isCopyPaste ? isCopyPaste : false;
  removeRequiredLabel = removeRequiredLabel ? removeRequiredLabel : false;
  min = min ? min : 1;
  type = type === "numeric" ? "number" : type;
  tooltip = tooltip ? tooltip : false;
  size = size === undefined ? "medium" : size;
  disabled = disabled ? disabled : false;
  label = label ? label : "";
  validationOn = validationOn ? validationOn : label;
  id = id ? id : "txt" + name;
  noofDecimal = noofDecimal ? noofDecimal - 1 : 0;
  style = style ? style : {};
  restrictSpace = restrictSpace ? restrictSpace : false;
  validateRegex = validateRegex ? validateRegex : false;
  restrictRegex = restrictRegex ? restrictRegex : false;
  className = className ? className : "w-100";
  var invalidChars = ["-", "+", "e"];

  const [val, setVal] = useState(defaultValue);

  const handleDecimal = (evt, caller) => {
    // Handling decimal logic remains mostly unchanged
    if (evt.target.value.length >= maxLength) {
      if (
        !evt.key.match("Backspace") &&
        !evt.key.match("Delete") &&
        !evt.key.match("Tab")
      ) {
        evt.preventDefault();
        return false;
      }
    }
    if (type === "number" || type === "int") {
      if (type === "number" && noofDecimal > 0 && caller === "onKeyPress") {
        if (invalidChars.includes(evt.key)) {
          evt.preventDefault();
        }

        let pattern = `^\\d*\\.?\\d{0,${noofDecimal}}$`;

        setBool(true);
        pattern = new RegExp(pattern, "g");
        if (!pattern.test(evt.target.value)) {
          handleInput();
          if (
            !pattern.test(evt.target.value) &&
            !evt.key.match(pattern) &&
            !evt.key.match("Backspace") &&
            !evt.key.match("Delete") &&
            !evt.key.match("Tab")
          ) {
            evt.preventDefault();
            return false;
          }
        } else {
          return true;
        }
      } else if ((type === "number" && noofDecimal === 0) || type === "int") {
        let pattern = /[0-9]/g;
        if (
          !evt.key.match(pattern) &&
          !evt.key.match("Backspace") &&
          !evt.key.match("Delete") &&
          !evt.key.match("Tab")
        ) {
          evt.preventDefault();
          return false;
        }
      }
    }
  };

  const handleRegex = (evt, value) => {
    // Handling regex logic remains mostly unchanged
    if (restrictRegex) {
      if (evt.key.match(restrictRegex)) {
        evt.preventDefault();
        return false;
      }
    }
    if (validateRegex) {
      if (
        (!evt.target.value.match(validateRegex) ||
          !evt.key.match(validateRegex)) &&
        !evt.key.match("Backspace") &&
        !evt.key.match("Delete") &&
        !evt.key.match("Tab")
      ) {
        evt.preventDefault();
        return false;
      }
    }
  };

  const handleInput = () => {
    if (val) {
      let values = val.slice(0, val.length - 1);
      if (form) form.setFieldsValue({ [name]: values });
      setVal(values);
    }
  };

  const handleInputChange = (evt) => {
    // Handling input change logic remains mostly unchanged
    if (type === "number" || type === "int") {
      setVal(evt.target.value);
    }
    if (isUppercase) {
      if (form) {
        form.setFieldsValue({ [name]: String(evt.target.value).toUpperCase() });
      }
    }
  };

  const rules = () => {
    // Rules function remains mostly unchanged
    let rulesArray = [];
    if (customMessageRule) {
      rulesArray.push(customMessageRule);
    }
    if (email) {
      rulesArray.push({
        type: "email",
        message: "Enter Valid Email Address",
      });
    }

    if (ipPool) {
      rulesArray.push({
        pattern:
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        message: "Enter Valid " + " " + validationOn + " " + "Address",
      });
    }

    if (required) {
      if (removeRequiredLabel) {
        rulesArray.push({
          required: required,
          message: "",
        });
      } else {
        rulesArray.push({
          required: required,
          message: validationOn
            ? validationOn + " is required"
            : label + " is required",
        });
      }
    }

    if (minLength) {
      rulesArray.push({
        min: minLength,
        message:
          validationOn + " " + ` must be minimum ${minLength} characters`,
      });
    }
    if (maxLength) {
      rulesArray.push({
        max: maxLength,
        message:
          validationOn + " " + ` must be maximum ${maxLength} characters`,
      });
    }
    if ((rulesBit & 8) > 0) {
      rulesArray.push({});
    }
    if ((rulesBit & 16) > 0) {
      rulesArray.push({});
    }
    return rulesArray;
  };

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          id={id}
          label={label}
          required={required}
          error={form?.getFieldError(name)?.length > 0}
          helperText={form?.getFieldError(name)?.join(" ")}
          variant="outlined"
          size={size}
          value={val}
          onChange={(e) => {
            if (onSimpleChange) onSimpleChange(e);
            handleInputChange(e);
          }}
          onBlur={() => setFirstTimeOnBlue("onChange")}
          disabled={disabled}
          inputProps={{
            min,
            type: type !== "number" ? type : bool ? type : "",
            "data-name":
              Array.isArray(name) && name.length > 1 ? name[1] : name,
            onKeyDown: (e) => {
              handleDecimal(e, "onKeyPress");
              handleRegex(e, "onKeyPress");
            },
            onKeyPress: (e) => {
              handleDecimal(e);
              handleRegex(e);
            },
            onPaste: (e) => {
              if (isCopyPaste) {
                e.preventDefault();
                return false;
              }
            },
            style: inputStyle,
          }}
          InputProps={{
            startAdornment: addOnBeforeValue && (
              <InputAdornment position="start">
                {addOnBeforeValue}
              </InputAdornment>
            ),
            endAdornment: addonAfter && (
              <InputAdornment position="end">{addonAfter}</InputAdornment>
            ),
            placeholder,
            className,
          }}
        />
      </FormControl>
    </div>
  );
};
