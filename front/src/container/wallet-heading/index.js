// Главная сумма и блок кнопок Receive & Send
import React from "react";
import "./index.css";

import ReceiveButton from "../../component/receive-button";
import SendButton from "../../component/send-button";
import MainSum from "../../component/sum";

export default function Component({ value }) {
  return (
    <div className="wallet-heading">
      <MainSum
        value={value}
        sign={"$"}
        className={"sum--white"}
        classSize={"sum--big"}
      />

      <div className="receive-send__block">
        <ReceiveButton />
        <SendButton />
      </div>
    </div>
  );
}
