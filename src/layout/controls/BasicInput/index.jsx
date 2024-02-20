import React, { useState } from "react";
import { Form, Input } from "antd";

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
  inputStyle, // new prop for styling specifically Input(<Input>).
  min, // this is for minimum number value
  restrictSpace,
  className,
  removeRequiredLabel, // Remove required label
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
  tooltip = tooltip ? tooltip : false; // "This is a required field" : tooltip;
  size = size === undefined ? "middle" : size;
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
  //STATE

  const [val, setVal] = useState(defaultValue);
  const [bool, setBool] = useState();

  const [firstTimeOnBlue, setFirstTimeOnBlue] = useState("onBlur");

  const handleDecimal = (evt, caller) => {
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
      <Form.Item
        name={name}
        label={label}
        required={required}
        validateTrigger={firstTimeOnBlue}
        rules={rules()}
        initialValue={defaultValue}
        tooltip={tooltip}
        style={style}
        autocomplete="off"
      >
        <Input
          id={id}
          min={min}
          prefix={prefix}
          type={type !== "number" ? type : bool ? type : ""}
          data-name={Array.isArray(name) && name.length > 1 ? name[1] : name}
          defaultValue={defaultValue ? defaultValue : ""}
          addonBefore={addOnBeforeValue ? addOnBeforeValue : null}
          addonAfter={addonAfter ? addonAfter : null}
          placeholder={placeholder}
          className={className}
          size="default"
          onKeyDown={(e, value) => {
            handleDecimal(e, "onKeyPress");
            handleRegex(e, "onKeyPress");
          }}
          onChange={(e) => {
            if (onSimpleChange) onSimpleChange(e);
            handleInputChange(e);
          }}
          onKeyPress={(e) => {
            handleDecimal(e);
            handleRegex(e);
          }}
          onPaste={(e) => {
            if (isCopyPaste) {
              e.preventDefault();
              return false;
            }
          }}
          onBlur={() => setFirstTimeOnBlue("onChange")}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          autoFocus={Focus}
          tabIndex={tabIndex}
          autoComplete="nope"
          style={inputStyle}
        />
      </Form.Item>
    </div>
  );
};
