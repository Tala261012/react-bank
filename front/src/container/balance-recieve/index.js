// подтверждение почты после регистрации
import "./index.css";
import "../../style/style.css";

import { BalanceReceiveForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "../../component/box";
import Line from "../../component/line";
import InfoBox from "../../component/info-box";
import Form from "../../component/form";
import FormSmall from "../../component/form-small";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // console.log(emailConfirm);

  // const submit = async () => {
  //   try {
  //     const res = await fetch("http://localhost:4000/signup-confirm", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: EmailConfirmForm.convertData(),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setAlertClass({ status: "success", text: data.message });
  //       auth.dispatch({ type: "login", data: data.session });
  //       navigate(`/balance`);
  //     } else {
  //       setAlertClass({ status: "error", text: data.message });
  //     }
  //   } catch (error) {
  //     setAlertClass({ status: "error", text: error.message });
  //   }
  // };

  // const handleSubmit = () => {
  //   // дублирующая проверка перед отправкой
  //   EmailConfirmForm.validateAll();
  //   if (Object.keys(EmailConfirmForm.error).length !== 0) {
  //     // console.log("Error:", SignupForm.error);
  //     setIsDisabled(true);
  //   } else {
  //     setAlertClass({ status: "progress", text: "Loading..." });
  //     // console.log("Result:", EmailConfirmForm.value);
  //     submit();
  //   }
  // };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const checkDisabled = () => {
    if (Object.keys(BalanceReceiveForm.error).length === 0 && code !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const cashSpan = useRef(null);
  const [cashError, setCashError] = useState(false);
  const [code, setCode] = useState("");

  const handleCodeInput = (value) => {
    BalanceReceiveForm.change(BalanceReceiveForm.FIELD_NAME.CASH, value);

    setError(
      BalanceReceiveForm,
      BalanceReceiveForm.FIELD_NAME.CASH,
      setCashError,
      cashSpan
    );

    setCode(value);

    checkDisabled();
  };

  return (
    <Form>
      <FormSmall>
        <h2 className="sub-title">Receive amount</h2>
        <div>
          <InputItem
            isError={cashError}
            name={"cash"}
            type={"number"}
            placeholder={"Enter amount"}
            onInput={handleCodeInput}
            before={"field__input--before"}
            labelOff={"field__label--off"}
          />
          <span ref={cashSpan} className="form__error">
            Error
          </span>
        </div>
      </FormSmall>

      <Line />

      <FormSmall>
        <h2 className="sub-title">Payment system</h2>
        <Box>
          <InfoBox image={"stripe"} title={"Stripe"} rightbox={"rightbox--on"}>
            <img
              src="/svg/stripe-all.svg"
              width={160}
              height={20}
              alt="stripe"
            />
          </InfoBox>
        </Box>

        <Box>
          <InfoBox
            image={"coinbase"}
            title={"Coinbase"}
            rightbox={"rightbox--on"}
          >
            <img
              src="/svg/coinbase-all.svg"
              width={160}
              height={20}
              alt="stripe"
            />
          </InfoBox>
        </Box>
      </FormSmall>

      {/* <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Confirm"}
      /> */}

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Form>
  );
}
