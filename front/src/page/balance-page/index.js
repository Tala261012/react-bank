import "./index.css";

import { useContext } from "react";
import { AuthContext } from "../../App";

import Page from "../../component/page";
import Grid from "../../component/grid";

import WalletHeader from "../../container/header-wallet";
import Balance from "../../container/balance";

export default function Component() {
  const auth = useContext(AuthContext);
  const state = Object.entries(auth)[0][1];
  const name = state.user.name;

  return (
    <Page className="bg-wallet">
      <Grid>
        <WalletHeader title={`Hello, ${name}!`} />
        <Balance />
      </Grid>
    </Page>
  );
}
