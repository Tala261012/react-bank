// хедер с кнопкой "назад"
import "./index.css";
import "../../style/plain-style.css";

import { RecoveryConfirmForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputPassword from "../../component/input-password";

export default function Component() {
  const navigate = useNavigate();

  const { emailRecoveryConfirm } = useParams();

  useEffect(() => {
    RecoveryConfirmForm.setEmail(emailRecoveryConfirm);
  }, []);

  const handleLinkClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/recovery-confirm?renew=true&email=${emailRecoveryConfirm}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        alert(data.code);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/recovery-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: RecoveryConfirmForm.convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        navigate(`/balance`);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    RecoveryConfirmForm.validateAll();

    if (Object.keys(RecoveryConfirmForm.error).length !== 0) {
      // console.log("Error:", SignupForm.error);

      setIsDisabled(true);

      Object.entries(RecoveryConfirmForm.error).forEach(([name, value]) => {
        if (name === RecoveryConfirmForm.FIELD_NAME.PASSWORD) {
          setError(
            RecoveryConfirmForm,
            RecoveryConfirmForm.FIELD_NAME.PASSWORD,
            setPasswordError,
            passwordSpan
          );
        }

        if (name === RecoveryConfirmForm.FIELD_NAME.PASSWORD_CONFIRM) {
          setError(
            RecoveryConfirmForm,
            RecoveryConfirmForm.FIELD_NAME.PASSWORD_CONFIRM,
            setPasswordConfirmError,
            passwordConfirmSpan
          );
        }
      });
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      console.log("Result:", RecoveryConfirmForm.value);

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
      Object.keys(RecoveryConfirmForm.error).length === 0 &&
      code !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const codeSpan = useRef(null);
  const [codeError, setCodeError] = useState(false);
  const [code, setCode] = useState("");

  const handleCodeInput = (value) => {
    RecoveryConfirmForm.change(RecoveryConfirmForm.FIELD_NAME.CODE, value);

    setError(
      RecoveryConfirmForm,
      RecoveryConfirmForm.FIELD_NAME.CODE,
      setCodeError,
      codeSpan
    );

    setCode(value);

    checkDisabled();
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordInput = (value) => {
    RecoveryConfirmForm.change(RecoveryConfirmForm.FIELD_NAME.PASSWORD, value);

    setError(
      RecoveryConfirmForm,
      RecoveryConfirmForm.FIELD_NAME.PASSWORD,
      setPasswordError,
      passwordSpan
    );

    setPassword(value);

    checkDisabled();
  };

  const passwordConfirmSpan = useRef(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordConfirmInput = (value) => {
    RecoveryConfirmForm.change(
      RecoveryConfirmForm.FIELD_NAME.PASSWORD_CONFIRM,
      value
    );

    setError(
      RecoveryConfirmForm,
      RecoveryConfirmForm.FIELD_NAME.PASSWORD_CONFIRM,
      setPasswordConfirmError,
      passwordConfirmSpan
    );

    setPasswordConfirm(value);

    checkDisabled();
  };

  return (
    <Form>
      <div>
        <InputItem
          isError={codeError}
          name={"code"}
          type={"number"}
          label={"Code:"}
          placeholder={"Enter code from your email"}
          onInput={handleCodeInput}
        />
        <span ref={codeSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordError}
          name={"password"}
          label={"New password:"}
          placeholder={"Create your passowrd"}
          onInput={handlePasswordInput}
        />
        <span ref={passwordSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordConfirmError}
          name={"passwordconfirm"}
          label={"Confirm new password:"}
          placeholder={"Write your passowrd again"}
          onInput={handlePasswordConfirmInput}
        />
        <span ref={passwordConfirmSpan} className="form__error">
          Error
        </span>
      </div>

      <div className="link__prefix">
        Have you lost code?{" "}
        <Link onClick={handleLinkClick} className="link" to="#">
          Send it again
        </Link>
      </div>

      <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Continue"}
      />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Form>
  );
}
