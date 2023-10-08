// унверсальная строка ввода
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

  const [show, setShow] = useState(false);

  const [type, setType] = useState("password");

  const handleClick = () => {
    fieldSpan.current.classList.toggle("show");
    setShow(!show);

    setType((type) => {
      if (type === "password") return (type = "text");
      if (type === "text") return (type = "password");
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
          type={type}
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
