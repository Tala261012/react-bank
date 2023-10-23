// регистрация пользователя
import "./index.css";
import "../../style/style.css";

import { BalanceSendForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";

import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputCash from "../../component/input-cash";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // console.log("auth inside Signup:", auth);

  const submit = async () => {
    // try {
    //   const res = await fetch("http://localhost:4000/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: BalanceSendForm.convertData(),
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     setAlertClass({ status: "success", text: data.message });
    //     // saveSession(data.session);
    //     auth.dispatch({ type: "login", data: data.session });
    //     alert(data.code);
    //     navigate(`/signup-confirm`);
    //   } else {
    //     setAlertClass({ status: "error", text: data.message });
    //   }
    // } catch (error) {
    //   setAlertClass({ status: "error", text: error.message });
    // }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    BalanceSendForm.validateAll();

    if (Object.keys(BalanceSendForm.error).length !== 0) {
      // console.log("Error:", BalanceSendForm.error);

      setIsDisabled(true);

      Object.entries(BalanceSendForm.error).forEach(([name, value]) => {
        if (name === BalanceSendForm.FIELD_NAME.ADDRESS) {
          setError(
            BalanceSendForm,
            BalanceSendForm.FIELD_NAME.ADDRESS,
            setEmailError,
            emailSpan
          );
        }

        if (name === BalanceSendForm.FIELD_NAME.CASH) {
          setError(
            BalanceSendForm,
            BalanceSendForm.FIELD_NAME.CASH,
            setCashError,
            cashSpan
          );
        }
      });
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      // console.log("Result:", BalanceSendForm.value);

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
      Object.keys(BalanceSendForm.error).length === 0 &&
      email !== "" &&
      cash !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const cashSpan = useRef(null);
  const [cashError, setCashError] = useState(false);
  const [cash, setCash] = useState("");

  const handleCashInput = (value) => {
    BalanceSendForm.change(BalanceSendForm.FIELD_NAME.CASH, value);

    setError(
      BalanceSendForm,
      BalanceSendForm.FIELD_NAME.CASH,
      setCashError,
      cashSpan
    );

    setCash(value);

    checkDisabled();
  };

  const emailSpan = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailInput = (value) => {
    BalanceSendForm.change(BalanceSendForm.FIELD_NAME.ADDRESS, value);

    setError(
      BalanceSendForm,
      BalanceSendForm.FIELD_NAME.ADDRESS,
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
          name={"address"}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter email"}
          onInput={handleEmailInput}
        />
        <span ref={emailSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputCash
          isError={cashError}
          name={"cash"}
          label={"Sum:"}
          placeholder={"Enter amount"}
          onInput={handleCashInput}
        />
        <span ref={cashSpan} className="form__error">
          Error
        </span>
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
