import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";

import WalletHeader from "../../container/header-wallet";
import Balance from "../../container/balance";

export default function Component() {
  return (
    <Page className="bg-wallet">
      <Grid>
        <WalletHeader title={"Main wallet"} />
        <Balance />
      </Grid>
    </Page>
  );
}
