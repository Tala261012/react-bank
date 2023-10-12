// унверсальная строка ввода
import "./index.css";

import { useState } from "react";

export default function Component({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  isError = false,
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
      <label
        className={
          isError ? "field__label field__label--error" : "field__label"
        }
      >
        {label}
      </label>
      <input
        className={
          isError ? `field__input field__input--error` : "field__input"
        }
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
