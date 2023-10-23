// унверсальная строка для пароля
import "../../style/input.css";

import { useState, useRef } from "react";

export default function Component({
  name = "",
  label = "",
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
      return { show, type };
    });
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

      <div className="field__wrapper">
        <input
          className={
            isError ? "field__input field__input--error" : "field__input"
          }
          name={name}
          type={fieldPass.type}
          placeholder={placeholder}
          onInput={handleInput}
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
