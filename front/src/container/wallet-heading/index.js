// Главная сумма и блок кнопок Receive & Send
import React, { Fragment } from "react";
import "./index.css";

import ReceiveButton from "../../component/receive-button";
import SendButton from "../../component/send-button";
import MainSum from "../../component/sum-big";

export default function Component({ value, sign, className }) {
  return (
    <div className="wallet-heading">
      <MainSum value={value} sign={"$"} className={"sum--white"} />

      <div className="receive-send__block">
        <ReceiveButton />
        <SendButton />
      </div>
    </div>
  );
}
