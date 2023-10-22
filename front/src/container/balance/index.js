// Баланс - главная страница
import React, { Fragment } from "react";
import "./index.css";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../App";

import Alert from "../../component/alert";
import Sum from "../../component/sum";
import InfoBox from "../../component/info-box";
import WalletHeading from "../wallet-heading";

export default function Component() {
  const auth = useContext(AuthContext);

  const [sum, setSum] = useState("0.00");

  // console.log("auth inside Signup:", auth);

  const getSum = async () => {
    const state = Object.entries(auth)[0][1];

    setAlertClass({ status: "progress", text: "Loading..." });

    try {
      const res = await fetch(
        `http://localhost:4000/balance?token=${state.token}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        setSum(data.sum);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  useEffect(() => {
    getSum();
  }, []);

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  return (
    <Fragment>
      <WalletHeading value={sum} />
      <InfoBox
        image={"stripe"}
        size={"icon--big"}
        title={"let it be"}
        subtitleClass={"on"}
        subtitleTime={"0:00"}
        subtitleType={"something"}
        rightbox={"rightbox--on"}
      >
        <Sum value={sum} sign={"-$"} />
      </InfoBox>

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Fragment>
  );
}
