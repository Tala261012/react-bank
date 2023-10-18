// хедер с кнопкой "назад"
import "./index.css";
import "../../style/style.css";

import { SettingsPasswordForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useState, useRef, useContext } from "react";

import Button from "../../component/button";
import FormSmall from "../../component/form-small";
import Alert from "../../component/alert";
import InputPassword from "../../component/input-password";

export default function Component() {
  const auth = useContext(AuthContext);

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/settings-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: SettingsPasswordForm.convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    SettingsPasswordForm.validateAll();

    if (Object.keys(SettingsPasswordForm.error).length !== 0) {
      // console.log("Error:", SettingsPasswordForm.error);

      setIsDisabled(true);

      Object.entries(SettingsPasswordForm.error).forEach(([name, value]) => {
        if (name === SettingsPasswordForm.FIELD_NAME.OLD_PASSWORD) {
          setError(
            SettingsPasswordForm,
            SettingsPasswordForm.FIELD_NAME.OLD_PASSWORD,
            setPasswordError,
            passwordSpan
          );
        }

        if (name === SettingsPasswordForm.FIELD_NAME.NEW_PASSWORD) {
          setError(
            SettingsPasswordForm,
            SettingsPasswordForm.FIELD_NAME.NEW_PASSWORD,
            setPasswordNewError,
            passwordNewSpan
          );
        }
      });
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      const state = Object.entries(auth)[0][1];

      SettingsPasswordForm.setToken(state.token);

      // console.log("Result:", SettingsPasswordForm.convertData());

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
      Object.keys(SettingsPasswordForm.error).length === 0 &&
      password !== "" &&
      passwordNew !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordInput = (value) => {
    SettingsPasswordForm.change(
      SettingsPasswordForm.FIELD_NAME.OLD_PASSWORD,
      value
    );

    setError(
      SettingsPasswordForm,
      SettingsPasswordForm.FIELD_NAME.OLD_PASSWORD,
      setPasswordError,
      passwordSpan
    );

    setPassword(value);

    checkDisabled();
  };

  const passwordNewSpan = useRef(null);
  const [passwordNewError, setPasswordNewError] = useState(false);
  const [passwordNew, setPasswordNew] = useState("");

  const handlePasswordNewInput = (value) => {
    SettingsPasswordForm.change(
      SettingsPasswordForm.FIELD_NAME.NEW_PASSWORD,
      value
    );

    setError(
      SettingsPasswordForm,
      SettingsPasswordForm.FIELD_NAME.NEW_PASSWORD,
      setPasswordNewError,
      passwordNewSpan
    );

    setPasswordNew(value);

    checkDisabled();
  };

  return (
    <FormSmall>
      <h2 className="sub-title">Change password</h2>

      <div>
        <InputPassword
          isError={passwordError}
          name={"old_password"}
          label={"Old password:"}
          placeholder={"Your current passowrd"}
          onInput={handlePasswordInput}
        />
        <span ref={passwordSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordNewError}
          name={"new_password"}
          label={"New password:"}
          placeholder={"Create your new passowrd"}
          onInput={handlePasswordNewInput}
        />
        <span ref={passwordNewSpan} className="form__error">
          Error
        </span>
      </div>

      <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-purple"}
        text={"Save Password"}
      />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </FormSmall>
  );
}
