// унверсальная строка для пароля
import "./index.css";

import { useState, useRef } from "react";

export default function Component({
  name = "",
  label = "",
  placeholder = "",
  className = "",
  onChange,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (onChange) onChange(newValue);
  };

  const fieldSpan = useRef(null);

  const [fieldPass, setFieldPass] = useState({ show: false, type: "password" });

  const handleClick = () => {
    fieldSpan.current.classList.toggle("show");

    setFieldPass(({ show, type }) => {
      show = !show;
      if (type === "password") {
        type = "text";
      } else {
        type = "password";
      }
      console.log(show, type);

      return { show, type };
    });
  };

  return (
    <div className="field">
      <label className={`field__label field__label--${className}`}>
        {label}
      </label>

      <div className="field__wrapper">
        <input
          className={`field__input field__input--${className}`}
          type={fieldPass.type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <span
          onClick={handleClick}
          ref={fieldSpan}
          className="field__icon"
        ></span>
      </div>
    </div>
  );
}
