// унверсальная строка ввода
import "../../style/input.css";

import { useState } from "react";

export default function Component({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  isError = false,
  onInput,
}) {
  const [inputValue, setInputValue] = useState("");
  const handleInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (onInput) onInput(newValue);
  };

  return (
    <div className="field">
      <label
        className={
          isError ? `field__label field__label--error` : `field__label`
        }
      >
        {label}
      </label>
      <input
        className={
          isError ? `field__input field__input--error` : `field__input`
        }
        name={name}
        type={type}
        placeholder={placeholder}
        onInput={handleInput}
      />
    </div>
  );
}
