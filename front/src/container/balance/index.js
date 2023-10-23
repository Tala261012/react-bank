// Баланс - главная страница
import React, { Fragment } from "react";
import "./index.css";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../App";

import { getDateShort } from "../../utils/scripts";
import Alert from "../../component/alert";
import Sum from "../../component/sum";
import Box from "../../component/box";
import FormSmall from "../../component/form-small";
import Skeleton from "../../component/skeleton";
import InfoBox from "../../component/info-box";
import WalletHeading from "../wallet-heading";

export default function Component() {
  const auth = useContext(AuthContext);

  const [sum, setSum] = useState("0.00");
  const [list, setList] = useState([]);

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

  const getList = async () => {
    const state = Object.entries(auth)[0][1];

    setAlertClass({ status: "progress", text: "Loading..." });

    try {
      const res = await fetch(
        `http://localhost:4000/balance-list?token=${state.token}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        setList(data.list);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  useEffect(() => {
    getSum();
    getList();
  }, []);

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const getNameFromAddress = (address) => {
    switch (address) {
      default:
        return "User";
      case "Stripe":
        return "Stripe";
      case "Coinbase":
        return "Coinbase";
    }
  };

  const getTypeShort = (type) => {
    switch (type) {
      default:
        return type;
      case "GET_MONEY":
        return "Receiving";
      case "SEND_MONEY":
        return "Sending";
    }
  };

  const getIconFromAddress = (address) => {
    switch (address) {
      default:
        return "send-money";
      case "Stripe":
        return "stripe";
      case "Coinbase":
        return "coinbase";
    }
  };

  const getSignFromType = (type) => {
    switch (type) {
      default:
        return {};
      case "GET_MONEY":
        return { sign: "+$", class: "sum--green" };
      case "SEND_MONEY":
        return { sign: "-$", class: "" };
    }
  };

  const formattedList = list
    .map((item) => ({
      id: item.id,
      date: getDateShort(item.date),
      name: getNameFromAddress(item.address),
      short: getTypeShort(item.type),
      icon: getIconFromAddress(item.address),
      cash: item.cash,
      sign: getSignFromType(item.type).sign,
      class: getSignFromType(item.type).class,
    }))
    .reverse();

  return (
    <FormSmall>
      <WalletHeading value={sum} />
      {alertClass.status === "progress" && (
        <Fragment>
          <Skeleton
            subtitleClass={"on"}
            size={"icon--big"}
            rightbox={"rightbox--on"}
          />
          <Skeleton
            subtitleClass={"on"}
            size={"icon--big"}
            rightbox={"rightbox--on"}
          />
          <Skeleton
            subtitleClass={"on"}
            size={"icon--big"}
            rightbox={"rightbox--on"}
          />
        </Fragment>
      )}

      {alertClass.status === "success" &&
        formattedList.map((item) => (
          <Fragment key={item.id}>
            <InfoBox
              size={"icon--big"}
              image={item.icon}
              title={item.name}
              subtitleClass={"on"}
              subtitleTime={item.date}
              subtitleType={item.short}
              rightbox={"rightbox--on"}
            >
              <Sum value={item.cash} sign={item.sign} className={item.class} />
            </InfoBox>
          </Fragment>
        ))}

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </FormSmall>
  );
}
