// подтверждение почты после регистрации
import "./index.css";
import "../../style/style.css";

import { BalanceReceiveForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../../component/box";
import Line from "../../component/line";
import InfoBox from "../../component/info-box";
import Form from "../../component/form";
import FormSmall from "../../component/form-small";
import Alert from "../../component/alert";
import InputCash from "../../component/input-cash";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/balance-receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: BalanceReceiveForm.convertData(),
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

  const validate = () => {
    // дублирующая проверка перед отправкой
    BalanceReceiveForm.validateAll();
    if (!cash) {
      BalanceReceiveForm.change(BalanceReceiveForm.FIELD_NAME.CASH, cash);
    }
    if (Object.keys(BalanceReceiveForm.error).length !== 0) {
      setError(
        BalanceReceiveForm,
        BalanceReceiveForm.FIELD_NAME.CASH,
        setCashError,
        cashSpan
      );

      return false;
    } else {
      // объект сессии, тут token & user
      const state = Object.entries(auth)[0][1];

      BalanceReceiveForm.setToken(state.token);

      return true;
    }
  };

  const handleStripeClick = () => {
    if (validate()) {
      BalanceReceiveForm.setAddress("Stripe");
      setAlertClass({ status: "progress", text: "Loading..." });

      console.log(BalanceReceiveForm.convertData());

      submit();
    }
  };

  const handleCoinbaseClick = () => {
    if (validate()) {
      BalanceReceiveForm.setAddress("Coinbase");
      setAlertClass({ status: "progress", text: "Loading..." });

      console.log(BalanceReceiveForm.convertData());

      submit();
    }
  };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const cashSpan = useRef(null);
  const [cashError, setCashError] = useState(false);
  const [cash, setCash] = useState("");

  const handleCashInput = (value) => {
    BalanceReceiveForm.change(BalanceReceiveForm.FIELD_NAME.CASH, value);

    setError(
      BalanceReceiveForm,
      BalanceReceiveForm.FIELD_NAME.CASH,
      setCashError,
      cashSpan
    );

    setCash(value);
  };

  return (
    <Form>
      <FormSmall>
        <h2 className="sub-title">Receive amount</h2>
        <div>
          <InputCash
            isError={cashError}
            name={"cash"}
            placeholder={"Enter amount"}
            onInput={handleCashInput}
            labelOff={"field__label--off"}
            // autoFocus={true}
          />
          <span ref={cashSpan} className="form__error">
            Error
          </span>
        </div>
      </FormSmall>

      <Line />

      <FormSmall>
        <h2 className="sub-title">Payment system</h2>
        <div onClick={handleStripeClick} className="box-active">
          <Box>
            <InfoBox
              image={"stripe"}
              title={"Stripe"}
              rightbox={"rightbox--on"}
            >
              <img
                src="/svg/stripe-all.svg"
                width={160}
                height={20}
                alt="stripe"
              />
            </InfoBox>
          </Box>
        </div>

        <div onClick={handleCoinbaseClick} className="box-active">
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
        </div>
      </FormSmall>

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Form>
  );
}
