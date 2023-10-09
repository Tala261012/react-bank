// хедер с кнопкой "назад"
import "./index.css";
import { SignupForm } from "../../utils/form";

import { useState, useRef } from "react";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputPassword from "../../component/input-password";

function setError(key, stateFunction, refName) {
  if (SignupForm.error.hasOwnProperty(key)) {
    stateFunction(true);

    refName.current.classList.toggle("form__error--active", true);
    refName.current.innerText = SignupForm.error.email;
  } else {
    stateFunction(false);
    refName.current.classList.toggle("form__error--active", false);
  }
}

export default function Component() {
  const handleSubmit = () => {
    console.log("Result:", SignupForm.value);
    SignupForm.submit();
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const handleIsDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const emailSpan = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (value) => {
    SignupForm.change("email", value);

    if (SignupForm.error.hasOwnProperty("email")) {
      setEmailError(true);

      emailSpan.current.classList.toggle("form__error--active", true);
      emailSpan.current.innerText = SignupForm.error.email;
    } else {
      setEmailError(false);
      emailSpan.current.classList.toggle("form__error--active", false);
    }

    setEmail(value);
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    SignupForm.change("password", value);

    if (SignupForm.error.hasOwnProperty("password")) {
      setPasswordError(true);

      passwordSpan.current.classList.toggle("form__error--active", true);
      passwordSpan.current.innerText = SignupForm.error.password;
    } else {
      setPasswordError(false);
      passwordSpan.current.classList.toggle("form__error--active", false);
    }

    setPassword(value);
  };

  const passwordConfirmSpan = useRef(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordConfirmChange = (value) => {
    SignupForm.change("passwordConfirm", value);

    if (SignupForm.error.hasOwnProperty("passwordConfirm")) {
      setPasswordConfirmError(true);

      passwordConfirmSpan.current.classList.toggle("form__error--active", true);
      passwordConfirmSpan.current.innerText = SignupForm.error.passwordConfirm;
    } else {
      setPasswordConfirmError(false);
      passwordConfirmSpan.current.classList.toggle(
        "form__error--active",
        false
      );
    }

    setPasswordConfirm(value);
  };

  return (
    <Form>
      <div>
        <InputItem
          isError={emailError}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter your email"}
          onChange={handleEmailChange}
        />
        <span ref={emailSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordError}
          label={"Password:"}
          placeholder={"Create your passowrd"}
          onChange={handlePasswordChange}
        />
        <span ref={passwordSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordConfirmError}
          label={"Confirm password:"}
          placeholder={"Write your passowrd again"}
          onChange={handlePasswordConfirmChange}
        />
        <span ref={passwordConfirmSpan} className="form__error">
          Error
        </span>
      </div>

      <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Continue"}
      />

      {isDisabled && <Alert className={"success"} message="error" />}

      <p onClick={handleIsDisabled}>is Disabled</p>
    </Form>
  );
}
