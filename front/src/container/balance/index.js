// Баланс - главная страница
import React, { Fragment } from "react";
import "./index.css";

import Sum from "../../component/sum";
import Line from "../../component/line";
import InfoBox from "../../component/info-box";
import WalletHeading from "../wallet-heading";

export default function Component() {
  const temp = 150847.45;

  return (
    <Fragment>
      <WalletHeading value={temp} />
      <Line />
      <Sum value={temp} sign={"-$"} />
      <InfoBox
        image={"stripe"}
        size={"icon--big"}
        title={"let it be"}
        subtitleClass={"on"}
        subtitleTime={"0:00"}
        subtitleType={"something"}
        rightbox={"rightbox--on"}
      >
        <Sum value={temp} sign={"-$"} />
      </InfoBox>
    </Fragment>
  );
}
