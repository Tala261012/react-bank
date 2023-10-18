// Баланс - главная страница
import React, { Fragment } from "react";
import "./index.css";

import Sum from "../../component/sum-big";
import Line from "../../component/line";
import WalletHeading from "../wallet-heading";

export default function Component({ children }) {
  const temp = 150847.45;

  return (
    <React.Fragment>
      <WalletHeading value={temp} />
      <Line />
      <Sum value={temp} sign={"-$"} />
    </React.Fragment>
  );
}
