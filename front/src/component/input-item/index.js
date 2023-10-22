// унверсальная строка ввода
import "./index.css";

import { useState } from "react";

export default function Component({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  isError = false,
  onInput,
  // чтоб не было label, включить: labelOff={'field__label--off'}
  labelOff = "",
  // значок $ перед цифрой, включить before={"field__input--before}
  before = "",
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
          isError
            ? `field__label field__label--error ${labelOff}`
            : `field__label ${labelOff}`
        }
      >
        {label}
      </label>
      <div
        className={
          isError
            ? `field__input field__input--error  ${before}`
            : `field__input ${before}`
        }
      >
        <input
          className={"field__empty"}
          name={name}
          type={type}
          placeholder={placeholder}
          onInput={handleInput}
        />
      </div>
    </div>
  );
}
