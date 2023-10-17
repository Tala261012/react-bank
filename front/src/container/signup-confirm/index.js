// подтверждение почты после регистрации
import "./index.css";
import "../../style/style.css";

import { EmailConfirmForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const emailConfirm = auth.state.user.email;

  // console.log(emailConfirm);

  useEffect(() => {
    EmailConfirmForm.setEmail(emailConfirm);
  }, []);

  const handleLinkClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/signup-confirm?renew=true&email=${emailConfirm}`,
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
      const res = await fetch("http://localhost:4000/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: EmailConfirmForm.convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        auth.dispatch({ type: "login", data: data.session });

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
    EmailConfirmForm.validateAll();

    if (Object.keys(EmailConfirmForm.error).length !== 0) {
      // console.log("Error:", SignupForm.error);

      setIsDisabled(true);
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      // console.log("Result:", EmailConfirmForm.value);

      submit();
    }
  };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const checkDisabled = () => {
    if (Object.keys(EmailConfirmForm.error).length === 0 && code !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const codeSpan = useRef(null);
  const [codeError, setCodeError] = useState(false);
  const [code, setCode] = useState("");

  const handleCodeInput = (value) => {
    EmailConfirmForm.change(EmailConfirmForm.FIELD_NAME.CODE, value);

    setError(
      EmailConfirmForm,
      EmailConfirmForm.FIELD_NAME.CODE,
      setCodeError,
      codeSpan
    );

    setCode(value);

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
        text={"Confirm"}
      />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Form>
  );
}
