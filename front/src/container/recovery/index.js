import "./index.css";
import "../../style/style.css";

import { RecoveryForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";

export default function Component() {
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: RecoveryForm.convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        alert(data.code);
        navigate(`/recovery-confirm/${email}`);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    RecoveryForm.validateAll();

    if (Object.keys(RecoveryForm.error).length !== 0) {
      setIsDisabled(true);

      Object.entries(RecoveryForm.error).forEach(([name, value]) => {
        if (name === RecoveryForm.FIELD_NAME.EMAIL) {
          setError(
            RecoveryForm,
            RecoveryForm.FIELD_NAME.EMAIL,
            setEmailError,
            emailSpan
          );
        }
      });
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      // console.log("Result:", RecoveryForm.value);

      submit();
    }
  };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const checkDisabled = () => {
    if (Object.keys(RecoveryForm.error).length === 0 && email !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const emailSpan = useRef(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailInput = (value) => {
    RecoveryForm.change(RecoveryForm.FIELD_NAME.EMAIL, value);

    setError(
      RecoveryForm,
      RecoveryForm.FIELD_NAME.EMAIL,
      setEmailError,
      emailSpan
    );

    setEmail(value);

    checkDisabled();
  };

  return (
    <Form>
      <div>
        <InputItem
          isError={emailError}
          name={"email"}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter your email"}
          onInput={handleEmailInput}
        />
        <span ref={emailSpan} className="form__error">
          Error
        </span>
      </div>

      <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Send code"}
      />
      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Form>
  );
}
