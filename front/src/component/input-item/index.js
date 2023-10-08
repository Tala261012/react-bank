// унверсальная строка ввода
import "./index.css";

import { useState } from "react";

export default function Component({
  name = "",
  label = "",
  type = "text",
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

  return (
    <div className="field">
      <label className={`field__label field__label--${className}`}>
        {label}
      </label>
      <input
        className={`field__input field__input--${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
