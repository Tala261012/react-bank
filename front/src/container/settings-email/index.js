// вход на сайт
import "./index.css";
import "../../style/style.css";

import { SettingsEmailForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import Button from "../../component/button";
import FormSmall from "../../component/form-small";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputPassword from "../../component/input-password";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // console.log("auth inside SettingsEmail:", auth);

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/settings-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: SettingsEmailForm.convertData(),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        auth.dispatch({ type: "login", data: data.session });
        alert(data.code);
        navigate(`/signup-confirm`);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    SettingsEmailForm.validateAll();

    if (Object.keys(SettingsEmailForm.error).length !== 0) {
      // console.log("Error:", SignupForm.error);

      setIsDisabled(true);

      Object.entries(SettingsEmailForm.error).forEach(([name, value]) => {
        if (name === SettingsEmailForm.FIELD_NAME.NEW_EMAIL) {
          setError(
            SettingsEmailForm,
            SettingsEmailForm.FIELD_NAME.EMAIL,
            setEmailError,
            emailSpan
          );
        }

        if (name === SettingsEmailForm.FIELD_NAME.PASSWORD) {
          setError(
            SettingsEmailForm,
            SettingsEmailForm.FIELD_NAME.PASSWORD,
            setPasswordError,
            passwordSpan
          );
        }
      });
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      const state = Object.entries(auth)[0][1];

      SettingsEmailForm.setToken(state.token);
      SettingsEmailForm.setOldEmail(state.user.email);

      // console.log("Result of changing email:", SettingsEmailForm.convertData());

      submit();
    }
  };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const checkDisabled = () => {
    if (
      Object.keys(SettingsEmailForm.error).length === 0 &&
      email !== "" &&
      password !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const emailSpan = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailInput = (value) => {
    SettingsEmailForm.change(SettingsEmailForm.FIELD_NAME.NEW_EMAIL, value);

    setError(
      SettingsEmailForm,
      SettingsEmailForm.FIELD_NAME.NEW_EMAIL,
      setEmailError,
      emailSpan
    );

    setEmail(value);

    checkDisabled();
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordInput = (value) => {
    SettingsEmailForm.change(SettingsEmailForm.FIELD_NAME.PASSWORD, value);

    setError(
      SettingsEmailForm,
      SettingsEmailForm.FIELD_NAME.PASSWORD,
      setPasswordError,
      passwordSpan
    );

    setPassword(value);

    checkDisabled();
  };

  return (
    <FormSmall>
      <h2 className="sub-title">Change email</h2>
      <div>
        <InputItem
          isError={emailError}
          name={"new_email"}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter your new email"}
          onInput={handleEmailInput}
        />
        <span ref={emailSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordError}
          name={"password"}
          label={"Old password:"}
          placeholder={"Write your current passowrd"}
          onInput={handlePasswordInput}
        />
        <span ref={passwordSpan} className="form__error">
          Error
        </span>
      </div>

      <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-purple"}
        text={"Save Email"}
      />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </FormSmall>
  );
}
