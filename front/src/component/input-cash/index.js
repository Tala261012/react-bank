// строка ввода для цифр, формат: $100
import "../../style/input.css";

import { useState, useRef } from "react";

export default function Component({
  name = "",
  label = "",
  placeholder = "",
  isError = false,
  onInput,
  // чтоб не было label, включить: labelOff={'field__label--off'}
  labelOff = "",
}) {
  const [inputValue, setInputValue] = useState("");

  const field = useRef(null);

  const handleInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (onInput) onInput(newValue);
  };

  const handleFocus = () => {
    field.current.classList.toggle("field__input--focus", true);
  };

  const handleBlur = () => {
    field.current.classList.toggle("field__input--focus", false);
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
        ref={field}
        className={
          isError
            ? `field__input field__input--error  field__input--before`
            : `field__input field__input--before`
        }
      >
        <input
          className={"field__empty"}
          name={name}
          type={"number"}
          placeholder={placeholder}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
