// Баланс - главная страница
import React, { Fragment } from "react";
import "./index.css";

import Sum from "../../component/sum-big";
import WalletHeading from "../wallet-heading";

export default function Component({ children }) {
  const temp = 150847.45;

  return (
    <React.Fragment>
      <WalletHeading value={temp} sign={"$"} className={"sum--white"} />
    </React.Fragment>
  );
}
