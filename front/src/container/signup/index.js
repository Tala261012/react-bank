// хедер с кнопкой "назад"
import "./index.css";
import { SignupForm } from "../../utils/form";
import { setError } from "../../utils/scripts";

import { useState, useRef } from "react";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputPassword from "../../component/input-password";

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

    setError(SignupForm, "email", setEmailError, emailSpan);

    setEmail(value);
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    SignupForm.change("password", value);

    setError(SignupForm, "password", setPasswordError, passwordSpan);

    setPassword(value);
  };

  const passwordConfirmSpan = useRef(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordConfirmChange = (value) => {
    SignupForm.change("passwordConfirm", value);

    setError(
      SignupForm,
      "passwordConfirm",
      setPasswordConfirmError,
      passwordConfirmSpan
    );

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
